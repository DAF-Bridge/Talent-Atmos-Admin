"use client";

import { DatePickerWithRange } from "@/components/common/DateRangePicker";
import ImageDialog from "@/components/common/ImageDialog";
import MultipleSelectorWithAsyncSearchAndOnFocus from "@/components/common/MultiSelectWithSearch";
import RichTextEditor from "@/components/common/RichTextEditor";
import TimeRangePicker from "@/components/common/TimeRangePicker";
import { provinces } from "@/components/config/Provinces";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { CloudUpload, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Controller,
  FieldError,
  FieldValues,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { eventErrMsg } from "./constants";

export type EventFormValues = {
  picUrl: string;
  name: string;
  description: string;
  location: string;
  province: string;
  country: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  latitude: string;
  longitude: string;
  price: string;
  regLink: string;
  status: "draft" | "published" | "";
  categories: { value: string; label: string }[];
  contactChannels: { type: string; url: string }[];
};

export default function AddEventPage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<EventFormValues>({
    defaultValues: {
      picUrl: "",
      name: "Event1",
      description: "asdfghjklzz",
      location: "loc1",
      province: "กรุงเทพมหานคร",
      country: "TH",
      startDate: "2025-02-14T17:00:00.000Z", // 15 Feb 2025 UTC+7
      endDate: "2025-03-28T17:00:00.000Z", // 29 Mar 2025 UTC+7
      startTime: "2025-01-31T23:00:00.000Z", // 6:00 UTC+7
      endTime: "2025-02-01T02:00:00.000Z", // 09:00 UTC+7
      latitude: "10",
      longitude: "10",
      price: "free",
      regLink: "https://ui.shadcn.com/docs",
      status: "",
      categories: [{ value: "cate1", label: "cate1" }],
      contactChannels: [
        { type: "Instagram", url: "https://ui.shadcn.com/docs" },
      ],
    },
  });

  const {
    register,
    control,
    formState: { errors, isValid, isSubmitting },
    setError,
    clearErrors,
    setValue,
    watch,
    handleSubmit,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactChannels",
  });

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

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate file size (max 10MB) and type (JPEG/PNG)
      if (file.size > 10 * 1024 * 1024) {
        setError("picUrl", {
          type: "manual",
          message: "File size must be less than 10MB",
        });
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError("picUrl", {
          type: "manual",
          message: "Only JPEG and PNG files are allowed",
        });
        return;
      }

      // Additional check for file extension
      const fileName = file.name.toLowerCase();
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png")
      ) {
        setError("picUrl", {
          type: "manual",
          message: "Only .jpg, .jpeg, and .png files are allowed",
        });
        return;
      }

      // If validation passes, clear previous errors
      clearErrors("picUrl");

      const reader = new FileReader();
      reader.onload = () => {
        const fileString = reader.result as string;
        setValue("picUrl", fileString); // Update the form's logo value
        setLogoPreview(fileString); // Set image preview
      };
      reader.readAsDataURL(file);
    } else {
      setError("picUrl", {
        type: "manual",
        message: "Please select a valid file",
      });
    }
  };

  const onSubmit = (data: FieldValues) => {
    if (!data.picUrl) {
      setError("picUrl", {
        type: "manual",
        message: "Please upload an image",
      });
      return;
    }

    if (!isValid) {
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

  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png";
    input.onchange = (e: Event) =>
      handlePosterChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  return (
    <div className="flex gap-4 px-4 py-4 h-full overflow-y-auto">
      <div className="w-full border-r pr-4 h-fit">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium mb-2 border-l-4 pl-2 border-orange-500">
            Event Information Editor
          </h1>
          {/* publish toggle button */}
          <div className="flex items-center gap-3 border border-gray-300 bg-white px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition duration-200">
            <PublishToggle form={form} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-24">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex justify-start items-start gap-5 mt-6 mx-auto">
              {logoPreview ? (
                <div
                  style={{ aspectRatio: "3/4" }}
                  className="rounded-sm overflow-hidden h-[400px] w-auto drop-shadow-md border"
                >
                  <div className="absolute top-1 right-1 transform z-50">
                    <button
                      onClick={handleUploadImage}
                      type="button"
                      className="text-sm text-white text-medium bg-black/40 hover:bg-black/80 px-4 py-[6px] rounded-md"
                    >
                      Change File
                    </button>
                  </div>

                  <div className="absolute top-1 left-1 transform z-50">
                    <ImageDialog imgUrl={logoPreview} />
                  </div>

                  <Image
                    style={{ aspectRatio: "3/4" }}
                    src={logoPreview}
                    alt="Logo"
                    className="object-cover"
                    width={500}
                    height={500}
                  />
                </div>
              ) : (
                <div
                  className="bg-white text-gray-400 flex flex-col text-center items-center 
                justify-center rounded-sm h-[400px] w-auto border p-4"
                  style={{ aspectRatio: "3/4" }}
                >
                  <CloudUpload className="w-12 h-12 mx-auto" />
                  <p className="text-sm mt-2">Upload Poster</p>
                  <p className="text-xs mt-1 text-muted-foreground">
                    {"Aspect ratio: 3:4"}
                  </p>
                  <p className="text-xs mt-1 text-muted-foreground">
                    {"Max 10 MB"}
                  </p>
                  <button
                    onClick={handleUploadImage}
                    type="button"
                    className="mt-2 text-sm text-white text-medium bg-black px-4 py-[6px] rounded-md"
                  >
                    Choose File
                  </button>
                  <input
                    {...register("picUrl", {
                      required: eventErrMsg.picUrl.required,
                    })}
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png"
                    onChange={handlePosterChange}
                  />
                  {errors.picUrl && (
                    <p className="text-center error-msg mt-2">
                      {errors.picUrl.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 min-w-[350px] flex-1">
              <div className="mt-6 w-full">
                <div>
                  <Label htmlFor="name" className="text-lg">
                    Event Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    className="rounded-md border border-gray-300 shadow-sm sm:text-sm"
                    {...register("name", {
                      required: eventErrMsg.name.required,
                      minLength: {
                        value: eventErrMsg.name.minVal,
                        message: eventErrMsg.name.minLength,
                      },
                      maxLength: {
                        value: eventErrMsg.name.maxVal,
                        message: eventErrMsg.name.maxLength,
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="error-msg">{errors.name.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-start items-start flex-wrap gap-4 flex-1 w-full">
                  <DatePickerWithRange
                    form={form}
                    className="w-full flex-1 min-w-[350px]"
                    errMsg={eventErrMsg.startDate.required}
                  />
                  <TimeRangePicker
                    form={form}
                    className="w-full flex-1 min-w-[350px]"
                    errMsgStartTime={eventErrMsg.startTime.required}
                    errMsgEndTime={eventErrMsg.endTime.required}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="priceType">Price Type</Label>
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: eventErrMsg.price.required }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.price && (
                  <p className="error-msg">{errors.price.message}</p>
                )}
              </div>
              <div className="mt-4">
                <Label>Categories</Label>
                <MultipleSelectorWithAsyncSearchAndOnFocus
                  form={form}
                  errMessage={eventErrMsg.categories.required}
                />
                {errors.categories && (
                  <p className="error-msg">{errors.categories.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              rules={{
                required: eventErrMsg.description.required,
                validate: {
                  minLength: (value) => {
                    if (
                      alphabeticLength(value) < eventErrMsg.description.minVal
                    ) {
                      return eventErrMsg.description.minLength;
                    }
                  },
                  maxLength: (value) => {
                    if (
                      alphabeticLength(value) > eventErrMsg.description.maxVal
                    ) {
                      return eventErrMsg.description.maxLength;
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
              <p className="error-msg">{errors.description.message}</p>
            )}
          </div>

          {/* Map geolocation */}
          <div className="flex flex-col gap-2 mt-2">
            <h1 className="text-base font-medium border-l-4 pl-2 border-orange-500">
              Map & Location
            </h1>
            <div className="mb-2">
              <Label htmlFor="location">Location Name</Label>
              <Input
                type="text"
                id="location"
                className="block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                {...register("location", {
                  required: eventErrMsg.location.required,
                  minLength: {
                    value: eventErrMsg.location.minVal,
                    message: eventErrMsg.location.minLength,
                  },
                })}
              />
              {errors.location && (
                <p className="error-msg">{errors.location.message}</p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                {/* province */}
                <Label htmlFor="province">Province</Label>
                <Controller
                  name="province"
                  control={control}
                  rules={{ required: eventErrMsg.province.required }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="placeholder:font-light placeholder:text-sm"
                        id="province"
                      >
                        <SelectValue
                          className="font-light placeholder:font-light [&:not(:placeholder-shown)]:font-normal"
                          placeholder="สถานที่"
                        />
                      </SelectTrigger>
                      <SelectContent className="h-[300px]">
                        {Object.entries(provinces).map(
                          ([region, provinceList]) => (
                            <SelectGroup key={region}>
                              <SelectLabel className="bg-gray-50 text-center text-sm">
                                {region}
                              </SelectLabel>

                              {provinceList.map((province) => (
                                <SelectItem
                                  className="text-sm"
                                  key={province}
                                  value={province}
                                >
                                  {province}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.province && (
                  <p className="error-msg mt-1">{errors.province.message}</p>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: eventErrMsg.country.required }}
                  defaultValue={watch("country")}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TH">Thailand</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <p className="error-msg mt-1">{errors.country.message}</p>
                )}
              </div>
            </div>

            <div className="mt-2">
              <span className="text-base font-medium">Map Coordinate</span>
              <span className="text-xs text-muted-foreground font-light">
                {" (required for map display)"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Label
                  htmlFor="latitude"
                  className="text-xs text-muted-foreground"
                >
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  {...register("latitude", {
                    required: eventErrMsg.latitude.required,
                    pattern: {
                      value: eventErrMsg.latitude.pattern.value,
                      message: eventErrMsg.latitude.pattern.message,
                    },
                  })}
                  placeholder="13.7563..."
                />
                {errors.latitude && (
                  <p className="error-msg mt-1">{errors.latitude.message}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="longitude"
                  className="text-xs text-muted-foreground"
                >
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  {...register("longitude", {
                    required: eventErrMsg.longitude.required,
                    pattern: {
                      value: eventErrMsg.longitude.pattern.value,
                      message: eventErrMsg.longitude.pattern.message,
                    },
                  })}
                  placeholder="100.3456..."
                />
                {errors.longitude && (
                  <p className="error-msg mt-1">{errors.longitude.message}</p>
                )}
              </div>
            </div>
          </div>
          {/* Reg link */}
          <div>
            <p className="text-base font-medium border-l-4 pl-2 border-orange-500">
              Registration Link
            </p>
            <div className="mt-2">
              <Input
                type="text"
                id="regLink"
                placeholder="Link to registration form or page"
                className="block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                {...register("regLink", {
                  required: eventErrMsg.regLink.required,
                  pattern: {
                    value: eventErrMsg.regLink.pattern.value,
                    message: eventErrMsg.regLink.pattern.message,
                  },
                })}
              />
              {errors.regLink && (
                <p className="error-msg mt-1">{errors.regLink.message}</p>
              )}
            </div>
          </div>

          {/* Contact Channels */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-base font-medium border-l-4 pl-2 border-orange-500">
                Contact Channels
              </h1>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={fields.length >= 4}
                onClick={() => append({ type: "", url: "" })}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Channel
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Label htmlFor={`contactChannels.${index}.type`}>
                      Channel Name
                    </Label>
                    <Controller
                      name={`contactChannels.${index}.type`}
                      control={control}
                      rules={{
                        required: eventErrMsg.contactChannels.type.required,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger id={`contactChannels.${index}.type`}>
                            <SelectValue placeholder="e.g. Facebook, Twitter, LinkedIn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="Twitter">Twitter</SelectItem>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="Website">Website</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.contactChannels?.[index]?.type && (
                      <p className="error-msg mt-1">
                        {
                          (errors.contactChannels[index].type as FieldError)
                            ?.message
                        }
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`contactChannels.${index}.url`}>URL</Label>
                    <Input
                      id={`contactChannels.${index}.url`}
                      placeholder="https://"
                      {...register(`contactChannels.${index}.url`, {
                        required: eventErrMsg.contactChannels.url.required,
                        pattern: {
                          value: eventErrMsg.contactChannels.url.pattern.value,
                          message:
                            eventErrMsg.contactChannels.url.pattern.message,
                        },
                      })}
                    />
                    {errors.contactChannels?.[index]?.url && (
                      <p className="error-msg mt-1">
                        {errors.contactChannels[index].url.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
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
                      Are you sure you want to save and publish this event? This
                      action cannot be undone.
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
                          <PublishToggle form={form} />
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
        </form>
      </div>
    </div>
  );
}

const alphabeticLength = (value: string) => {
  // Remove HTML tags
  const textWithoutHtml = value.replace(/<[^>]*>/g, "");
  // Remove non-alphabetic characters (including spaces)
  return textWithoutHtml.replace(/[^a-zA-Z]/g, "").length;
};

const PublishToggle = ({ form }: { form: UseFormReturn<EventFormValues> }) => {
  return (
    <div className="flex items-center gap-2">
      <Controller
        control={form.control}
        name="status"
        render={({ field }) => (
          <Switch
            id="publish-toggle"
            checked={field.value === "published"}
            onCheckedChange={(checked) =>
              field.onChange(checked ? "published" : "")
            }
          />
        )}
      />
      <Label htmlFor="publish-toggle" className="font-medium text-gray-700">
        Publish
      </Label>
    </div>
  );
};

// defaultValues: {
//   picUrl: "",
//   name: "Event1",
//   description: "asdfghjklzz",
//   location: "loc1",
//   province: "กรุงเทพมหานคร",
//   country: "TH",
//   startDate: "2025-02-14T17:00:00.000Z", // 15 Feb 2025 UTC+7
//   endDate: "2025-03-28T17:00:00.000Z", // 29 Mar 2025 UTC+7
//   startTime: "2025-01-31T23:00:00.000Z", // 6:00 UTC+7
//   endTime: "2025-02-01T02:00:00.000Z", // 09:00 UTC+7
//   latitude: "10",
//   longitude: "10",
//   price: "free",
//   regLink: "https://ui.shadcn.com/docs",
//   isPublished: false,
//   categories: [{ value: "cate1", label: "cate1" }],
//   contactChannels: [
//     { type: "Instagram", url: "https://ui.shadcn.com/docs" },
//   ],
// },
