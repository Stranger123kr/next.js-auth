"use client";
import Loader from "@/components/loader";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

const VerifyUserEmail = () => {
  const [loading, setLoading] = useState(true);
  const [verification, setVerification] = useState(false);

  const verifyEmail = async () => {
    try {
      const { data }: any = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/verifyemail`
      );
      setLoading(false);
      if (data.success === true) {
        toast.success(data.message);
        setVerification(data.verify);
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex items-center justify-center p-4">
        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-lg mx-auto text-center">
            {verification ? (
              <FaCheckCircle className="text-[6rem] text-green-500 mx-auto" />
            ) : (
              <MdError className="text-[6rem] text-red-500 mx-auto" />
            )}
            <h1 className="text-[3rem] md:text-[4rem] font-semibold text-gray-800 mt-4">
              {verification ? "Email Verified!" : "Verification Failed"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mt-4">
              {verification
                ? "Your email has been successfully verified."
                : "There was an error verifying your email. Please try again."}
            </p>
            <Link
              href="/login"
              className="inline-block mt-8 px-6 py-3 bg-purple-500 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:bg-purple-600 transition duration-300"
            >
              Go to Login Page
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyUserEmail;
