"use client";
import React from "react";
import MultipleSelector, { Option } from "../ui/MultiSelect";
import { Controller, UseFormReturn } from "react-hook-form";
import { EventFormValues } from "@/app/[locale]/(pages)/event-management/add/page";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
];

const mockSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!value) {
        resolve(OPTIONS);
      }
      const res = OPTIONS.filter((option) => option.value.includes(value));
      resolve(res);
    }, 1000);
  });
};

interface Props {
  form: UseFormReturn<EventFormValues>;
  errMessage: string;
}

const MultipleSelectorWithAsyncSearchAndOnFocus = ({
  form,
  errMessage,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <Controller
        control={form.control}
        name="categories"
        rules={{ required: errMessage }}
        render={({ field }) => (
          <MultipleSelector
            onSearch={async (value) => {
              const res = await mockSearch(value);
              return res;
            }}
            value={field.value}
            onChange={(value) => {
              field.onChange(
                value.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))
              );
            }}
            className="focus:border"
            triggerSearchOnFocus
            hidePlaceholderWhenSelected
            placeholder="Enter Event Categories..."
            loadingIndicator={
              <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                loading...
              </p>
            }
            emptyIndicator={
              <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                no results found.
              </p>
            }
          />
        )}
      />
    </div>
  );
};

export default MultipleSelectorWithAsyncSearchAndOnFocus;
