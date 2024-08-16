import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// ----------------------------------------------------

export const tokenMiddleware = async () => {
  try {
    const Token: any = cookies().get("userToken");

    if (!Token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }

    const { userId }: any = jwt.verify(
      Token.value,
      process.env.TOKEN_SECRET!,
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

    return userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
