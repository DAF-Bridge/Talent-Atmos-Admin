import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const apiUrl = formatExternalUrl("/login");
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include", // Pass credentials to backend
  });

  if (res.ok) {
    const data = await res.json();
    const setCookieHeader = res.headers.get("set-cookie");
    //manually set cookie if needed
    const nextRes = NextResponse.json(data.message, { status: res.status });
    if (setCookieHeader) {
      nextRes.headers.set("Set-Cookie", setCookieHeader);
    }
    return nextRes;
  } else {
    const data = await res.json();
    return NextResponse.json(data.error, { status: res.status });
  }
}
