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
    <Link href={'/view-trip/'+trip?.tripId} className="block border shadow rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-shadow">
      <img 
        src="https://plus.unsplash.com/premium_photo-1684407617236-9baf926474ad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt={trip.tripId} 
        className="rounded-xl object-cover w-full h-48 sm:h-56 lg:h-64"
      />
      <div className="mt-3 sm:mt-4">
        <h2 className="flex flex-col sm:flex-row gap-1 sm:gap-2 font-semibold text-base sm:text-lg lg:text-xl items-start sm:items-center">
          <span>{trip?.tripDetail?.origin}</span>
          <ArrowBigRightIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 hidden sm:block" />
          <span>{trip?.tripDetail?.destination}</span>
        </h2>
        <p className='mt-2 text-gray-500 text-sm sm:text-base'>
          {trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget
        </p>
      </div>
    </Link>
  )
}

export default MyTripCardItem

