import { getPosts } from "@/app/actions/blog";
import { getProjects, getExperience } from "@/app/actions/portfolio";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function AdminDashboard() {
  const posts = await getPosts(false); // Fetch all posts, including drafts
  const projects = await getProjects();
  const experience = await getExperience();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-6 border-b-4 border-red-950">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-red-950">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Total Posts" value={posts.length} />
        <StatsCard label="Published Posts" value={posts.filter(p => p.published).length} />
        <StatsCard label="Projects" value={projects.length} />
        <StatsCard label="Experience" value={experience.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentList title="Recent Posts" href="/admin/blog" items={posts.slice(0, 5)} type="post" />
        <RecentList title="Recent Projects" href="/admin/projects" items={projects.slice(0, 5)} type="project" />
      </div>
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-background border-2 border-red-950 p-6 shadow-[4px_4px_0px_0px_rgba(69,10,10,1)]">
      <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">{label}</p>
      <p className="text-4xl font-bold text-red-950">{value}</p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RecentList({ title, href, items, type }: { title: string; href: string; items: any[]; type: "post" | "project" }) {
  return (
    <div className="border-4 border-red-950 bg-background h-full">
      <div className="p-4 border-b-4 border-red-950 flex justify-between items-center bg-red-950 text-[#e6dcc6]">
        <h3 className="font-bold uppercase tracking-wider">{title}</h3>
        <Link href={href} className="text-sm underline underline-offset-4 hover:opacity-80">View All</Link>
      </div>
      <div>
        {items.length === 0 ? (
          <div className="p-8 text-center opacity-50 font-mono text-sm">No items found.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="p-4 border-b-2 border-red-950 last:border-0 hover:bg-red-950/5 flex justify-between items-center group">
              <span className="font-bold truncate max-w-[70%]">{type === "post" ? item.title : (item.name || item.title)}</span>
              <span className="text-xs font-mono opacity-50">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
