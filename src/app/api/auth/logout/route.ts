import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST() {
  const apiUrl = formatExternalUrl("/logout");
  const res = await fetch(apiUrl, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  const setCookieHeader = res.headers.get("set-cookie");
  //manually set cookie if needed
  const nextRes = NextResponse.json(data.message, { status: res.status });
  if (setCookieHeader) {
    nextRes.headers.set("Set-Cookie", setCookieHeader);
  }
  return nextRes;
}
