"use server";

import { getEnv } from "@/lib/server/env";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubEvent {
  id: string;
  type: string;
  repo: string;
  message?: string;
  createdAt: string;
}

export interface GithubActivityData {
  username: string;
  name?: string;
  avatarUrl?: string;
  totalContributions: number;
  publicRepos: number;
  followers: number;
  recentEvents: GithubEvent[];
  contributions: ContributionDay[];
}

export async function getGithubActivity(): Promise<GithubActivityData> {
  let username = "Frusadev";
  try {
    username = getEnv("GITHUB_USERNAME", "Frusadev");
  } catch {
    username = "Frusadev";
  }

  const defaultData: GithubActivityData = {
    username,
    totalContributions: 0,
    publicRepos: 0,
    followers: 0,
    recentEvents: [],
    contributions: [],
  };

  try {
    // 1. Fetch Contributions from public contribution API with 1-hour cache
    const contributionsPromise = fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "Portfolio-App" },
      }
    )
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .catch(() => null);

    // 2. Fetch User Profile
    const profilePromise = fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Portfolio-App" },
    })
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .catch(() => null);

    // 3. Fetch Recent Public Events
    const eventsPromise = fetch(
      `https://api.github.com/users/${username}/events/public?per_page=15`,
      {
        next: { revalidate: 1800 },
        headers: { "User-Agent": "Portfolio-App" },
      }
    )
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .catch(() => null);

    const [contribData, profileData, eventsData] = await Promise.all([
      contributionsPromise,
      profilePromise,
      eventsPromise,
    ]);

    let contributions: ContributionDay[] = [];
    let totalContributions = 0;

    if (contribData?.contributions && Array.isArray(contribData.contributions)) {
      contributions = contribData.contributions;
      totalContributions = contribData.total?.[new Date().getFullYear().toString()] ??
        contribData.total?.lastYear ??
        contributions.reduce((acc: number, curr: { count: number }) => acc + curr.count, 0);
    }

    // Process events
    const recentEvents: GithubEvent[] = [];
    if (Array.isArray(eventsData)) {
      for (const ev of eventsData) {
        if (recentEvents.length >= 4) break;
        let message = "";
        if (ev.type === "PushEvent" && ev.payload?.commits?.[0]?.message) {
          message = ev.payload.commits[0].message.split("\n")[0];
        } else if (ev.type === "CreateEvent") {
          message = `Created ${ev.payload?.ref_type || "repository"} ${ev.payload?.ref || ""}`.trim();
        } else if (ev.type === "WatchEvent") {
          message = "Starred repository";
        } else if (ev.type === "PullRequestEvent") {
          message = `${ev.payload?.action || "opened"} PR: ${ev.payload?.pull_request?.title || ""}`.trim();
        }

        recentEvents.push({
          id: ev.id,
          type: ev.type,
          repo: ev.repo?.name || "",
          message: message || `Activity in ${ev.repo?.name || ""}`,
          createdAt: ev.created_at,
        });
      }
    }

    return {
      username,
      name: profileData?.name || username,
      avatarUrl: profileData?.avatar_url,
      totalContributions: totalContributions || contributions.reduce((acc, c) => acc + c.count, 0),
      publicRepos: profileData?.public_repos ?? 0,
      followers: profileData?.followers ?? 0,
      recentEvents,
      contributions,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub activity:", error);
    return defaultData;
  }
}
