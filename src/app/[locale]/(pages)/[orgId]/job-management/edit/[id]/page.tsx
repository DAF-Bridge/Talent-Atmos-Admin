"use client";

import { useForm } from "react-hook-form";
import { JobFormValues } from "@/lib/types";
import { useEffect, useState } from "react";
import JobFormPage from "@/features/job-manage/components/JobFormPage";
import { toast } from "@/hooks/use-toast";
import { deleteJob, getOrgJobById } from "@/features/job-manage/api/action";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "@/i18n/routing";

export default function EditJobPage({
  params,
}: Readonly<{ params: { orgId: string; id: string } }>) {
  const orgId = params.orgId;
  const jobId = params.id;
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<JobFormValues | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<JobFormValues>({
    defaultValues: initialValues || {
      title: "",
      scope: "",
      prerequisite: [],
      location: "",
      workplace: "",
      workType: "",
      registerLink: "",
      careerStage: "",
      period: "",
      description: "",
      qualifications: "",
      quantity: undefined,
      salary: undefined,
      province: "",
      country: "",
      status: "draft",
      categories: [],
    },
  });

  // Fetch event data from the server
  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const result = await getOrgJobById(orgId, jobId);
        const event = result.data;
        console.log(event);

        // Transform the data if necessary
        const formattedJob: JobFormValues = {
          ...event,
          startDate: event.startDate
            ? new Date(event.startDate).toISOString().split("T")[0]
            : "",
          endDate: event.endDate
            ? new Date(event.endDate).toISOString().split("T")[0]
            : "",
          // Add any other necessary transformations here
        };

        setInitialValues(formattedJob);
        form.reset(formattedJob);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load job data. Please try again.",
        });
        router.push(`/${orgId}/job-management`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [orgId, jobId, form, router]);

  const onDelete = async () => {
    try {
      const result = await deleteJob(orgId, jobId);

      if (!result.success) {
        throw new Error(result.error);
      }

      setIsDialogOpen(false);
      toast({ title: "Success", description: result.message });
      router.push(`/${orgId}/job-management`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast({
          title: "Failed to delete job",
          variant: "destructive",
          description: error.toString(),
        });
      }
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center mt-[200px] w-full">
        <Spinner />
        <span className="text-center">Loading...</span>
      </div>
    );
  }

  return (
    <JobFormPage
      form={form}
      onSubmit={onSubmit}
      isEditing={true}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      onDelete={onDelete}
    />
  );
}
