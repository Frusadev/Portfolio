"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";

// The Playlist
const PLAYLIST = [
  "Raindance",
  "DANÇA CONTROL - Slowed",
  "IDOL!",
  "Swan Song - From the Motion Picture \"Alita: Battle Angel\"",
  "RIOT IN IBIZA",
  "frozone - super slowed",
  "soulless",
  "XLOWLY - SUPER SLOWED",
  "Who Laughs Last (feat. Kristen Stewart)",
  "Take Me There",
  "The One",
  "Que du love",
  "Tanko (feat. Terry G)",
  "If It Is",
  "TIKI TIKI - Slowed",
  "Kawaii Desu Ne",
  "CHANEL",
  "Glistening",
  "Icarus",
  "Dayana",
  "Circles",
  "Trouble Maker",
  "VAZIO ETERNO - Slowed",
  "DND",
  "Nightingale",
  "FALL FROM THE SKY PT.2 - VIRAL SLOWED",
  "Golden Brown",
  "meaningful love - instrumental",
  "SLAVA EVOLUTION!",
  "Bandana",
  "9mm",
  "Is There Someone Else?",
  "DOORS LIGHT FUNK",
  "antiangel - Slowed",
  "Tourist 2.0",
  "ぴぽぴぽ",
  "Ma Meilleure Ennemie - From The Series \"Arcane League of Legends\"",
  "Crystal Skies",
  "HEIS",
  "Fire Emblem 2.0",
  "Firstclass Misery",
  "DOMILITANT",
  "Korea",
  "Mist",
  "VVV (HE'S BACK)"
];

export function MusicPlayer() {
  const [track, setTrack] = useState<string>("Raindance"); // Default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAndSetTrack = () => {
      const now = Date.now();
      const cookieName = "music_selection";
      
      const getCookie = (name: string) => {
        if (typeof document === 'undefined') return undefined;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };

      const setCookie = (name: string, value: string, days: number) => {
        if (typeof document === 'undefined') return;
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`; 
      };

      const stored = getCookie(cookieName);
      let selectedIndex = -1;
      
      if (stored) {
        try {
          const { index, timestamp } = JSON.parse(decodeURIComponent(stored));
          // 2 minutes delay
          if (now - timestamp < 2 * 60 * 1000) {
            selectedIndex = index;
          }
        } catch (e) {
          // invalid cookie, ignore
        }
      }

      if (selectedIndex === -1) {
        // Pick new random
        selectedIndex = Math.floor(Math.random() * PLAYLIST.length);
        const data = JSON.stringify({ index: selectedIndex, timestamp: now });
        setCookie(cookieName, data, 1); 
      }

      // Safety check index
      if (selectedIndex >= 0 && selectedIndex < PLAYLIST.length) {
          setTrack(PLAYLIST[selectedIndex]);
      }
    };

    checkAndSetTrack();
  }, []);

  if (!mounted) {
       // Server side / initial render match
       return (
            <div className="flex flex-col justify-between h-full w-full"> 
                <div className="flex justify-between items-start">
                    <Music className="text-red-950 w-6 h-6 md:w-[1.5vw] md:h-[1.5vw]" />
                    <div className="flex space-x-1 items-end h-6 md:h-[1.5vw]">
                        <span className="w-1 h-2 bg-red-950 md:w-[0.25vw] md:h-[0.5vw]" />
                        <span className="w-1 h-4 bg-red-950 md:w-[0.25vw] md:h-[1vw]" />
                        <span className="w-1 h-3 bg-red-950 md:w-[0.25vw] md:h-[0.75vw]" />
                    </div>
                </div>
                <div>
                    <p className="text-xs md:text-[0.8vw] uppercase tracking-wider font-bold text-red-950/60">
                    On Repeat
                    </p>
                    <p className="font-bold text-red-950 text-base md:text-[1vw] leading-tight truncate">
                    Loading...
                    </p>
                    <p className="text-sm md:text-[0.9vw] text-red-950/80 truncate"></p>
                </div>
            </div>
       );
  }

  // Parse Title / Artist
  // Assuming "Title - Artist" format for some, but fallback to "Spotify"
  let title = track;
  let artist = "Spotify";

  if (track.includes(" - ")) {
      const parts = track.split(" - ");
      // Join back incorrectly split parts just in case, but usually first " - " is divider
      // Or if "Title - Details - Artist", it gets complicated. 
      // Simple heuristic: Title is first part, Detail is rest.
      
      // Some examples: "Swan Song - From the Motion Picture..." -> Title: Swan Song, Artist: From the...
      // "DANÇA CONTROL - Slowed" -> Title: DANÇA CONTROL, Artist: Slowed
      
      title = parts[0];
      const rest = parts.slice(1).join(" - ");
      
      // If the rest looks like a version description "Slowed", "super slowed", maybe keep artist as Spotify?
      // User prompt said "From the Motion Picture..." which sounds like subtitle.
      // Let's just put the rest in the artist field line, it looks better than just "Spotify".
      artist = rest;
  }

  return (
    <div className="flex flex-col justify-between h-full w-full animate-in fade-in duration-500"> 
      <div className="flex justify-between items-start">
        <Music className="text-red-950 w-6 h-6 animate-pulse md:w-[1.5vw] md:h-[1.5vw]" />
        <div className="flex space-x-1 items-end h-6 md:h-[1.5vw]">
          <span className="w-1 h-2 bg-red-950 animate-[bounce_1s_infinite] md:w-[0.25vw] md:h-[0.5vw]" />
          <span className="w-1 h-4 bg-red-950 animate-[bounce_1.2s_infinite] md:w-[0.25vw] md:h-[1vw]" />
          <span className="w-1 h-3 bg-red-950 animate-[bounce_0.8s_infinite] md:w-[0.25vw] md:h-[0.75vw]" />
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-red-950/60 md:text-[0.8vw]">
          On Repeat
        </p>
        <p className="font-bold text-red-950 text-base md:text-[1vw] leading-tight truncate" title={title}>
          {title}
        </p>
        <p className="text-sm text-red-950/80 truncate md:text-[0.9vw]" title={artist}>{artist}</p>
      </div>
    </div>
  );
}
