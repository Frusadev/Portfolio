"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import TicTacToe from "../ui/tic-tac-toe";
import DraggableStickers from "../ui/draggable-stickers";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, User } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function Hero() {
  const [showGame, setShowGame] = useState(false);

  return (
    <div
      className={cn(
        "w-11/12 min-h-[500px] h-auto bg-foreground rounded-3xl grid grid-cols-1 md:grid-cols-2 md:grid-rows-[1fr_auto] text-background gap-8",
        poppins.className,
        "p-5",
      )}
    >
      <div className="flex flex-col gap-8 order-1 md:h-full">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-4xl">Hi, I&apos;m Daniel Ametsowou</h1>
          <p className="font-medium text-2xl">
            Full Stack developer &amp; Hopefully entrepreneur
          </p>
        </div>

        <DraggableStickers />
      </div>

      <div className="w-full h-[300px] md:h-auto relative overflow-hidden rounded-2xl order-2 md:col-start-2 md:row-span-2">
        <AnimatePresence mode="wait">
          {!showGame ? (
            <motion.div
              key="photo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={"/daniel.jpg"}
                alt="Daniel Ametsowou"
                width={1000}
                height={1000}
                className="flex-1 w-full h-full rounded-2xl object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <TicTacToe />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 order-3 md:col-start-1 md:self-end">
        <div className="flex flex-row gap-3 w-full md:w-auto">
          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-background text-foreground hover:bg-background/90 py-4 px-6 md:py-8 md:px-10 rounded-4xl flex-1 md:flex-none text-center",
            )}
          >
            Contact Me
          </Link>
          <Link
            href="https://blog.ametsowou.me"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-background/50 text-foreground hover:bg-background/90 py-4 px-6 md:py-8 md:px-10 rounded-4xl flex-1 md:flex-none text-center",
            )}
          >
            Visit My Blog
          </Link>
        </div>
        <div className="hidden md:flex">
          <button
            onClick={() => setShowGame(!showGame)}
            className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
          >
            {showGame ? (
              <>
                <User size={16} /> Show Photo
              </>
            ) : (
              <>
                <Gamepad2 size={16} /> Play Mini Game
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
