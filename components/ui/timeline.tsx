"use client";
import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import { Calendar, Users,  Wallet2 } from "lucide-react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data, tripData }: { data: TimelineEntry[], tripData: TripInfo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans px-4 sm:px-6 md:px-8 lg:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-7">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 text-black dark:text-white max-w-4xl leading-tight">
          Your Trip Itinerary from <strong className="text-primary">{tripData?.origin}</strong> to <strong className="text-primary">{tripData?.destination}</strong> is Ready
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
          <div className="flex gap-2 items-center text-sm sm:text-base">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{tripData?.duration}</span>
          </div>
          <div className="flex gap-2 items-center text-sm sm:text-base">
            <Wallet2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{tripData?.budget}</span>
          </div>
          <div className="flex gap-2 items-center text-sm sm:text-base">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{tripData?.group_size}</span>
          </div>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-10 sm:pb-16 lg:pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-6 sm:pt-8 lg:pt-10 gap-4 sm:gap-6 lg:gap-10"
          >
            <div className="sticky flex flex-col lg:flex-row z-40 items-start lg:items-center top-20 sm:top-32 lg:top-40 self-start max-w-xs lg:max-w-sm lg:w-[40%]">
              <div className="h-8 w-8 sm:h-10 sm:w-10 absolute left-0 lg:left-3 rounded-full bg-white dark:bg-black flex items-center justify-center border">
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
              </div>
              <h3 className="hidden lg:block text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-neutral-500 dark:text-neutral-500 pl-12 lg:pl-16 xl:pl-20">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-12 sm:pl-16 lg:pl-4 pr-2 sm:pr-4 w-full">
              <h3 className="lg:hidden block text-lg sm:text-xl mb-3 sm:mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-4 sm:left-5 lg:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
