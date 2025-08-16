"use client";
import React, { useEffect, useState } from "react";
import ChatBox from "./_components/ChatBox";
import Itinerary from "./_components/Itinerary";
import GlobalMap from "./_components/GlobalMap";
import { useTripDetail } from "../provider";
import { Button } from "@/components/ui/button";
import { Globe2, Plane } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CreateNewTrip() {
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [activeIndex, setActiveIndex] = useState(1);
  useEffect(() => {
    setTripDetailInfo(undefined);
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 p-4 sm:p-6 lg:p-10">
      <div className="lg:col-span-1">
        <ChatBox />
      </div>
      <div className="lg:col-span-2 relative order-first lg:order-last">
        {activeIndex == 0 ? <Itinerary /> : <GlobalMap />}
        <Tooltip>
          <TooltipTrigger className="absolute bg-black hover:bg-gray-700 bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 rounded-xl z-20">
            <Button
              size={window?.innerWidth < 640 ? "default" : "lg"}
              className="bg-black hover:bg-gray-700 text-white"
              onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
            >
              {activeIndex == 0 ? <Plane className="w-4 h-4 sm:w-5 sm:h-5" /> : <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Switch between Map and Trip</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default CreateNewTrip;
