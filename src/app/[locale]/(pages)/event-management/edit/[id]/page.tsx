"use client";

import EventFormPage from "@/features/event-manage/components/EventFormPage";
import { toast } from "@/hooks/use-toast";
import { EventFormValues } from "@/lib/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditEventPage() {

  const form = useForm<EventFormValues>({
    defaultValues: {
      picUrl: "",
      name: "",
      content: "",
      locationName: "",
      locationType: "",
      audience: "",
      province: "",
      country: "TH",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      latitude: "",
      longitude: "",
      priceType: "free",
      registerLink: "",
      status: "",
      categories: [],
      contactChannels: [{ media: "", mediaLink: "" }],
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch event data from the server
  // React.useEffect(() => {
  //   const fetchEvent = async () => {
  //     const res = await fetch(`/api/event/${params.id}`);
  //     const data = await res.json();
  //     form.reset(data);
  //   };
  //   fetchEvent();
  // }, []);

  const onSubmit = async (data: EventFormValues) => {
    if (!data.picUrl) {
      form.setError("picUrl", {
        type: "manual",
        message: "Please upload an image",
      });
      return;
    }

    if (!form.formState.isValid) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
      });
      return;
    }

    // Close the dialog
    setIsDialogOpen(false);

    // If all validations pass, proceed with form submission
    console.log(data);
    toast({
      title: "Success",
      description: "Event saved and published successfully!",
    });
  };

  return (
    <EventFormPage
      form={form}
      onSubmit={onSubmit}
      isEditing={true}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
    />
  );
}
