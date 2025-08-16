"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/dist/client/components/navigation";

export const suggestion = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="text-blue-400 h-5 w-5 hover:text-white" />,
  },
  {
    title: "Inspire me where to go",
    icon: <Plane className="text-green-500 h-5 w-5 hover:text-white" />,
  },
  {
    title: "Discover Hidden Gems",
    icon: <Landmark className="text-orange-500 h-5 w-5 hover:text-white" />,
  },
  {
    title: "Adventure Destination",
    icon: <Globe2 className="text-yellow-600 h-5 w-5 hover:text-white" />,
  },
];
function Hero() {
  const { user } = useUser();
  const router = useRouter();
  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    router.push("/create-new-trip");
  };
  return (
    <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 w-full flex justify-center px-4 sm:px-6 lg:px-8">
      {/* Content  */}
      <div className="max-w-4xl w-full text-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          Hey, I'm your AI{" "}
          <span className="text-primary">travel assistant!</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Tell me what you want, and I'll handle the rest: Flights, Hotels, trip
          Planner -all in seconds
        </p>
        {/* Input Box  */}
        <div>
          <div className="border rounded-2xl p-3 sm:p-4 relative flex items-center max-w-2xl mx-auto">
            <Textarea
              placeholder="Create a trip from Paris to New York ..."
              className="w-full h-20 sm:h-24 md:h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none pr-12 text-sm sm:text-base"
            />
            <Button
              size={"icon"}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => onSend()}
            >
              <Send className="h-3 w-3 sm:h-4 sm:w-4"></Send>
            </Button>
          </div>
        </div>
        {/* Suggestion list  */}
        <div className="grid grid-cols-2 lg:flex gap-2 sm:gap-3 lg:gap-5 max-w-4xl mx-auto">
          {suggestion.map((suggestions, index) => (
            <div
              key={index}
              className="flex items-center justify-center space-x-1 sm:space-x-2 gap-1 sm:gap-2 border rounded-full p-2 sm:p-3 cursor-pointer hover:bg-primary/80 transition-all hover:text-white text-center"
            >
              <span className="flex-shrink-0">{suggestions.icon}</span>
              <h2 className="text-xs sm:text-sm lg:text-base whitespace-nowrap overflow-hidden text-ellipsis">{suggestions.title}</h2>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center flex-col mt-8 sm:mt-12 lg:mt-14">
          <h2 className="my-4 sm:my-7 flex flex-col sm:flex-row gap-1 sm:gap-2 text-center items-center text-sm sm:text-base">
            Not Sure where to start? <strong>See how it works</strong>{" "}
            <ArrowDown />
          </h2>
          {/* Video Section  */}
          <div className="w-full max-w-3xl">
            <HeroVideoDialog
              className="block dark:hidden w-full"
              animationStyle="from-center"
              videoSrc="https://www.example.com/dummy-video"
              thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduot.jpg?p=facebook"
              thumbnailAlt="Dummy Video Thumbnail"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
