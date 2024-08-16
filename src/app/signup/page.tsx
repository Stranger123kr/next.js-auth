"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formRef: any = useRef(null);
  const submitUserData = async (user: any) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
        user
      );
      setLoading(false);
      if (data.success === true) {
        toast.success(data.message);
        toast.error(data.emailNotification);
        toast.error("Go to Your Gmail For Email Verification", {
          duration: 8000,
          position: "top-right",
        });

        if (formRef.current) {
          formRef.current.reset();
        }
      }
      router.push("/login");
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  const handleForm = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    setButtonDisabled(true);
    submitUserData(userData);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <form
            onSubmit={handleForm}
            ref={formRef}
            className="py-12 p-10 bg-white rounded-xl"
          >
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Username
              </label>
              <input
                type="text"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Your username"
                name="username"
                required
              />
            </div>
            <div className="">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Email
              </label>
              <input
                type="email"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="enter email"
                name="email"
                required
              />
            </div>
            <div className="my-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Password
              </label>
              <input
                type="password"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="enter password"
                name="password"
                required
              />
            </div>
            <button
              className={`${
                buttonDisabled === false || loading === true
                  ? "disabled:bg-slate-300 disabled:text-slate-700 cursor-default"
                  : "bg-indigo-600"
              } w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300`}
              disabled={buttonDisabled === false || loading === true}
            >
              {loading ? (
                <div
                  role="status"
                  className="inline-block  h-6 w-6 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                ></div>
              ) : (
                "SIGN UP "
              )}
            </button>
            <Link
              href="/login"
              className="text-md mt-5 font-semibold text-red-700 cursor-pointer flex justify-center items-center"
            >
              LOGIN PAGE
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
