import { formatExternalUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("create event");
  const cookieStore = cookies();
  const body = await req.formData();
  const apiUrl = formatExternalUrl("/orgs/1/events/create");
  console.log(body);
  const res = await fetch(apiUrl, {
    method: "POST",
    body: body,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log("created event res", res);
  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data.message, { status: res.status });
  } else {
    const data = await res.json();
    console.error("API Error:", data);
    return NextResponse.json(data.error, { status: res.status });
  }
}
