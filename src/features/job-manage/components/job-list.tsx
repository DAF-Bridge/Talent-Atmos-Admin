"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@/i18n/routing";
import type { Job } from "@/lib/types";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";

export default function JobList() {
  // const [jobs, setJobs] = useState<jobs[]>([]);

  const jobs: Job[] = [
    {
      id: 1,
      UpdatedAt: "2025-02-02 15:49:45.486693+00",
      title: "Software Engineer",
      scope: "Develop and maintain web applications.",
      prerequisite: ["JavaScript", "React", "Node.js"],
      workplace: "hybrid",
      work_type: "fulltime",
      career_stage: "midlevel",
      period: "12 months",
      description:
        "Responsible for designing and building scalable web applications.",
      hours_per_day: "8",
      qualifications:
        "Bachelor's degree in Computer Science or equivalent experience.",
      benefits:
        "Health insurance, remote work options, professional development budget.",
      quantity: 3,
      salary: 75000,
    },
    {
      id: 2,
      UpdatedAt: "2025-02-02 16:10:22.123456+00",
      title: "Marketing Intern",
      scope: "Assist in digital marketing campaigns.",
      prerequisite: ["SEO", "Social Media", "Content Creation"],
      workplace: "remote",
      work_type: "internship",
      career_stage: "entrylevel",
      period: "6 months",
      description:
        "Support the marketing team with campaign execution and social media management.",
      hours_per_day: "6",
      qualifications: "Pursuing a degree in Marketing or a related field.",
      benefits: "Flexible work hours, mentorship, networking opportunities.",
      quantity: 1,
      salary: 0,
    },
    {
      id: 3,
      UpdatedAt: "2025-02-02 17:30:10.789012+00",
      title: "Data Analyst",
      scope: "Analyze business data to provide insights.",
      prerequisite: ["SQL", "Python", "Data Visualization"],
      workplace: "onsite",
      work_type: "fulltime",
      career_stage: "midlevel",
      period: "24 months",
      description: "Extract and analyze data to optimize business processes.",
      hours_per_day: "8",
      qualifications:
        "Bachelor’s degree in Data Science, Statistics, or a related field.",
      benefits: "Annual bonus, health insurance, free gym membership.",
      quantity: 2,
      salary: 85000,
    },
    {
      id: 4,
      UpdatedAt: "2025-02-02 18:15:50.654321+00",
      title: "UX/UI Designer",
      scope: "Design user-friendly digital experiences.",
      prerequisite: ["Figma", "Adobe XD", "User Research"],
      workplace: "hybrid",
      work_type: "fulltime",
      career_stage: "midlevel",
      period: "18 months",
      description:
        "Create and refine user interfaces for mobile and web applications.",
      hours_per_day: "7",
      qualifications: "Bachelor’s degree in Design or relevant experience.",
      benefits: "Remote work flexibility, wellness stipend, stock options.",
      quantity: 1,
      salary: 70000,
    },
  ];
  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");

  const isMobile = useIsMobile();

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
                  {"แก้ไขล่าสุด " + formatRelativeTime(job.UpdatedAt)}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {job.description}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <p>
                    {job.work_type} - {job.career_stage}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <p>{job.workplace || "ไม่ระบุ"}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Clock className="w-4 h-4" />
                  <p>{job.hours_per_day} hours/day</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <p>{job.period}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <p>
                    {job.salary
                      ? `$${job.salary.toLocaleString()}/year`
                      : "Not specified"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Users className="w-4 h-4" />
                  <p>
                    {job.quantity} position{job.quantity > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.prerequisite.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
