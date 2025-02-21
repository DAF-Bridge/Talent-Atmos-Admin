"use client";

import { Button } from "@/components/ui/button";
import { formatExternalUrl, formatRelativeTime } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  BookOpen,
} from "lucide-react";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "@/i18n/routing";
import type { JobDescriptionPage } from "@/lib/types";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";

interface JobDisplayProps {
  forAdmin?: boolean;
  currentId?: string | null;
}

export default function JobDisplay({
  forAdmin,
  currentId,
}: Readonly<JobDisplayProps>) {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState<JobDescriptionPage | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          formatExternalUrl(`/orgs/1/jobs/get/${currentId}`)
        );
        const data = await response.json();
        console.log(data);
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [currentId]);

  if (job === null || currentId === null || isLoading) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center h-full w-full">
        <Spinner />
        <span className="text-center">Loading...</span>
      </div>
    );
  }

  // const job: JobDescriptionPage = {
  //   id: 1,
  //   updatedDate: "2025-02-02 15:49:45.486693+00",
  //   title: "Software Engineer",
  //   scope: "Develop and maintain web applications.",
  //   prerequisite: [
  //     { name: "Advanced JavaScript", url: "/courses/advanced-javascript" },
  //     { name: "React Mastery", url: "/courses/react-mastery" },
  //     { name: "Node.js Performance", url: "/courses/nodejs-performance" },
  //     { name: "TypeScript in Depth", url: "/courses/typescript-in-depth" },
  //     { name: "AWS for Developers", url: "/courses/aws-for-developers" },
  //   ],
  //   workplace: "hybrid",
  //   work_type: "fulltime",
  //   career_stage: "midlevel",
  //   period: "12 months",
  //   description:
  //     "Responsible for designing and building scalable web applications.",
  //   hours_per_day: "8",
  //   qualifications:
  //     "Bachelor's degree in Computer Science or equivalent experience.",
  //   benefits:
  //     "Health insurance, remote work options, professional development budget.",
  //   quantity: 3,
  //   salary: 75000,
  //   industry: ["ไอที", "เทคโนโลยี", "องค์กร"],
  //   country: "Thailand",
  //   province: "Bangkok",
  // };
  return (
    <div className="h-full overflow-y-auto bg-white min-w-[750px]">
      {job.id}
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
                {job.hoursPerDay} hours/day
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
          {job.industry && job.industry.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {job.industry.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
          <Link href={""}>
            <Button className="w-full bg-orange-500 hover:bg-orange-500/80">
              Apply for this position
            </Button>
          </Link>
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

          {job.prerequisite && job.prerequisite.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Prerequisite Courses
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {job.prerequisite.map((course, index) => (
                  <Link href={course.url} key={index} className="bg-white">
                    <div className="h-full flex flex-col justify-between border rounded-lg p-4 hover:shadow-md">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="text-primary shrink-0" />
                        <p className="text-lg font-medium line-clamp-1">
                          {course.name}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {course.url}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {job.UpdatedAt && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Last Updated</h2>
              <p className="text-gray-700">
                {formatRelativeTime(job.UpdatedAt, locale)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
