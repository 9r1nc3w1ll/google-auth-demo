"use client";

import { OtpCountDown } from "@/components/shared/OtpCountDown";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useOtpStore } from "@/store/otp.store";
import { Otp } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GenerateOtp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {token, isLoggedIn, logout} = useAuthStore(({token, isLoggedIn, logout}) => ({token, isLoggedIn, logout}));
  
  const {
    otp,
    setOtp,
    startTimer,
  } = useOtpStore(({otp, setOtp, startTimer}) => ({otp, setOtp, startTimer}));


  useEffect(
    () => {
      if (!isLoggedIn()) router.push("/");
    },
    [router, isLoggedIn]
  );

  const generateOtp = () => {
    try {
      setLoading(true);
      fetch("http://localhost:8000/api/generate-otp", {
        method: "POST",
        headers: { "authorization": `Bearer ${token}`}
      }).then((res) => {
        if (!res.ok) {
          logout();
          return;
        };

        res.json().then((data: Otp) => {
          setOtp(data)
          startTimer();
        });
      })
    } catch (error) {
      console.error(error);
      logout();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col mt-10 w-full p-3 md:max-w-sm  mx-auto">
      {
        !otp ? (
          <Button disabled={loading} size={"sm"} onClick={() => generateOtp()}>{loading ? "Generating..." : "Generate OTP"}</Button>
        ) : (
          <div className="text-sm">
            Your OTP is <span className="font-semibold">{otp.code}</span>
          </div>
        )
      }
      <OtpCountDown />
    </div>
  )
}