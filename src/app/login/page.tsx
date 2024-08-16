"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const formRef: any = useRef(null);
  const router = useRouter();
  // ---------------------------------

  const submitUserData = async (user: any) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        user
      );
      setLoading(false);
      if (data.success === true) {
        toast.success(data.message);
        if (formRef.current) {
          formRef.current.reset();
        }
        router.push("/");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
      setLoading(false);
    }
  };

  // --------------------------------

  const handleForm = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    submitUserData(userData);
  };

  // --------------------------------

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <form
            ref={formRef}
            onSubmit={handleForm}
            className="py-12 p-10 bg-white rounded-xl"
          >
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
            <Link
              href="/forgotPassword"
              className="text-sm text-gray-700 inline-block mt-4 hover:text-indigo-600 hover:underline hover:cursor-pointer transition duration-200"
            >
              forget password
            </Link>
            <button
              className={`${
                loading === true
                  ? "disabled:bg-slate-300 disabled:text-slate-700 cursor-default"
                  : "bg-indigo-600"
              } w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300`}
              disabled={loading === true}
            >
              {loading ? (
                <div
                  role="status"
                  className="inline-block  h-6 w-6 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                ></div>
              ) : (
                "LOGIN"
              )}
            </button>
            <Link
              href="/signup"
              className="text-md mt-5 font-semibold text-red-700 cursor-pointer flex justify-center items-center"
            >
              SIGN UP PAGE
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
