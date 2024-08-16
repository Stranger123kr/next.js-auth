import { connect } from "@/Database/connection";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// ----------------------------------------------------
connect();
// ----------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const { password, email } = await request.json();
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return NextResponse.json(
        { message: "Credentials Are Wrong" },
        { status: 404 }
      );
    }

    const checkPassword = await bcrypt.compare(password, userFound.password);

    if (!checkPassword) {
      return NextResponse.json(
        { message: "Credentials Are Wrong" },
        { status: 401 }
      );
    }

    const tokenData = {
      userId: userFound.id,
      username: userFound.username,
      email: userFound.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    cookies().set("userToken", token, {
      httpOnly: true,
    });

    return NextResponse.json(
      { message: "User logged in successfully", token, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
