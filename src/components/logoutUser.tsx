"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LogoutUser = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logoutUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          withCredentials: true,
        }
      );

      if (data.success === true) {
        toast.success(data.message);
        setLoading(false);
        router.push("/login");
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

  return (
    <>
      <button
        onClick={logoutUser}
        className={`${
          buttonDisabled === false || loading === true
            ? "disabled:bg-slate-300 disabled:text-slate-700 cursor-default"
            : "bg-indigo-600"
        } w-[8rem]  p-3 mt-[2rem] text-[1.1rem] text-indigo-50 font-bold bg-indigo-600  rounded-md hover:bg-indigo-500 transition duration-300`}
        disabled={buttonDisabled === false || loading === true}
      >
        {loading ? (
          <div
            role="status"
            className="inline-block  h-6 w-6 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          ></div>
        ) : (
          "Log out"
        )}
      </button>
    </>
  );
};

export default LogoutUser;
