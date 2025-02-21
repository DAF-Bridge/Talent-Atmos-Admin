"use server";

import { cookies } from "next/headers";
import { formatExternalUrl } from "@/lib/utils";

export async function createEvent(body: FormData) {
  console.log("create event");
  const cookieStore = cookies();
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
    return { success: true, message: data.message, status: res.status };
  } else {
    const data = await res.json();
    console.error("API Error:", data);
    return { success: false, error: data.error, status: res.status };
  }
}
