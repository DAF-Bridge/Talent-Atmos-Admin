"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  FieldValues,
  FieldError,
} from "react-hook-form";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function OrgRegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      userEmail: "",
      logo: "",
      email: "",
      name: "",
      headline: "",
      specialty: "",
      description: "",
      address: "",
      province: "",
      country: "TH",
      latitude: "",
      longitude: "",
      telephone: "",
      contactChannels: [{ type: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactChannels",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    // Here you would typically send the data to your API
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate file size (max 10MB) and type (JPEG/PNG)
      if (file.size > 10 * 1024 * 1024) {
        setError("logo", {
          type: "manual",
          message: "File size must be less than 10MB",
        });
        return;
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("logo", {
          type: "manual",
          message: "Only JPEG and PNG files are allowed",
        });
        return;
      }

      // If validation passes, clear previous errors
      clearErrors("logo");

      const reader = new FileReader();
      reader.onload = () => {
        const fileString = reader.result as string;
        setValue("logo", fileString); // Update the form's logo value
        setLogoPreview(fileString); // Set image preview
      };
      reader.readAsDataURL(file);
    } else {
      setError("logo", {
        type: "manual",
        message: "Please select a valid file",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-4 mb-16 max-w-[800px] mx-auto">
      <Card className="relative w-full">
        <Link
          href="/dashboard"
          className="absolute flex items-center gap-2 top-2 left-2 hover:bg-slate-100 pr-2 py-1 rounded-md"
        >
          <ChevronLeft />
          <span>Back</span>
        </Link>
        <CardHeader className="mt-5">
          <CardTitle className="text-2xl font-medium">
            Register Organization{" "}
            <p className="text-sm font-normal text-muted-foreground">
              Enter your organization details
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-start items-center gap-5">
              {logoPreview ? (
                <div className="rounded-full overflow-hidden h-[100px] w-[100px] drop-shadow-md">
                  <Image
                    src={logoPreview}
                    alt="Logo"
                    className="object-cover"
                    style={{ aspectRatio: "1/1" }}
                    width={500}
                    height={500}
                  />
                </div>
              ) : (
                <div
                  className="bg-gray-200 rounded-full h-[100px] w-[100px]"
                  style={{ aspectRatio: "1/1" }}
                ></div>
              )}
              <div>
                <Input
                  type="file"
                  className="max-w-[250px] cursor-pointer"
                  accept="image/jpeg,image/png"
                  onChange={handleLogoChange}
                />
                <input
                  type="hidden"
                  {...register("logo", { required: "Logo is required" })}
                />
                {errors.logo && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.logo.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">
                Organization Email (Use dedicated email)
              </Label>
              <Input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Organization name is required",
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                {...register("headline", {
                  required: "Headline is required",
                })}
              />
              {errors.headline && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.headline.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                {...register("specialty", {
                  required: "Specialty is required",
                })}
              />
              {errors.specialty && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.specialty.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <Label htmlFor="province">Province</Label>
                <Controller
                  name="province"
                  control={control}
                  rules={{ required: "Province is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="province">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TH">Thai</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.province && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-2">
              <p className="text-base font-medium">Map Coordinate</p>
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
                      required: "Latitude is required",
                      pattern: {
                        value: /^-?([0-8]?\d|90)(\.\d+)?$/,
                        message: "Invalid latitude",
                      },
                    })}
                  />
                  {errors.latitude && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.latitude.message}
                    </p>
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
                      required: "Longitude is required",
                      pattern: {
                        value: /^-?(\d{1,2}|1[0-7]\d|180)(\.\d+)?$/,
                        message: "Invalid longitude",
                      },
                    })}
                  />
                  {errors.longitude && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.longitude.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="telephone">Telephone</Label>
              <Input
                id="telephone"
                {...register("telephone", {
                  required: "Telephone is required",
                  pattern: {
                    value: /^[0-9+\-\s()]*$/,
                    message: "Invalid telephone number",
                  },
                })}
              />
              {errors.telephone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.telephone.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-medium">Contact Channels</h1>
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
                        rules={{ required: "Channel type is required" }}
                        render={({ field: { onChange, value } }) => (
                          <Select onValueChange={onChange} value={value}>
                            <SelectTrigger id={`contactChannels.${index}.type`}>
                              <SelectValue placeholder="e.g. Facebook, Twitter, LinkedIn" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Facebook">Facebook</SelectItem>
                              <SelectItem value="Twitter">Twitter</SelectItem>
                              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                              <SelectItem value="Instagram">
                                Instagram
                              </SelectItem>
                              <SelectItem value="Website">Website</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.contactChannels?.[index]?.type && (
                        <p className="text-sm text-red-500 mt-1">
                          {
                            (errors.contactChannels[index].type as FieldError)
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`contactChannels.${index}.url`}>
                        URL
                      </Label>
                      <Input
                        id={`contactChannels.${index}.url`}
                        placeholder="https://"
                        {...register(`contactChannels.${index}.url`, {
                          required: "URL is required",
                          pattern: {
                            value:
                              /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]+)*\/?$/,
                            message: "Invalid URL format",
                          },
                        })}
                      />
                      {errors.contactChannels?.[index]?.url && (
                        <p className="text-sm text-red-500 mt-1">
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

            <div className="mt-4">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
