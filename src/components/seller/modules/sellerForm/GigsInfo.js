"use client";

import React, { useEffect, useState } from "react";
import { FaDribbble, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoAdd, IoCloseCircleSharp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { SiBehance } from "react-icons/si";
import { TbCaretDownFilled } from "react-icons/tb";

const SocialTypes = [
  {
    name: "Linked In",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    icon: <RiInstagramFill />,
  },
  {
    name: "Behance",
    icon: <SiBehance />,
  },
  {
    name: "Dribble",
    icon: <FaDribbble />,
  },
  {
    name: "Github",
    icon: <FaGithub />,
  },
];

const s3Urls = "https://bucketbfm.s3.ap-south-1.amazonaws.com/";

const GigsInfo = ({ inputData, setInputData, setCount, sellerSubmit }) => {
  const [showSocialOptions, setShowSocialOptions] = useState(false);

  const handleSocialSelect = (socialType) => {
    if (!inputData.socialMediaLinks.includes(socialType)) {
      const updatedSocials = [...inputData.socialMediaLinks, socialType];
      setInputData({ ...inputData, socialMediaLinks: updatedSocials });
    }
    setShowSocialOptions(false);
  };

  const handleRemoveSocial = (socialType) => {
    const updatedSocials = inputData.socialMediaLinks.filter(
      (social) => social !== socialType
    );
    setInputData({ ...inputData, socialMediaLinks: updatedSocials });
  };

  const isSocialSelected = (socialType) => {
    return inputData.socialMediaLinks.includes(socialType);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (inputData.experienceDetails.length === 0) return false;
    console.log("last", inputData);
    sellerSubmit();
    console.log("end");
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col items-end gap-10 self-stretch w-11/12 mx-auto"
    >
      <div className="flex flex-col w-full items-start gap-[7px]">
        <h5 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
          Show Your Work
        </h5>
        <p className="text-black md:text-base text-xs not-italic font-normal leading-6">
          Describe your project that you have worked on.
        </p>
      </div>
      <div className="flex flex-col lg:items-start items-center gap-[30px] self-stretch">
        <div className="flex flex-col items-start gap-2.5 self-stretch">
          <label
            htmlFor="description"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-xs not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            tell us about yourself
          </label>
          <textarea
            name="description"
            id="description"
            required
            value={inputData?.description}
            onChange={(e) =>
              setInputData({ ...inputData, description: e.target.value })
            }
            className="w-full resize-none focus:outline-none h-full text-black text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] flex flex-col items-start gap-[var(--numberLength,0px)] self-stretch  pl-5 pr-2.5 pt-3.5 pb-2.5 rounded-lg"
            placeholder="Describe your Gig"
            cols="30"
            rows="10"
            minLength={100}
            maxLength={1000}
          ></textarea>
        </div>
        <div className="flex flex-col items-start gap-[5px] w-full">
          <label
            htmlFor="socialMediaLinks"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            Social Types
          </label>
          <div className="w-full flex justify-between items-center gap-5">
            <div
              onClick={() => setShowSocialOptions(!showSocialOptions)}
              className="flex gap-2 relative flex-grow items-center bg-white w-full pr-3.5 text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none cursor-pointer"
            >
              <p className="w-full">Select a social</p>
              <TbCaretDownFilled />
              {showSocialOptions && (
                <ul className="absolute capitalize z-10 top-full left-0 w-full bg-white border rounded-lg shadow-md mt-2">
                  {SocialTypes.map((option) => (
                    <li
                      key={option.name}
                      onClick={() => handleSocialSelect(option.name)}
                      className={`cursor-pointer flex items-center gap-2 w-full px-4 py-2 ${
                        isSocialSelected(option.name)
                          ? "bg-indigo-500 text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {option.icon} {option.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2 items-center h-full">
              {inputData.socialMediaLinks.map((selectedSocial, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 h-full bg-indigo-500 text-white p-3 rounded"
                >
                  <IoCloseCircleSharp
                    onClick={() => handleRemoveSocial(selectedSocial)}
                  />
                  {
                    SocialTypes.find((social) => social.name === selectedSocial)
                      ?.icon
                  }
                  {/* <span className="whitespace-nowrap">{selectedSocial}</span> */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {inputData?.experienceDetails?.map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2.5 self-stretch"
          >
            <label className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize">
              Experience
            </label>
            <label
              htmlFor=""
              className="flex h-4 items-start gap-2.5 self-stretch pb-[5px]"
            ></label>
            <input
              type="text"
              name="title_of_project"
              id="title_of_project"
              placeholder="Enter title of project"
              className="text-sm not-italic font-normal focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch p-3.5 rounded-lg"
              required
              value={inputData?.experienceDetails[index]["title"]}
              onChange={(e) => {
                setInputData((prev) => {
                  const newData = { ...prev };
                  newData.experienceDetails[index] = {
                    ...newData.experienceDetails[index],
                    title: e.target.value,
                  };
                  return newData;
                });
              }}
            />
            <label
              htmlFor=""
              className="flex h-4 items-start gap-2.5 self-stretch pb-[5px]"
            ></label>
            <input
              type="url"
              name="url_of_project"
              id="url_of_project"
              placeholder="Paste link"
              className="text-sm not-italic font-normal focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch p-3.5 rounded-lg"
              required
              value={inputData?.experienceDetails[index]["link"]}
              onChange={(e) => {
                setInputData((prev) => {
                  const newData = { ...prev };
                  newData.experienceDetails[index] = {
                    ...newData.experienceDetails[index],
                    link: e.target.value,
                  };
                  return newData;
                });
              }}
            />
            <textarea
              name="projectDescription"
              id="projectDescription"
              cols=""
              rows="5"
              minLength={69}
              maxLength={500}
              placeholder="Describe your project and services"
              className="text-sm not-italic font-normal focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch p-3.5 rounded-lg resize-none"
              required
              value={inputData?.experienceDetails[index]["content"]}
              onChange={(e) => {
                setInputData((prev) => {
                  const newData = { ...prev };
                  newData.experienceDetails[index] = {
                    ...newData.experienceDetails[index],
                    content: e.target.value,
                  };
                  return newData;
                });
              }}
            ></textarea>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setInputData({
              ...inputData,
              experienceDetails: [
                ...inputData.experienceDetails,
                { title: "", link: "", content: "" },
              ],
            })
          }
          className="flex w-full text-[#4461F2] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize bg-[#ECEFFE] h-[47px] justify-center items-center content-center gap-[9px] flex-wrap p-[4.97px] rounded-[9.111px]"
        >
          <IoAdd /> Add Experience
        </button>
        <div className="flex flex-col items-start gap-[5px] self-stretch">
          <label
            htmlFor=""
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[10.24px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            Upload Your Gigs
          </label>
          <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px]">
            Upload upto 6 Gigs in png, jpeg, jpg
          </p>
          <div className="grid grid-cols-3 gap-2 w-full relativee">
            {inputData?.images?.map((image, index) => (
              <div
                key={index}
                className={`${
                  index === 0
                    ? "col-span-2 row-span-2"
                    : "col-span-1 row-span-1"
                } shrink-0 md:rounded-[10.477px] rounded overflow-hidden`}
              >
                {image ? (
                  <div
                    className={`w-full aspect-square flex justify-center relative items-center overflow-hidden`}
                  >
                    <img
                      src={
                        typeof image === "string"
                          ? `${s3Urls}${image}`
                          : URL.createObjectURL(image)
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute group inset-2 flex">
                      <div
                        className="w-[28px] h-[28px] lg:group-hover:scale-y-[100%] transition-all duration-300 ease-in-out lg:scale-y-0 lg:transform flex justify-center items-center text-2xl rounded-xl shrink-0 bg-black/50 text-white"
                        onClick={() => {
                          setInputData((prev) => {
                            const newData = { ...prev };
                            newData.images[index] = null;
                            return newData;
                          });
                        }}
                      >
                        <IoCloseCircleSharp />
                      </div>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor={`imageInput${index}`}
                    className={`max-w-[100%]  self-stretch aspect-square object-cover bg-[#ECEFFE] text-[#4461F2] shrink-0 flex justify-center items-center rounded`}
                  >
                    <IoAdd className="lg:text-6xl sm:text-5xl text-3xl" />
                    <input
                      type="file"
                      id={`imageInput${index}`}
                      name={`imageInput${index}`}
                      className="hidden"
                      required={
                        inputData.images[0] !== null ||
                        inputData?.images.length > 0
                          ? false
                          : true
                      }
                      // required
                      onChange={(e) =>
                        setInputData((prev) => {
                          const newData = { ...prev };
                          newData.images[index] = e.target.files[0];
                          return newData;
                        })
                      }
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 w-full">
          <div className="flex w-[16.701px] h-[16.701px] justify-center items-center shrink-0">
            <input
              type="checkbox"
              name="legalization"
              id="legalization"
              required
              className="border border-[#4461F2] rounded appearance-none size-4 object-cover checked:bg-[#4461F2] flex justify-center items-center checked:after:content-['\2713'] checked:after:text-white checked:after:text-xs"
            />
          </div>
          <label
            htmlFor="legalization"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-sm text-[11.628px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
          >
            By checking this box, I agree to the terms and conditions.
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="flex justify-center items-center gap-2 rounded [background:var(--Primary-1,#4461F2)] px-8 py-4 text-[color:var(--Primary-blue,#FFF)] font-[450] leading-[100%] tracking-[-1px]"
      >
        <p className="">Finish</p>
      </button>
    </form>
  );
};

export default GigsInfo;
