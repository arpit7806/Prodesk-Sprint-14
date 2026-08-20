import { NextResponse } from "next/server";
import { createUser, userExists } from "@/lib/mockDb";

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are all required" },
      { status: 400 }
    );
  }

  if (userExists(email)) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  const user = createUser({ name, email, password });
  return NextResponse.json(
    { id: user.id, name: user.name, email: user.email },
    { status: 201 }
  );
}
