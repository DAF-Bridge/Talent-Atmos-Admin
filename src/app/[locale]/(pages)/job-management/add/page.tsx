"use client";

// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { JobFormValues } from "@/lib/types";
import { useState } from "react";
import JobFormPage from "@/features/job-manage/components/JobFormPage";
import { toast } from "@/hooks/use-toast";

export default function AddJobPage() {
  // const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<JobFormValues>();

  //   useEffect(() => {
  //     const fetchJob = async () => {
  //       try {
  //         setIsLoading(true);
  //         const response = await fetch(
  //           formatInternalUrl(`/api/org/1/get-job/${params.id}`)
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to fetch job");
  //         }

  //         const job = await response.json();

  //         // Set form values for each field
  //         Object.keys(job).forEach((key) => {
  //           form.setValue(key as keyof JobFormValues, job[key]);
  //         });
  //       } catch (error) {
  //         console.error("Failed to fetch job details");
  //         toast.error("Failed to load job details");
  //         router.push("/job-management");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchJob();
  //   }, [params.id, form, router]);

  const onSubmit = async (data: JobFormValues) => {
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
    <JobFormPage
      form={form}
      onSubmit={onSubmit}
      isEditing={false}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      //   onCancel={() => router.push("/job-management")}
      //   onDelete={() => handleDelete(params.id)}
    />
  );
}
