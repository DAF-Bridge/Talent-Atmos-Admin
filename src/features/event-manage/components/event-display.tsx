import { Button } from "@/components/ui/button";
import StaticMap from "@/components/ui/StaticMap";
// import { EventDescriptionProps } from "@/lib/types";
import {
  formatDateRange,
  formatExternalUrl,
  formatTimeRange,
} from "@/lib/utils";
import Image from "next/image";
import {
  IoCalendarSharp,
  IoLocationSharp,
  // IoPricetagOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { EventDescription } from "@/lib/types";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";

interface EventDisplayProps {
  forAdmin?: boolean;
  currentId: string | null;
}

export default function EventDisplay({
  forAdmin,
  currentId,
}: Readonly<EventDisplayProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState<EventDescription | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          formatExternalUrl(`/orgs/1/events/${currentId}`)
        );
        const data = await response.json();
        console.log(data);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [currentId]);

  if (!event || !currentId || isLoading || !event.content?.html) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center h-full w-full">
        <Spinner />
        <span className="text-center">Loading...</span>
      </div>
    );
  }

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      // Check if domNode is an instance of Element and has attribs
      if (domNode instanceof Element && domNode.attribs) {
        const { name, children } = domNode;

        if (name === "ul") {
          return (
            <ul className="list-disc ml-5">
              {domToReact(children as DOMNode[], options)}
            </ul>
          );
        }

        if (name === "ol") {
          return (
            <ol className="list-decimal ml-5">
              {domToReact(children as DOMNode[], options)}
            </ol>
          );
        }

        if (name === "p") {
          return (
            <p className="mb-4">{domToReact(children as DOMNode[], options)}</p>
          );
        }

        // Add more custom replacements as needed
      }
    },
  };

  // Mock data
  // const mockEvent = {
  //   id: 1,
  //   name: "Web Development Workshop 2024",
  //   description:
  //     "Join us for an intensive 3-day workshop covering modern web development practices, from frontend to backend technologies. Participants will learn through hands-on exercises and real-world projects.",
  //   startDate: "2024-11-16T00:00:00.000Z",
  //   endDate: "2024-11-20T00:00:00.000Z",
  //   startTime: "0001-01-01T09:00:00.000Z",
  //   endTime: "0001-01-01T16:30:00.000Z",
  //   price: "Free",
  //   picUrl:
  //     "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
  //   highlight:
  //     "Learn from industry experts and get hands-on experience with real-world projects. Network with fellow developers and gain practical skills.",
  //   requirements:
  //     "Basic understanding of HTML, CSS, and JavaScript. Participants should bring their own laptop.",
  //   outcomes: [
  //     "Understanding of modern web frameworks",
  //     "Backend development skills",
  //     "Database management knowledge",
  //   ],
  //   timeline: [
  //     { date: "2024-02-01", content: "Introduction to Frontend Development" },
  //     { date: "2024-02-02", content: "Backend Technologies and APIs" },
  //     { date: "2024-02-03", content: "Project Development and Deployment" },
  //   ],
  //   benefits: [
  //     "Certificate of completion",
  //     "Project portfolio",
  //     "Networking opportunities",
  //     "Job placement assistance",
  //   ],
  //   location: {
  //     name: "Bangkok Innovation Hub",
  //     map_url: "https://maps.example.com",
  //     image_url: "/api/placeholder/200/200",
  //     lat: 13.7563,
  //     lng: 100.5018,
  //   },
  //   contact: [
  //     {
  //       type: "facebook",
  //       url: "https://www.facebook.com/WHOAMIPROJECT",
  //     },
  //     {
  //       type: "instagram",
  //       url: "@whoami",
  //     },
  //   ],
  //   regLink: "https://forms.gle/gDhZXQuZunsmzACZ6",
  //   organization: {
  //     id: 1,
  //     name: "Tech Community Thailand",
  //     picUrl:
  //       "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
  //   },
  // };

  return (
    <div className="h-full overflow-y-auto bg-white min-w-[750px]">
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur flex justify-between items-center px-4 pb-2">
        <p className="text-xl font-medium text-center mt-2 p-2 border-l-4 border-orange-500">
          ตัวอย่างหน้า
        </p>
        <Link
          href={`/${forAdmin ? "all-events" : "event-management"}/edit/${
            event.id
          }`}
        >
          <Button variant={"outline"} className="border-primary drop-shadow-md">
            <MdOutlineEdit />
            Manage Event
          </Button>
        </Link>
      </div>

      <div className="p-4">
        <div className="flex gap-6 mb-8">
          {/* Left side - Image */}
          <div className="w-[250px] shrink-0">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md">
              <Image
                className="object-cover w-full h-full"
                src={event.picUrl}
                width={300}
                height={400}
                alt="อีเว้นท์"
              />
            </div>
          </div>

          {/* Right side - Event Details */}
          <div className="flex-1 min-w-0">
            {/* Organization Info */}
            <div className="flex items-center gap-2 mb-4">
              <div className="shrink-0 h-8 w-8 rounded-full overflow-hidden shadow">
                <Image
                  src={
                    "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H"
                  }
                  width={40}
                  height={40}
                  alt="org-logo"
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm font-medium truncate">
                {"Tech Community Thailand"}
              </span>
            </div>
            {/* Event Title */}
            <h1 className="text-2xl font-semibold mb-4 line-clamp-2">
              {event.name}
            </h1>
            {/* Event Details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <IoCalendarSharp className="text-orange-500 shrink-0 text-xl" />
                <span className="text-sm text-gray-700">
                  {event.startDate
                    ? formatDateRange(event.startDate, event.endDate)
                    : "ไม่ระบุ"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <IoTimeOutline className="text-orange-500 shrink-0 text-xl" />
                <span className="text-sm text-gray-700">
                  {event.startTime
                    ? formatTimeRange(event.startTime, event.endTime)
                    : "ไม่ระบุ"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <IoLocationSharp className="text-orange-500 shrink-0 text-xl" />
                <span className="text-sm text-gray-700 line-clamp-2">
                  {event.locationName}
                </span>
              </div>
            </div>
            {/* Registration Button - Moved up */}
            {/* {event.regLink && (
              <div className="mt-6">
                <a
                  href={event.regLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 bg-orange-500 text-white text-center py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  ลงทะเบียน
                </a>
              </div>
            )} */}
          </div>
        </div>

        {/* Description Sections */}
        <div className="space-y-6 border-t pt-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">คำอธิบายกิจกรรม</h2>
            <div>{parse(event.content.html, options)}</div>
          </div>

          {/* <div>
            <h2 className="text-xl font-semibold mb-2">ไทม์ไลน์</h2>
            <div className="space-y-2">
              {event.timeline.map((item, index) => (
                <div key={index} className="flex gap-4 text-gray-700">
                  <span className="font-medium">{item.date}</span>
                  <span>{item.content}</span>
                </div>
              ))}
            </div>
          </div> */}

          <div>
            <h2 className="text-xl font-semibold mb-2">สถานที่</h2>
            <p className="text-gray-700 mb-2">{`- ${event.locationName}`}</p>
            <div className="w-[700px] h-[400px] rounded-lg mb-2 border">
              {event.latitude !== null && event.longitude !== null && (
                <StaticMap lat={event.latitude} lng={event.longitude} />
              )}
            </div>
          </div>

          {/* <div>
            <h2 className="text-xl font-semibold mb-2">ช่องทางติดต่อสอบถาม</h2>
            {event.contact.map((item, index) => (
              <div key={index} className="flex gap-2 text-gray-700">
                <span className="font-medium">{item.type}:</span>
                {item.url.includes("http") ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-gray-inactive break-words whitespace-normal"
                  >
                    {item.url}
                  </a>
                ) : (
                  <span className="break-words whitespace-normal">
                    {item.url}
                  </span>
                )}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
