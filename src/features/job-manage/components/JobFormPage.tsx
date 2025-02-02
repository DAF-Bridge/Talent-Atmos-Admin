import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { JobFormValues } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Trash2 } from "lucide-react";
import MultipleSelector, { Option } from "@/components/ui/MultiSelect";
import { JobPublishToggle } from "./publish-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { jobErrMsg } from "../config/constant";
import RichTextEditor from "@/components/common/RichTextEditor";
import { alphabeticLength } from "@/lib/utils";

interface JobPageProps {
  form: UseFormReturn<JobFormValues>;
  onSubmit: (data: JobFormValues) => Promise<void>;
  isEditing: boolean;
  //   onCancel: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  //   onDelete: () => Promise<void>;
}

export default function JobFormPage({
  form,
  onSubmit,
  isEditing,
  isDialogOpen,
  setIsDialogOpen,
}: Readonly<JobPageProps>) {
  const DefaultVal: Option[] = [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form;

  const prerequisiteArr = watch("prerequisite");
  if (prerequisiteArr && prerequisiteArr.length > 0) {
    const multiSelectorValues = prerequisiteArr.map((pre) => pre.valueOf());

    multiSelectorValues.forEach((val) => {
      DefaultVal.push({ label: val, value: val });
    });
  }

  const validateAndOpenDialog = async () => {
    // Trigger all field validations
    const isFormValid = await form.trigger();

    // Check if the form is valid and there are no custom errors
    if (isFormValid) {
      setIsDialogOpen(true);
    } else {
      // Show error toast and scroll to the first error
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
      });

      // Find and scroll to the first error
      const firstError = document.querySelector(".error-msg");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="flex gap-4 px-4 py-4 h-full overflow-y-auto">
      <div className="w-full border-r pr-4 h-fit">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium mb-2 border-l-4 pl-2 border-orange-500">
            {isEditing ? "Edit Job Information" : "Create New Job"}
          </h1>
          {/* publish toggle button */}
          {isEditing && (
            <div className="flex items-center gap-3 border border-gray-300 bg-white px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <JobPublishToggle form={form} />
            </div>
          )}
        </div>
        <form
          className="space-y-8"
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.log("errors", errors)
          )}
        >
          <input
            type="hidden"
            id="orgId"
            {...register("id", {
              required: false,
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />

          <div>
            <Label
              htmlFor="title"
              className="sm:text-right required-input mt-2 required-input"
            >
              Job Title
            </Label>
            <div>
              <Input
                {...register("title", { required: jobErrMsg.title.required })}
                id="title"
                className="input-outline"
                placeholder="Enter job title"
              />
              {errors.title && (
                <span className="error-msg">
                  {errors.title.message as string}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="prerequisite" className="sm:text-right mt-2">
              Prerequisite
            </Label>
            <div>
              <MultipleSelector
                {...register("prerequisite")}
                value={DefaultVal}
                defaultOptions={DefaultVal}
                className="input-outline"
                placeholder="Type keywords, Press Enter to add"
                creatable
                hidePlaceholderWhenSelected
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
                onChange={(value) => {
                  setValue(
                    "prerequisite",
                    value.map((option) => option.value)
                  );
                }}
              />
              {errors.prerequisite && (
                <span className="error-msg">
                  {errors.prerequisite.message as string}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="location"
              className="sm:text-right required-input mt-2"
            >
              Location
            </Label>
            <div>
              <Input
                {...register("location", {
                  required: jobErrMsg.location.required,
                })}
                id="location"
                type="text"
                className="input-outline"
                placeholder="Enter job location"
              />
              {errors.location && (
                <span className="error-msg">
                  {errors.location.message as string}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="workplace"
              className="sm:text-right required-input mt-2"
            >
              Work Place
            </Label>
            <div>
              <Controller
                control={form.control}
                name="workplace"
                rules={{ required: jobErrMsg.workplace.required }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input-outline">
                      <SelectValue placeholder="Select workplace type" />
                    </SelectTrigger>
                    <SelectContent>
                      {WorkPlaceEnum.map((workplace) => (
                        <SelectItem
                          key={workplace.value}
                          value={workplace.value}
                        >
                          {workplace.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.workplace && (
                <span className="error-msg">
                  {errors.workplace.message as string}
                </span>
              )}
            </div>
          </div>

          {/* Work Type Select */}
          <div>
            <Label
              htmlFor="work_type"
              className="sm:text-right required-input mt-2"
            >
              Work Type
            </Label>
            <div>
              <Controller
                control={form.control}
                name="work_type"
                rules={{ required: jobErrMsg.work_type.required }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input-outline">
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      {WorkTypeEnum.map((workType) => (
                        <SelectItem key={workType.value} value={workType.value}>
                          {workType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.work_type && (
                <span className="error-msg">
                  {errors.work_type.message as string}
                </span>
              )}
            </div>
          </div>

          {/* Career Stage Select */}
          <div>
            <Label
              htmlFor="career_stage"
              className="sm:text-right required-input mt-2"
            >
              Career Stage
            </Label>
            <div>
              <Controller
                control={form.control}
                name="career_stage"
                rules={{ required: jobErrMsg.career_stage.required }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input-outline">
                      <SelectValue placeholder="Select career stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {CareerStageEnum.map((careerStage) => (
                        <SelectItem
                          key={careerStage.value}
                          value={careerStage.value}
                        >
                          {careerStage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.career_stage && (
                <span className="error-msg">
                  {errors.career_stage.message as string}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="description"
              className="sm:text-right required-input mt-2"
            >
              Description
            </Label>
            <Controller
              name="description"
              control={form.control}
              rules={{
                required: jobErrMsg.description.required,
                validate: {
                  minLength: (value) => {
                    if (
                      alphabeticLength(value) < jobErrMsg.description.minVal
                    ) {
                      return jobErrMsg.description.minLength;
                    }
                  },
                  maxLength: (value) => {
                    if (
                      alphabeticLength(value) > jobErrMsg.description.maxVal
                    ) {
                      return jobErrMsg.description.maxLength;
                    }
                  },
                },
              }}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.description && (
              <span className="error-msg">
                {errors.description.message as string}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="responsibilities"
              className="sm:text-right required-input mt-2"
            >
              Responsibilities
            </Label>
            <Controller
              name="responsibilities"
              control={form.control}
              rules={{
                required: jobErrMsg.responsibilities.required,
                validate: {
                  minLength: (value) => {
                    if (
                      alphabeticLength(value) <
                      jobErrMsg.responsibilities.minVal
                    ) {
                      return jobErrMsg.responsibilities.minLength;
                    }
                  },
                  maxLength: (value) => {
                    if (
                      alphabeticLength(value) >
                      jobErrMsg.responsibilities.maxVal
                    ) {
                      return jobErrMsg.responsibilities.maxLength;
                    }
                  },
                },
              }}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.responsibilities && (
              <span className="error-msg">
                {errors.responsibilities.message as string}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="qualifications"
              className="sm:text-right required-input mt-2"
            >
              Qualifications
            </Label>
            <Controller
              name="qualifications"
              control={form.control}
              rules={{
                required: jobErrMsg.qualifications.required,
                validate: {
                  minLength: (value) => {
                    if (
                      alphabeticLength(value) < jobErrMsg.qualifications.minVal
                    ) {
                      return jobErrMsg.qualifications.minLength;
                    }
                  },
                  maxLength: (value) => {
                    if (
                      alphabeticLength(value) > jobErrMsg.qualifications.maxVal
                    ) {
                      return jobErrMsg.qualifications.maxLength;
                    }
                  },
                },
              }}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.qualifications && (
              <span className="error-msg">
                {errors.qualifications.message as string}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="period"
              className="sm:text-right required-input mt-2"
            >
              Work Period
            </Label>
            <div>
              <Input
                {...register("period", {
                  required: jobErrMsg.period.required,
                })}
                id="period"
                type="text"
                className="input-outline"
                placeholder="Enter work period"
              />
              {errors.period && (
                <span className="error-msg">
                  {errors.period.message as string}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="quantity"
              className="sm:text-right required-input mt-2"
            >
              Quantity
            </Label>
            <div>
              <Input
                {...register("quantity", {
                  required: jobErrMsg.quantity.required,
                  setValueAs: (value) => Number(value) || 0,
                })}
                id="quantity"
                type="number"
                className="input-outline"
                placeholder="Enter job quantity"
              />
              {errors.quantity && (
                <span className="error-msg">
                  {errors.quantity.message as string}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="salary"
              className="sm:text-right required-input mt-2"
            >
              Salary
            </Label>
            <div>
              <Input
                {...register("salary", {
                  required: jobErrMsg.salary.required,
                  setValueAs: (value) => Number(value) || 0,
                })}
                id="salary"
                type="number"
                className="input-outline"
                placeholder="Enter job salary"
              />
              {errors.salary && (
                <span className="error-msg">
                  {errors.salary.message as string}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <div>
              {isEditing && (
                <Button
                  type="button"
                  // onClick={() => {
                  //   onDelete();
                  // }}
                  className="flex items-center gap-1 text-red-500 hover:text-red-500 rounded-md
              border border-transparent hover:border-red-500 hover:bg-transparent bg-transparent shadow-none"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Delete Job</span>
                </Button>
              )}
            </div>
            <div className="flex justify-end gap-4 flex-1">
              <Button variant="outline" className="w-full lg:max-w-[200px]">
                Save as Draft
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Button
                  type="button"
                  onClick={validateAndOpenDialog}
                  disabled={isSubmitting}
                  className="w-full lg:max-w-[200px]"
                >
                  Save
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Publication</DialogTitle>
                    <DialogDescription>
                      <p className="text-center text-sm text-gray-700">
                        Are you sure you want to save and publish this event?
                        This action cannot be undone.
                      </p>

                      <div className="border-t mt-6 pt-4">
                        <div className="mx-auto flex justify-between items-center border rounded-lg w-full max-w-xs py-3 px-6 bg-gray-50 shadow-sm hover:shadow-md transition duration-200">
                          <span className="flex flex-col justify-center  items-center gap-2 text-sm font-medium text-gray-700">
                            <span className="text-sm">Status:</span>
                            <span
                              className={`text-sm font-medium ${
                                form.watch("status")
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              {form.watch("status")
                                ? "Will Be Published"
                                : "Will Not Publish"}
                            </span>
                          </span>
                          <div className="flex items-center gap-3">
                            <JobPublishToggle form={form} />
                          </div>
                        </div>

                        <p className="text-xs font-light italic text-center mt-3 text-gray-500">
                          This will publish the event and make it visible to the
                          public.
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const WorkPlaceEnum = [
  {
    value: "remote",
    label: "Remote",
  },
  {
    value: "onsite",
    label: "On-site",
  },
  {
    value: "hybrid",
    label: "Hybrid",
  },
];

const WorkTypeEnum = [
  {
    value: "fulltime",
    label: "Full-time",
  },
  {
    value: "parttime",
    label: "Part-time",
  },
  {
    value: "volunteer",
    label: "Volunteer",
  },
  {
    value: "internship",
    label: "Internship",
  },
];
const CareerStageEnum = [
  {
    value: "entrylevel",
    label: "Entry-level",
  },
  {
    value: "midlevel",
    label: "Mid-level",
  },
  {
    value: "senior",
    label: "Senior",
  },
];
