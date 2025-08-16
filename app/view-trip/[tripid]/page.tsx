"use client";
import GlobalMap from "@/app/create-new-trip/_components/GlobalMap";
import Itinerary from "@/app/create-new-trip/_components/Itinerary";
import { Trip } from "@/app/my-trips/page";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function ViewTrip() {
  const { tripid } = useParams();
  const { userDetail, setUserDetail } = useUserDetail();
  const convex = useConvex();
  const [tripData, setTripData] = React.useState<Trip>();
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  useEffect(() => {
    userDetail && GetTrip();
  }, [userDetail]);

  const GetTrip = async () => {
    const result = await convex.query(api.tripDetail.GetTripById, {
      uid: userDetail?._id,
      tripid: tripid + "",
    });
    console.log(result);
    setTripData(result);
    setTripDetailInfo(result?.tripDetail);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-0 p-4 lg:p-0 scrollbar-hide min-h-screen">
      <div className="lg:col-span-3 scrollbar-hide order-2 lg:order-1">
        <Itinerary />
      </div>
      <div className="lg:col-span-2 scrollbar-hide order-1 lg:order-2 h-[50vh] lg:h-auto">
        <GlobalMap />
      </div>
    </div>
  );
}

export default ViewTrip;
