"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import SelectDaysUi from "./SelectDaysUi";
import FinalUi from "./FinalUi";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo = {
  destination: string;
  budget: string;
  groupSize: string;
  duration: string;
  origin: string;
  hotels: Hotel[];
  itinerary: Itinerary;
};

export type Hotel = {
    hotel_name: string;
    hotel_address: string;
    price_per_night: string;
    hotel_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    rating: number;
    description: string;
}

export type Activity = {
    place_name: string;
    place_details: string;
    place_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    place_address: string;
    ticket_pricing: string;
    time_travel_each_location: string;
    best_time_to_visit: string;
}

export type Itinerary = {
    day: number;
    day_plan: string;
    best_time_to_visit_day: string;
    activities: Activity[];
}

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const { userDetail, setUserDetail } = useUserDetail();
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const onSend = async () => {
    if (!userInput?.trim()) return;

    setLoading(true);
    setUserInput("");
    const newMsg: Message = {
      role: "user",
      content: userInput ?? "",
    };

    setMessages((prev: Message[]) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal,
    });

    console.log("Trip", result.data);

    !isFinal &&
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content: result?.data?.response,
          ui: result?.data?.ui,
        },
      ]);
    console.log(result.data);

    if (isFinal) {
      setTripDetail(result?.data?.trip_plan);
      setTripDetailInfo(result?.data?.trip_plan);
      const tripId = uuidv4();
      await SaveTripDetail({
        tripDetail: result?.data?.trip_plan,
        tripId: tripId,
        uid: userDetail?._id,
      });
    }

    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      return (
        <BudgetUi
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    }
    if (ui == "groupSize") {
      return (
        <GroupSizeUi
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    }
    if (ui === "selectDays") {
      // ⬅ new UI type for days selection
      return (
        <SelectDaysUi
          onConfirm={(days: number) => {
            const msg = `I want to travel for ${days} day${days > 1 ? "s" : ""}.`;
            setUserInput(msg);
            onSend();
          }}
        />
      );
    }
    if (ui === "final") {
      // ⬅ NEW: final itinerary UI
      return (
        <FinalUi
          viewTrip={() => {
            console.log();
          }}
          disable={!tripDetail}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui == "final") {
      setIsFinal(true);
      setUserInput("Ok, Great!");
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal]);

  return (
    <div className="flex flex-col h-[70vh] sm:h-[75vh] lg:h-[85vh] border shadow rounded-2xl p-3 sm:p-4 lg:p-5">
      {messages?.length == 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}
      {/* display messages */}
      <section className="flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className="flex justify-end" key={index}>
              <div className="max-w-[85%] sm:max-w-lg bg-primary text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start" key={index}>
              <div className="max-w-[85%] sm:max-w-lg bg-gray-100 text-black px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] sm:max-w-lg bg-gray-100 text-black px-3 sm:px-4 py-2 rounded-lg">
              <Loader className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
      </section>
      {/* User input: */}
      <section>
        <div className="border rounded-2xl p-2 relative flex items-center mt-2 sm:mt-3">
          <Textarea
            placeholder="Start typing here ..."
            className="w-full h-16 sm:h-20 lg:h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none pr-12 text-sm sm:text-base"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
          />
          <Button
            size="icon"
            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-4 lg:right-4 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
            onClick={onSend}
          >
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
