import { formatExternalUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// Force the API route to be dynamic, prevent caching
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // console.log("enter backend")
    const code = req.nextUrl.searchParams.get("code");
    // console.log(code)
    const apiUrl = formatExternalUrl("/auth/google/callback?code=" + code);
    // console.log(apiUrl);
    const res = await fetch(apiUrl, {
      cache: "no-store",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // If the Go backend returns an error
      const errorData = await res.json();
      return NextResponse.json(
        { errors: errorData.message || "Failed to login" },
        { status: res.status }
      );
    }

    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      // Use NextResponse to forward the Set-Cookie header to the client
      const response = NextResponse.json({ status: 200 });
      response.headers.set("set-cookie", setCookieHeader);
      return response;
    } else {
      return NextResponse.json(
        { error: "Failed to set cookie" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
