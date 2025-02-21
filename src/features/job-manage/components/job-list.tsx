"use client";

import { Link } from "@/i18n/routing";
import type { JobCardProps } from "@/lib/types";
import { cn, formatRelativeTime } from "@/lib/utils";
import React from "react";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { useLocale } from "next-intl";
import Spinner from "@/components/ui/spinner";

interface JobListProps {
  jobs: JobCardProps[];
  isMobile: boolean;
  currentId?: string | null;
  isLoading?: boolean;
}

export default function JobList({
  jobs,
  isMobile,
  currentId,
  isLoading,
}: Readonly<JobListProps>) {
  const locale = useLocale();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center mt-[200px] w-full">
        <Spinner />
        <span className="text-center">Loading...</span>
      </div>
    );
  }

  // const jobs: Job[] = [
  //   {
  //     id: 1,
  //     UpdatedAt: "2025-02-02 15:49:45.486693+00",
  //     title: "Software Engineer",
  //     scope: "Develop and maintain web applications.",
  //     industry: ["ไอที", "เทคโนโลยี", "องค์กร"],
  //     workplace: "hybrid",
  //     work_type: "fulltime",
  //     career_stage: "midlevel",
  //     period: "12 months",
  //     description:
  //       "Responsible for designing and building scalable web applications.",
  //     hoursPerDay: "8",
  //     qualifications:
  //       "Bachelor's degree in Computer Science or equivalent experience.",
  //     benefits:
  //       "Health insurance, remote work options, professional development budget.",
  //     quantity: 3,
  //     salary: 75000,
  //   },
  //   {
  //     id: 2,
  //     UpdatedAt: "2025-02-02 16:10:22.123456+00",
  //     title: "Marketing Intern",
  //     scope: "Assist in digital marketing campaigns.",
  //     workplace: "remote",
  //     work_type: "internship",
  //     career_stage: "entrylevel",
  //     period: "6 months",
  //     description:
  //       "Support the marketing team with campaign execution and social media management.",
  //     hoursPerDay: "6",
  //     qualifications: "Pursuing a degree in Marketing or a related field.",
  //     benefits: "Flexible work hours, mentorship, networking opportunities.",
  //     quantity: 1,
  //     salary: 0,
  //     industry: ["ไอที", "เทคโนโลยี", "องค์กร"],
  //   },
  //   {
  //     id: 3,
  //     UpdatedAt: "2025-02-02 17:30:10.789012+00",
  //     title: "Data Analyst",
  //     scope: "Analyze business data to provide insights.",
  //     workplace: "onsite",
  //     work_type: "fulltime",
  //     career_stage: "midlevel",
  //     period: "24 months",
  //     description: "Extract and analyze data to optimize business processes.",
  //     hoursPerDay: "8",
  //     qualifications:
  //       "Bachelor’s degree in Data Science, Statistics, or a related field.",
  //     benefits: "Annual bonus, health insurance, free gym membership.",
  //     quantity: 2,
  //     salary: 85000,
  //     industry: ["ไอที", "เทคโนโลยี", "องค์กร"],
  //   },
  //   {
  //     id: 4,
  //     UpdatedAt: "2025-02-02 18:15:50.654321+00",
  //     title: "UX/UI Designer",
  //     scope: "Design user-friendly digital experiences.",
  //     workplace: "hybrid",
  //     work_type: "fulltime",
  //     career_stage: "midlevel",
  //     period: "18 months",
  //     description:
  //       "Create and refine user interfaces for mobile and web applications.",
  //     hoursPerDay: "7",
  //     qualifications: "Bachelor’s degree in Design or relevant experience.",
  //     benefits: "Remote work flexibility, wellness stipend, stock options.",
  //     quantity: 1,
  //     salary: 70000,
  //     industry: ["ไอที", "เทคโนโลยี", "องค์กร"],
  //   },
  // ];

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
        <div key={job.id}>
          <Link
            href={
              isMobile
                ? `/job-management/edit/${job.id}`
                : `/job-management?id=${job.id}`
            }
            className={cn(
              "block border rounded-md p-4 hover:bg-slate-50 transition-colors",
              currentId === `${job.id}` && "bg-gray-200 hover:bg-gray-200"
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {"แก้ไขล่าสุด " + formatRelativeTime(job.UpdatedAt, locale)}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {job.description}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Briefcase className="shrink-0 w-4 h-4" />
                  <p>
                    {job.work_type} - {job.career_stage}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <MapPin className="shrink-0 w-4 h-4 " />
                  <p>{job.workplace || "ไม่ระบุ"}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Clock className="shrink-0 w-4 h-4" />
                  <p>{job.hoursPerDay} hours/day</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Calendar className="shrink-0 w-4 h-4" />
                  <p>{job.period}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <DollarSign className="shrink-0 w-4 h-4" />
                  <p>
                    {job.salary
                      ? `$${job.salary.toLocaleString()}/year`
                      : "Not specified"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Users className="shrink-0 w-4 h-4" />
                  <p>
                    {job.quantity} position{job.quantity > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              {job.industry && job.industry.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.industry.map((sector, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
