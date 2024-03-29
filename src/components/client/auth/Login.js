"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import OtpInput from "@/components/Modules/Otp/OtpInput";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../../firebase";
import { checkUserDataByToken } from "../../../utils/userData";

const Login = ({ close, register, setUId, message }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [number, setNumber] = useState("");
  const [numberLength, setLength] = useState(0);
  const [isFilled, setFilled] = useState(false);
  const [otp, setOtp] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const handleNumberInput = async (e) => {
    setNumber(e.target.value);
    setLength(e.target.value.toString().length);
  };

  const generateRecaptcha = () => {
    const recaptchaElement = document.getElementById("recaptcha");
    recaptchaElement.innerHTML = "";
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const handleNumberSubmit = (e) => {
    e.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const phoneNumber = `${countryCode}${number}`;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        setFilled(true);
      })
      .catch((error) => {
        console.error("send otp error:", error);
      });
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(async (result) => {
        let token = result.user.accessToken;

        localStorage.setItem("bfm-client-token", token);

        checkUserDataByToken(token)
          .then((data) => {
            if (data?.isUser) {
              if (pathname === "/seller" && data?.isSeller) {
                router.push(
                  `/seller/dashboard/${data?.data?.seller?.name}/${data?.data?.seller?.uid}`
                );
                window.location.reload();
              } else if (pathname === "/seller" && data?.isUser) {
                router.push(`/seller/form`);
                window.location.reload();
              } else {
                window.location.reload();
              }
              setUId(data?.uid);
            } else {
              register();
              setUId(data?.uid);
            }
          })
          .catch((err) => console.error(err));

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        console.error("user login error:", error);
      });
  };

  return (
    <div className={`w-full ${pathname === "/seller" ? "my-7" : "mt-20"}`}>
      <div
        className={`flex flex-col w-full ${
          pathname === "/seller" ? "py-7" : "py-[35px]"
        } rounded-[40px] shrink-0 overflow-hidden`}
      >
        <form
          onSubmit={handleNumberSubmit}
          className="flex max-w-full flex-col gap-[19px] shrink-0 self-stretch"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-[32px] not-italic font-bold leading-[normal]">
              {message}!
            </h1>
          </div>
          <div className="flex flex-col items-start gap-8 w-full self-stretch">
            <div className="flex flex-col w-5/6 rounded-xl items-start gap-1 py-3 bg-black/10">
              <label className="text-white pl-2 text-base not-italic font-normal leading-[100%] capitalize">
                Enter Phone Number
              </label>
              <div className="flex w-full bg-white border-2 rounded-md items-center gap-1 px-4 py-3 bg-black/10">
                <input
                  className="text-[color:var(--mono-90,#18181B)] bg-transparent w-[29px] text-base focus:outline-none not-italic font-medium leading-6"
                  type="text"
                  maxLength={3}
                  required
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
                <input
                  type="number"
                  required
                  maxLength={12}
                  value={number}
                  onChange={handleNumberInput}
                  className="text-[color:var(--mono-90,#18181B)] bg-transparent w-full text-base focus:outline-none not-italic font-medium leading-6"
                />
              </div>
              <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
                You will receive an verification code on the number entered
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={numberLength !== 10}
            className={`${numberLength !== 10 ? "cursor-not-allowed" : ""} ${
              isFilled ? "scale-y-0 hidden" : "scale-y-100 block"
            } transform transition-all duration-300 gap-2 self-stretch px-8 py-3 w-2/3 rounded-xl bg-white text-black text-center text-base not-italic font-bold leading-6`}
          >
            Send OTP
          </button>
        </form>
        <form
          onSubmit={handleOTPSubmit}
          className={`flex ${
            isFilled ? "translate-y-0" : "scale-y-0 -translate-y-1/2"
          } transform transition-all relative inset-x-0 duration-500 ease-in-out flex-col gap-[19px] shrink-0 self-stretch`}
        >
          <div className="flex flex-col gap-8 self-stretch">
            <div className="flex flex-col rounded-xl items-start gap-1 py-3 bg-black/10">
              <label className="text-white text-base w-full not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize">
                Enter Verification Code
              </label>
              <OtpInput numberOfInputs={6} onChange={handleOtpChange} />
              <p className="text-white text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
                You will receive an verification code on the number entered
              </p>
            </div>
          </div>
          <div className=" w-full flex">
            <button
              type="submit"
              className="w-3/4 gap-2 self-stretch px-8 py-3 rounded-xl bg-white text-black text-center text-base not-italic font-bold leading-6"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
      <div className="absolute" id="recaptcha"></div>
    </div>
  );
};

export default Login;
