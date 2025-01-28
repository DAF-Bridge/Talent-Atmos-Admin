"use client";

import { Link } from "@/i18n/routing";
import { Event } from "@/lib/types";
import { cn, formatDateRange, formatRelativeTime } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function EventList() {
  // const [events, setEvents] = useState<Event[]>([]);

  const events: Event[] = [
    {
      id: 1,
      name: "1Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
      startDate: "2024-11-16T00:00:00.000Z",
      endDate: "2024-11-20T00:00:00.000Z",
      startTime: "0001-01-01T09:00:00.000Z",
      endTime: "0001-01-01T16:30:00.000Z",
      location: "ลานชั้น 1 อาคารสวทช. โยธี",
      latitude: 19.0305,
      longitude: 99.8926,
      picUrl:
        "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
      category: "All",
      price: "Free",
      organization: {
        id: 1,
        name: "Who Am I",
        picUrl:
          "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
      },
    },
    {
      id: 2,
      name: "2WHO AM I - เปิดโอกาสให้น้องๆได้เข้าศึกษาการทำงานและทดลองทำงาน",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      latitude: 13.7318,
      longitude: 100.5687,
      picUrl:
        "https://drive.google.com/uc?export=view&id=14JD4WbrFIIbAfNt6lbxefsmUrmEFE8Di",
      category: "All",
      price: "Free",
      organization: {
        id: 1,
        name: "Who Am I",
        picUrl:
          "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
      },
    },
    {
      id: 3,
      name: "3Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
      startDate: "2024-11-16T00:00:00.000Z",
      endDate: "2024-11-20T00:00:00.000Z",
      startTime: "0001-01-01T09:00:00.000Z",
      endTime: "0001-01-01T16:30:00.000Z",
      location: "ลานชั้น 1 อาคารสวทช. โยธี",
      latitude: 18.7046,
      longitude: 98.9619,
      picUrl:
        "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
      category: "All",
      price: "Free",
      organization: {
        id: 1,
        name: "Who Am I",
        picUrl:
          "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
      },
    },
    {
      id: 4,
      name: "4WHO AM I - เปิดโอกาสให้น้องๆได้เข้าศึกษาการทำงานและทดลองทำงาน",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      latitude: 18.9359,
      longitude: 99.0116,
      picUrl:
        "https://drive.google.com/uc?export=view&id=14JD4WbrFIIbAfNt6lbxefsmUrmEFE8Di",
      category: "All",
      price: "Free",
      organization: {
        id: 1,
        name: "Who Am I",
        picUrl:
          "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
      },
    },
    {
      id: 5,
      name: "5Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
      startDate: "2024-11-16T00:00:00.000Z",
      endDate: "2024-11-20T00:00:00.000Z",
      startTime: "0001-01-01T09:00:00.000Z",
      endTime: "0001-01-01T16:30:00.000Z",
      location: "ลานชั้น 1 อาคารสวทช. โยธี",
      latitude: 18.7046,
      longitude: 98.9619,
      picUrl:
        "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
      category: "All",
      price: "Free",
      organization: {
        id: 1,
        name: "Who Am I",
        picUrl:
          "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
      },
    },
    {
      id: 6,
      name: "6Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
      startDate: "2024-11-16T00:00:00.000Z",
      endDate: "2024-11-20T00:00:00.000Z",
      startTime: "0001-01-01T09:00:00.000Z",
      endTime: "0001-01-01T16:30:00.000Z",
      location: "ลานชั้น 1 อาคารสวทช. โยธี",
      latitude: 18.7046,
      longitude: 98.9619,
      picUrl:
        "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
      category: "All",
      price: "Free",
      organization: {
        id: 1,
        name: "Who Am I",
        picUrl:
          "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
      },
    },
    {
      id: 7,
      name: "7Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
      startDate: "2024-11-16T00:00:00.000Z",
      endDate: "2024-11-20T00:00:00.000Z",
      startTime: "0001-01-01T09:00:00.000Z",
      endTime: "0001-01-01T16:30:00.000Z",
      location: "ลานชั้น 1 อาคารสวทช. โยธี",
      latitude: 18.7046,
      longitude: 98.9619,
      picUrl:
        "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
      category: "All",
      price: "Free",
      organization: {
        id: 1,
        name: "Who Am I",
        picUrl:
          "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
      },
    },
    {
      id: 8,
      name: "8Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
      startDate: "2024-11-16T00:00:00.000Z",
      endDate: "2024-11-20T00:00:00.000Z",
      startTime: "0001-01-01T09:00:00.000Z",
      endTime: "0001-01-01T16:30:00.000Z",
      location: "ลานชั้น 1 อาคารสวทช. โยธี",
      latitude: 18.7046,
      longitude: 98.9619,
      picUrl:
        "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
      category: "All",
      price: "Free",
      organization: {
        id: 1,
        name: "Who Am I",
        picUrl:
          "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
      },
    },
  ];

  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");

  return (
    <div className="flex flex-col gap-2 mt-2">
      {events.map((event) => (
        <Link
          href={`/event-management?id=${event.id}`}
          key={event.id}
          className={cn(
            "border rounded-md p-2 hover:bg-slate-100",
            currentId === `${event.id}` && "bg-slate-100 border-2 border-primary/60"
          )}
        >
          <div className="flex gap-2 justify-start items-start">
            <div className="flex flex-col text-left w-full">
              <div className="flex gap-5 justify-between items-start">
                <p className="text-sm line-clamp-2">{event.name}</p>
                <p className="text-xs shrink-0">
                  {formatRelativeTime(event.startDate)}
                </p>
              </div>
              <p className="text-xs">
                {event.startDate
                  ? formatDateRange(event.startDate, event.endDate)
                  : "ไม่ระบุ"}
              </p>
              <p className="text-xs">{event.location || "ไม่ระบุ"}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
