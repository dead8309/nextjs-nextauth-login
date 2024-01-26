import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userRegisterSchema } from "@/lib/schemas/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userRegisterSchema.parse(body);
    const existingUserEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User already exists",
        },
        {
          status: 409,
        }
      );
    }

    const existingUserUsername = await db.user.findUnique({
        where: { username: username },
      });
  
      if (existingUserUsername) {
        return NextResponse.json(
          {
            user: null,
            message: "User with that username already exists",
          },
          {
            status: 409,
          }
        );
      }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        user: null,
        message: error,
      },
      { status: 500 }
    );
  }
}
