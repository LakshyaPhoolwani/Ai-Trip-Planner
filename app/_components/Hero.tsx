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
    <div className="mt-24 w-full flex justify-center ">
      {/* Content  */}
      <div className="max-w-3xl w-full text-center space-y-6 ">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I'm your AI{" "}
          <span className="text-primary">travel assistant!</span>
        </h1>
        <p className="text-lg">
          Tell me what you want, and I'll handle the rest: Flights, Hotels, trip
          Planner -all in seconds
        </p>
        {/* Input Box  */}
        <div>
          <div className="border rounded-2xl p-4 relative flex items-center">
            <Textarea
              placeholder="Create a trip from Paris to New York ..."
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none pr-12"
            />
            <Button
              size={"icon"}
              className="absolute bottom-4 right-4"
              onClick={() => onSend()}
            >
              <Send className="h-4 w-4"></Send>
            </Button>
          </div>
        </div>
        {/* Suggestion list  */}
        <div className="flex gap-5">
          {suggestion.map((suggestions, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary/80 transition-all hover:text-white"
            >
              {suggestions.icon}
              <h2 className="text-xs">{suggestions.title}</h2>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center flex-col">
          <h2 className="my-7 mt-14 flex gap-2 text-center">
            Not Sure where to start? <strong>See how it works</strong>{" "}
            <ArrowDown />
          </h2>
          {/* Video Section  */}
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduot.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
