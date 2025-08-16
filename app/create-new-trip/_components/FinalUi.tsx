import React from "react";
import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
function FinalUi({ viewTrip, disable }: any) {
  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-lg shadow">
      {/* Icon */}
      <Globe2 className="text-primary text-4xl animate-bounce" />

      {/* Heading */}
      <h2 className="mt-3 text-lg font-semibold text-primary">
        ✈️ Planning your dream trip...
      </h2>

      {/* Subheading */}
      <p className="text-gray-500 text-sm text-center mt-1">
        Gathering best destinations, activities, and travel details for you.
      </p>

      {/* Action Button */}
      <Button
        disabled={disable}
        onClick={viewTrip}
        className="mt-2 w-full"
      >
        View Trip
      </Button>

      {/* Optional Progress Indicator */}
      {/* 
      <div className="w-48 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div className="h-2 bg-primary animate-pulse w-3/4" />
      </div> 
      */}
    </div>
  );
}
export default FinalUi;
