"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SpriteAnimation() {
  const [frame, setFrame] = useState(1);
  const totalFrames = 64;
  const fps = 24; // Standard animation frame rate, smoother than original
  const intervalTime = 1000 / fps;
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const onLoad = () => {
      loadedCount++;
      if (loadedCount === totalFrames) {
        setImagesLoaded(true);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image();
      img.src = `/animatedsprite/base${i}.png`;
      img.onload = onLoad;
      // In case of cache or error, we should probably still proceed or count it
      img.onerror = onLoad; 
      images.push(img);
    }
  }, []);

  useEffect(() => {
    // Start animation only after images are somewhat ready or immediately if we don't want to block
    // User asked for caching BEFORE animation load.
    if (!imagesLoaded) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      
      if (delta >= intervalTime) {
        setFrame((prev) => (prev >= totalFrames ? 1 : prev + 1));
        lastTime = time - (delta % intervalTime);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [imagesLoaded, intervalTime]);

  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
      {!imagesLoaded ? (
        <span className="text-red-950/20 text-xs animate-pulse">Loading...</span>
      ) : (
        <Image
          src={`/animatedsprite/base${frame}.png`}
          alt="Character Animation"
          width={128}
          height={128}
          className="w-full h-full object-contain pixelated"
          unoptimized
          priority
        />
      )}
    </div>
  );
}
