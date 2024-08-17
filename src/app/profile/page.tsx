"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "@/components/loader";
import LogoutUser from "@/components/logoutUser";
const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  // -------------------------------------------

  const getUserData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/users/userProfile", {
        withCredentials: true,
      });

      setUser(data.userFound);
      if (!data.userFound.isVerified) {
        toast.error("verify your email");
      }
      if (data.success === true) {
        toast.success(data.message);
        setLoading(false);
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

  const { username, email, isVerified }: any = user || {};

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {/* component */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-slate-100">
            <div className="flex flex-col justify-center items-center h-[100vh]">
              <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                  <img
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                    className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                  />
                  <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                    <img
                      className="h-full w-full rounded-full"
                      src="https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-06-256.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-16 flex flex-col items-center">
                  <h4 className="text-xl font-bold text-navy-700 dark:text-gray-400">
                    {username}
                  </h4>
                  <p className="text-base mt-3 font-normal text-gray-600">
                    {isVerified ? (
                      <FaCheckCircle className="inline mr-2 text-red-500 text-[1.5rem] " />
                    ) : (
                      <MdError className="inline mr-2 text-red-500 text-[1.5rem] " />
                    )}{" "}
                    {email}
                  </p>
                </div>
              </div>
              {/* {logout button for user} */}
              <LogoutUser />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
