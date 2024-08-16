import { connect } from "@/Database/connection";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
// ----------------------------------------------------
connect();
// ----------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const checkUser = await User.findOne({ email });

    // -------------------------------

    if (checkUser) {
      return NextResponse.json(
        { message: "User Already Exist" },
        { status: 404 }
      );
    }

    // -------------------------------

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    // -------------------------------

    const newUser = await new User({
      username,
      email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();

    // ---------------------------------------
    // generateToken for email verification

    const { id } = await User.findOne({ email }); // find user for verification

    const emailToken = jwt.sign(
      { verification: true, userId: id },
      process.env.EMAIL_TOKEN_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    cookies().set("emailVerify", emailToken, {
      httpOnly: true,
    });

    // ---------------------------------------
    // send email to user after user register

    await sendEmail({ email, emailType: "VERIFY", userId: saveUser.id });

    return NextResponse.json(
      {
        message: "User Register Successfully",
        emailNotification: "Verify Your Email",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
