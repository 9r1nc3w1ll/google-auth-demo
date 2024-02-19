"use client";

import { useOtpStore } from "@/store/otp.store";
import { useEffect } from "react";

export const OtpCountDown: React.FC = () => {

  const {
    seconds,
    timerStarted,
    setOtp,
    stopTimer,
    setSeconds,
  } = useOtpStore(({otp, seconds, timerStarted, setOtp, setSeconds, startTimer, stopTimer}) => ({otp, seconds, timerStarted, setOtp, setSeconds, startTimer, stopTimer}));

  useEffect(() => {
    if (timerStarted) {
      const interval = setInterval(() => {
        if (seconds == 0) {
          stopTimer();
          setOtp(null);
          clearInterval(interval);
          return;
        }

        setSeconds(seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerStarted, seconds, setOtp, setSeconds, stopTimer]);
  return (
  <div className="mt-2">
    <small>Note: OTP is only visible for {seconds} seconds</small>
  </div>
)}