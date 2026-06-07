import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/core/database/prisma";
import bcryptjs from "bcryptjs";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Please enter a valid corporate email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email address already in use." },
        { status: 400 }
      );
    }

    // Hash user passwords using bcryptjs with a cost factor of 12 rounds
    const hashedPassword = await bcryptjs.hash(validatedData.password, 12);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: "CLIENT",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration completed successfully.",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: "Failed to register user.", error: errorMessage },
      { status: 500 }
    );
  }
}
