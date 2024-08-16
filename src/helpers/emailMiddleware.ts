import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// ----------------------------------------------------

export const emailVerificationMiddleware = async () => {
  try {
    const Token: any = cookies().get("emailVerify");

    if (!Token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }

    const userInfo: any = jwt.verify(
      Token.value,
      process.env.EMAIL_TOKEN_SECRET!,
      (err: any, decoded: any) => {
        if (err) {
          return NextResponse.json(
            { message: "Invalid Token" },
            { status: 404 }
          );
        }
        return decoded;
      }
    );

    return userInfo;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
