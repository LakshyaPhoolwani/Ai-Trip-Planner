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
    <div className="grid grid-cols-5 scrollbar-hide">
      <div className="col-span-3 scrollbar-hide`">
        <Itinerary />
      </div>
      <div className="col-span-2 scrollbar-hide">
        <GlobalMap />
      </div>
    </div>
  );
}

export default ViewTrip;
