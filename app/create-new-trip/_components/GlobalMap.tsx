import React, { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useTripDetail } from "@/app/provider";
import { Activity, Itinerary } from "./ChatBox";

function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  // @ts-ignore
  const { tripDetailInfo } = useTripDetail();

  useEffect(() => {
    mapboxgl.accessToken = process?.env?.NEXT_PUBLIC_MAPBOX_API_KEY;

    if(!mapRef.current){
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [-74.5, 40],
          zoom: 1.7,
          projection: "globe",
        });
    }

    const markers: mapboxgl.Marker[] = [];

      if (tripDetailInfo?.itinerary) {
        tripDetailInfo.itinerary.forEach((itinerary: Itinerary) => {
          itinerary.activities.forEach((activity: Activity) => {
            if (
              activity?.geo_coordinates?.longitude &&
              activity?.geo_coordinates?.latitude
            ) {
             const marker = new mapboxgl.Marker({ color: "red" })
                .setLngLat([
                  activity.geo_coordinates.longitude,
                  activity.geo_coordinates.latitude,
                ])
                .setPopup(
                  new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name)
                )
                .addTo(mapRef.current!);
                markers.push(marker);
                const coordinates = [
                  activity?.geo_coordinates?.longitude,
                  activity?.geo_coordinates?.latitude,
                ] as [number, number];
                mapRef.current!.flyTo({
                    center: coordinates,
                    zoom:10,
                    essential: true,
                })
            }
          });
        });
      }

    // Clean up on unmount
    return () => markers.forEach(marker => marker.remove());
  }, [tripDetailInfo]);

  return (
    <div
        ref={mapContainerRef}
        className="w-[95%] h-[70vh] sm:h-[75vh] lg:h-[85vh] rounded-2xl"
      />
  );
}

export default GlobalMap;
