"use client";

import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Users,
} from "lucide-react";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "@/i18n/routing";
import type { Job } from "@/lib/types";

const JobDisplay = ({ forAdmin = false }: { forAdmin?: boolean }) => {
  const job: Job = {
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
  };
  return (
    <div className="h-full overflow-y-auto bg-white min-w-[750px]">
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur flex justify-between items-center px-4 pb-2">
        <p className="text-xl font-medium text-center mt-2 p-2 border-l-4 border-orange-500">
          Job Details
        </p>
        <Link
          href={`/${forAdmin ? "all-jobs" : "job-management"}/edit/${job.id}`}
        >
          <Button variant="outline" className="border-primary drop-shadow-md">
            <MdOutlineEdit className="mr-2" />
            Manage Job
          </Button>
        </Link>
      </div>

      <div className="p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-4">{job.title}</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Briefcase className="text-primary shrink-0" />
              <span className="text-sm text-gray-700">
                {job.work_type} - {job.career_stage}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary shrink-0" />
              <span className="text-sm text-gray-700">
                {job.workplace || "Not specified"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-primary shrink-0" />
              <span className="text-sm text-gray-700">
                {job.hours_per_day} hours/day
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-primary shrink-0" />
              <span className="text-sm text-gray-700">{job.period}</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="text-primary shrink-0" />
              <span className="text-sm text-gray-700">
                {job.salary
                  ? `$${job.salary.toLocaleString()}/year`
                  : "Not specified"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-primary shrink-0" />
              <span className="text-sm text-gray-700">
                {job.quantity} position{job.quantity > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {job.prerequisite.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          <Button className="w-full">Apply for this position</Button>
        </div>

        {/* Description Sections */}
        <div className="space-y-6 border-t pt-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Job Scope</h2>
            <p className="text-gray-700">{job.scope}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
            <p className="text-gray-700">{job.qualifications}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Benefits</h2>
            <p className="text-gray-700">{job.benefits}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Last Updated</h2>
            <p className="text-gray-700">{formatRelativeTime(job.UpdatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDisplay;
