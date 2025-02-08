"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@/i18n/routing";
import type { Event } from "@/lib/types";
import { cn, formatDateRange, formatRelativeTime } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function EventList() {
  const locale = useLocale();
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

  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-3">
      {events.map((event) => (
        <div key={event.id}>
          <Link
            href={
              isMobile
                ? `/event-management/edit/${event.id}`
                : `/event-management?id=${event.id}`
            }
            className={cn(
              "block border rounded-md p-3 hover:bg-slate-50",
              currentId === `${event.id}` && "bg-gray-200 hover:bg-gray-200"
            )}
          >
            <div className="flex gap-3 items-start">
              <div
                style={{ aspectRatio: "3 / 4" }}
                className="w-auto h-[100px] rounded-sm overflow-hidden bg-cover bg-center shrink-0"
              >
                <Image
                  src={event.picUrl}
                  alt={event.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left w-full">
                <p className="text-xs font-base text-muted-foreground line-clamp-1">
                  {"แก้ไขล่าสุด " + formatRelativeTime(event.startDate, locale)}
                </p>
                <h3 className="text-sm font-medium mt-0.5 line-clamp-2">
                  {event.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <p className="line-clamp-1">
                    {event.startDate
                      ? formatDateRange(event.startDate, event.endDate)
                      : "ไม่ระบุ"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <p className="line-clamp-1">{event.location || "ไม่ระบุ"}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
