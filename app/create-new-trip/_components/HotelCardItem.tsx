"use client";
import { Button } from "@/components/ui/button";
import { Star, Wallet } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Hotel } from "./ChatBox";
import axios from "axios";

type Props = {
  hotel: Hotel;
};
function HotelCardItem({ hotel }: Props) {
  const [photoUrl, setPhotoUrl] = React.useState<string>();
  useEffect(() => {
    hotel && GetGooglePlaceDetail();
  }, [hotel]);

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-place-detail", {
      placeName: hotel?.hotel_name,
    });
    if(result?.data?.error){
      console.error("Error fetching Google Place details:", result.data.error);
    }
    // console.log(result?.data);
    setPhotoUrl(result?.data);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* <Image src="https://unsplash.com/photos/white-bed-linen-with-throw-pillows-Yrxr3bsPdS0" alt='place-image' width={400} height={200} className="rounded-xl shadow object-cover mb-2" /> */}
      <img
        // src={photoUrl?photoUrl:"https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        src={"https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        alt={hotel?.hotel_name}
        className="w-[20vw] h-[18vh] rounded-xl shadow object-cover mb-2"
      />
      <h2 className="font-semibold text-lg">{hotel?.hotel_name}</h2>
      <h2 className="text-gray-500">{hotel?.hotel_address}</h2>
      <div className="flex justify-between items-center">
        <p className=" flex gap-2 items-center text-green-500">
          <Wallet />
          {hotel.price_per_night}
        </p>
        <p className="text-yellow-500 flex gap-2 items-center">
          <Star />
          {hotel.rating}
        </p>
      </div>
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name}`}
        target="_blank"
      >
        <Button variant="outline" className="mt-2 w-full">
          View
        </Button>
      </Link>
      {/* <p className="text-gray-500">{hotel.description}</p> */}
    </div>
  );
}

export default HotelCardItem;
