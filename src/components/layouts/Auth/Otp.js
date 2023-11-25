"use client";

import OtpInput from "@/components/Modules/Otp/OtpInput";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import loginplaceholder from "../../../../public/login.svg";
import { useRouter } from "next/navigation";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [timerEnded, setTimerEnded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimerEnded(true);
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/auth/register");
  };

  return (
    <main className="flex max-w-[1512px] max-h-[982px] overflow-hidden justify-center items-center">
      <div className="flex max-w-[1232px] max-h-[768px] items-start gap-4 shrink-0">
        <div className="flex-[1_0_0] self-stretch flex justify-center items-center overflow-hidden w-full aspect-[9/16] shrink-0">
          <Image
            src={loginplaceholder}
            alt=""
            className="w-full h-full object-cover shrink-0"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-10 flex-[1_0_0] self-stretch px-[132px] py-60">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h1 className="self-stretch text-[color:var(--mono-90,#18181B)] text-[28px] not-italic font-bold leading-8 tracking-[-0.28px]">
              Enter the verification code to continue
            </h1>
            <p className="self-stretch text-black/50 text-base not-italic font-medium leading-6">
              We sent to{" "}
              <span className="text-[#0858F7]">hellouser@heads.design</span>. If
              you don’t see it, check your spam.
            </p>
          </div>
          <OtpInput
            numberOfInputs={6}
            onChange={handleOtpChange}
            value={otp}
            on
            handleSubmit={handleSubmit}
          />
          <div className="flex justify-between items-start self-stretch">
            <button
              onClick={() => router.back()}
              className="flex justify-center items-center gap-2 text-[color:var(--color-brand-50,#0858F7)] text-center text-base not-italic font-bold leading-6"
            >
              Back
            </button>
            <div className="flex justify-center items-center gap-2">
              {timerEnded ? (
                <button className="text-[#0858F7] text-sm font-semibold leading-[120%]">
                  Resend OTP
                </button>
              ) : (
                <button
                  disabled
                  className="text-black/20 cursor-not-allowed text-sm font-normal leading-[120%]"
                >
                  Resend OTP in {formatTime(seconds)}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Otp;
