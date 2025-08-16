"use client"
import React, { useEffect } from 'react'
import { Trip } from '../page'
import { ArrowBigRightIcon } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

type Props = {
    trip: Trip
}
function MyTripCardItem({ trip }: Props) {
    const [photoUrl, setPhotoUrl] = React.useState<string>();
    useEffect(() => {
      trip && GetGooglePlaceDetail();
    }, [trip]);

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post("/api/google-place-detail", {
            //@ts-ignore
          placeName: trip?.tripDetail?.destination
        });
        if (result?.data?.error) {
          console.error("Error fetching Google Place details:", result.data.error);
        }
        // console.log(result?.data);
        setPhotoUrl(result?.data);
      };
  return (
    <Link href={'/view-trip/'+trip?.tripId} className="border-b py-4 p-5 shadow rounded-2xl">
      <img src="https://plus.unsplash.com/premium_photo-1684407617236-9baf926474ad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={trip.tripId} width={400} height={400} className="rounded-xl object-cover w-full h-[270px]" />
      <h2 className="flex gap-2 font-semibold text-xl mt-2">{trip?.tripDetail?.origin} <ArrowBigRightIcon /> {trip?.tripDetail?.destination}</h2>
      <h2 className='mt-2 text-grey-500'>{trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget</h2>
    </Link>
  )
}

export default MyTripCardItem

