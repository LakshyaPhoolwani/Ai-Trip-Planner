"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./ChatBox";
import { ArrowLeft } from "lucide-react";

// const TRIP_DATA = {
//     destination: "Goa",
//     duration: "2 days",
//     origin: "Bhopal",
//     budget: "Moderate",
//     group_size: "2 (Couple)",
//     hotels: [
//       {
//         hotel_name: "Resorte Marinha Dourada",
//         hotel_address: "In front of Miramar Beach, Panaji, Goa 403001",
//         price_per_night: "₹3500",
//         hotel_image_url:
//           "https://www.resortemarinhadourada.com/images/rooms/room1.jpg",
//         geo_coordinates: {
//           latitude: 15.4911,
//           longitude: 73.8197,
//         },
//         rating: 4,
//         description:
//           "A beachfront hotel near Miramar Beach offering comfortable rooms with modern amenities, perfect for adventure lovers and beach explorers.",
//       },
//       {
//         hotel_name: "The Park Baga River Goa",
//         hotel_address: "Manesar Road, Baga, Goa 403517",
//         price_per_night: "₹4000",
//         hotel_image_url:
//           "https://cdn.parkhotels.co.in/the-park-goa-baga-river/thedesk__1.jpg",
//         geo_coordinates: {
//           latitude: 15.5845,
//           longitude: 73.7509,
//         },
//         rating: 4.2,
//         description:
//           "Stylish hotel overlooking Baga River, offering a mix of adventure activities, relaxing spa, and great access to beach nightlife.",
//       },
//       {
//         hotel_name: "Acron Waterfront Resort",
//         hotel_address: "Baga Waterworld Complex, Baga, Goa 403518",
//         price_per_night: "₹3200",
//         hotel_image_url:
//           "https://acronwaterfrontresort.com/wp-content/uploads/2020/06/main_image_04-1.jpg",
//         geo_coordinates: {
//           latitude: 15.5829,
//           longitude: 73.7553,
//         },
//         rating: 3.8,
//         description:
//           "Set on the banks of the Baga River, the resort offers scenic views, easy access to water sports, and comfortable stays within budget.",
//       },
//     ],
//     itinerary: [
//       {
//         day: 1,
//         day_plan: "Arrival in Goa and Water Sports at Baga Beach",
//         best_time_to_visit_day: "8:00 AM to 6:00 PM",
//         activities: [
//           {
//             place_name: "Baga Beach",
//             place_details:
//               "Popular beach known for adventure water sports such as parasailing, jet skiing, banana boat rides, and windsurfing.",
//             place_image_url:
//               "https://www.goaholidayhomes.com/images/places/baga_beach.jpg",
//             geo_coordinates: {
//               latitude: 15.585,
//               longitude: 73.757,
//             },
//             place_address: "Baga Beach, Bardez, Goa 403518",
//             ticket_pricing:
//               "Water sports package approx ₹1000-₹2000 per person",
//             time_travel_each_location:
//               "Travel from hotel to Baga Beach: 10-15 mins",
//             best_time_to_visit:
//               "Early morning or late afternoon for pleasant weather",
//           },
//           {
//             place_name: "Anjuna Beach",
//             place_details:
//               "Known for its vibrant beach market and hilltop viewpoints, perfect for sunset watching and some cliff diving spots.",
//             place_image_url:
//               "https://www.goatourism.gov.in/sites/default/files/styles/port_500_300/public/2019-12/anjuna.jpg",
//             geo_coordinates: {
//               latitude: 15.614,
//               longitude: 73.744,
//             },
//             place_address: "Anjuna Beach, Bardez, Goa 403509",
//             ticket_pricing: "Free",
//             time_travel_each_location:
//               "Travel from Baga Beach to Anjuna Beach: 20-25 mins",
//             best_time_to_visit: "Sunset hours (5:00 PM to 7:00 PM)",
//           },
//         ],
//       },
//       {
//         day: 2,
//         day_plan: "Adventure Tour to Dudhsagar Waterfalls and Spice Plantation",
//         best_time_to_visit_day: "7:00 AM to 5:30 PM",
//         activities: [
//           {
//             place_name: "Dudhsagar Waterfalls",
//             place_details:
//               "Tallest waterfall in Goa offering an adventure-filled trek, jeep safari through forest trails, and breathtaking views.",
//             place_image_url:
//               "https://upload.wikimedia.org/wikipedia/commons/3/35/Dudhsagar_fast_waters_Goa_India.jpg",
//             geo_coordinates: {
//               latitude: 15.3143,
//               longitude: 74.2066,
//             },
//             place_address: "Mollem National Park, Goa 403401",
//             ticket_pricing:
//               "Entry ₹50 per person, Jeep safari approx ₹500 per person",
//             time_travel_each_location:
//               "Travel from hotel to Dudhsagar: Approx 2.5 to 3 hours",
//             best_time_to_visit:
//               "Morning hours for cooler temperature and better visibility",
//           },
//           {
//             place_name: "Spice Plantation Tour",
//             place_details:
//               "Guided tour of Goa’s spice plantations with opportunities to learn about various exotic spices, enjoy local cuisine, and cultural performances.",
//             place_image_url:
//               "https://www.spicesofindia.com/wp-content/uploads/2020/07/spice-plantation-in-goa.jpg",
//             geo_coordinates: {
//               latitude: 15.383,
//               longitude: 74.074,
//             },
//             place_address: "Ponda, Goa 403401",
//             ticket_pricing: "Tour package approx ₹300-₹500 per person",
//             time_travel_each_location:
//               "Travel from Dudhsagar to Spice Plantation: Approx 1 hour",
//             best_time_to_visit: "Early afternoon after Dudhsagar visit",
//           },
//         ],
//       },
//     ],
//   }

function Itinerary() {
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    if (tripDetailInfo) {
      setTripData(tripDetailInfo);
    }
  }, [tripDetailInfo]);

  const data = tripData
    ? [
        {
          title: "Recommended Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripData?.hotels.map((hotel, index) => (
                <HotelCardItem key={index} hotel={hotel} />
              ))}
            </div>
          ),
        },
        //@ts-ignore
        ...tripData?.itinerary.map((dayData) => ({
          title: `Day ${dayData?.day}`,
          content: (
            <div>
              <p>Best Time : {dayData?.best_time_to_visit_day}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* @ts-ignore */}
                {dayData?.activities.map((activity, index) => (
                  <PlaceCardItem key={index} activity={activity} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];
  return (
    <div className="relative w-full overflow-auto h-[70vh] sm:h-[75vh] lg:h-[83vh]">
      {/* @ts-ignore */}
      {tripData ? (
        <Timeline data={data} tripData={tripData} />
      ) : (
        <div className="relative">
          <h2 className="flex flex-col sm:flex-row gap-2 text-lg sm:text-2xl lg:text-3xl text-white items-center absolute bottom-10 sm:bottom-16 lg:bottom-20 left-4 sm:left-8 lg:left-12 z-10 max-w-xs sm:max-w-md lg:max-w-lg">
            <ArrowLeft /> Getting to know you to build perfect trip
          </h2>
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww"
            alt="travel"
            className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] object-cover rounded-2xl sm:rounded-3xl"
          />
          
        </div>
      )}
    </div>
  );
}

export default Itinerary;
