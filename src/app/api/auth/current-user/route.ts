import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  try {
    const apiUrl = formatExternalUrl("/current-user-profile");
    const response = await fetch(apiUrl, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
