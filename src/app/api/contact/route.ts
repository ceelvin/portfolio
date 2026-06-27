import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!web3formsKey) {
      return NextResponse.json(
        {
          error: "Contact form is not configured",
          fallback: true,
        },
        { status: 503 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: web3formsKey,
        name,
        email,
        message,
        subject: `Portfolio contact from ${name}`,
        from_name: "Portfolio Contact",
      }),
    });

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send message", fallback: true },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error", fallback: true },
      { status: 500 }
    );
  }
}