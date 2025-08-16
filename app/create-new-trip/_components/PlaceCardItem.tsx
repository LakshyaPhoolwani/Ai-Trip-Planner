"use client";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Ticket } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Activity } from "./ChatBox";
import axios from "axios";

type Props = {
  activity: Activity;
};
function PlaceCardItem({ activity }: Props) {
  const [photoUrl, setPhotoUrl] = React.useState<string>();
  useEffect(() => {
    activity && GetGooglePlaceDetail();
  }, [activity]);

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-place-detail", {
      placeName: activity?.place_name + ":" + activity?.place_address,
    });
    if (result?.data?.error) {
      console.error("Error fetching Google Place details:", result.data.error);
    }
    // console.log(result?.data);
    setPhotoUrl(result?.data);
  };
  return (
    <div className="border-b border-gray-200 py-2">
      <img
        src={
          // photoUrl
          //   ? photoUrl :
             "https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt={activity.place_name}
        className="w-[20vw] h-[18vh] object-cover rounded-xl"
      />
      <h2 className="font-semibold text-lg mt-2">{activity?.place_name}</h2>
      <p className="text-gray-500 line-clamp-2">{activity?.place_details}</p>
      <h2 className="flex gap-2 items-center text-blue-500 line-clamp-1">
        <Ticket />
        {activity?.ticket_pricing}
      </h2>
      <p className="flex text-orange-400 gap-2 line-clamp-1">
        <Clock />
        {activity?.best_time_to_visit}
      </p>
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${activity?.place_name}`}
        target="_blank"
      >
        <Button variant="outline" className="mt-2 w-full" size="sm">
          View <ExternalLink />
        </Button>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
