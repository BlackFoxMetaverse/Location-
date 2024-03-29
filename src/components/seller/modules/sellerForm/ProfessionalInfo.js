"use client";

import s3FileUpload from "@/utils/imageUploader";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineUploadFile } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

const Experience = ["0-1", "1-3", "3-5", "5+"];
const CollegeName = ["JNU", "DU", "DTU", "IIT Delhi", "NIT Delhi"];
const profession = [
  "Photographer",
  "Designer",
  "Developer",
  "Software Developer",
];

const ProfessionalInfo = ({ inputData, setInputData, setCount, isShown }) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  const [currentTag, setCurrentTag] = useState("");
  const [currentService, setCurrentService] = useState("");
  const [document, setDocument] = useState(null);

  useEffect(() => {
    setDocument(window.document);
  }, []);

  const handleTagInputChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === " " && currentTag.trim() !== "") {
      e.preventDefault();
      setCurrentTag("");
      setInputData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, currentTag.trim()],
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setInputData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== tagToRemove),
    }));
  };

  const handleServiceInputChange = (e) => {
    setCurrentService(e.target.value);
  };

  const handleServiceInputKeyPress = (e) => {
    if (e.key === " " && currentService.trim() !== "") {
      e.preventDefault();
      setCurrentService("");
      setInputData((prevData) => ({
        ...prevData,
        services: [...prevData.services, currentService.trim()],
      }));
    }
  };

  const handleServiceRemove = (ServiceToRemove) => {
    setInputData((prevData) => ({
      ...prevData,
      services: prevData.services.filter(
        (service) => service !== ServiceToRemove
      ),
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputData?.services.length && !inputData?.skills.length) {
      return false;
    }

    setCount(3);
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex w-11/12 mx-auto flex-col items-end gap-10 rounded-[40px]"
    >
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-col items-start text-left gap-[7px]">
          <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
            Professional Information
          </h2>
          <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
            Please provide your professional information below.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 w-full items-start content-start md:gap-[20px] gap-5">
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="experience"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              experience
            </label>
            <select
              name="experience"
              id="experience"
              required
              value={inputData?.experience}
              onChange={(e) =>
                setInputData({ ...inputData, experience: e.target.value })
              }
              className="flex items-center selection:bg-gray-800 w-full p-3.5 focus:outline-none rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              {/* <option value="">0-1 years</option> */}
              {Experience?.map((experience, index) => (
                <option
                  className="appearance-none py-5 bg-slate-200"
                  value={experience}
                  key={index}
                >
                  {experience} years
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start justify-center gap-[5px]">
            <label
              htmlFor="profession"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              profession
            </label>
            <select
              name="profession"
              id="profession"
              value={inputData?.profession}
              onChange={(e) =>
                setInputData({ ...inputData, profession: e.target.value })
              }
              required
              className="flex items-center focus:outline-none w-full p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              <option value="" className="text-[#9F9F9F]">
                Select Profession
              </option>
              {profession?.map((profession, index) => (
                <option key={index} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col col-span-2 items-start justify-center gap-[5px]">
            <label
              htmlFor="services"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              services
            </label>
            <div className="flex items-center content-center bg-white rounded-lg gap-[3.613px] self-stretch flex-wrap px-[10.116px] py-[7.226px] rounded-[5.781px]-[1.445px]">
              {inputData?.services.map((service, index) => (
                <div
                  key={index}
                  className="flex h-6 justify-center items-center gap-0.5 bg-[#C5CEFB] pl-1.5 pr-2 py-1 rounded-xl text-[#4461F2] border border-[#4461F2] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                >
                  <button
                    type="button"
                    onClick={() => handleServiceRemove(service)}
                  >
                    <RxCrossCircled />
                  </button>
                  <span className="">{service}</span>
                </div>
              ))}
              <input
                type="text"
                name="services"
                id="services"
                placeholder="Developement"
                value={currentService}
                onChange={handleServiceInputChange}
                onKeyPress={handleServiceInputKeyPress}
                className={`text-sm not-italic font-normal leading-[100%] bg-transparent w-fit h-full p-1 tracking-[-0.7px] flex-grow focus:outline-none ${
                  inputData?.services.length === 7 ? "hidden" : "block"
                }`}
              />
            </div>
            <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
              Maximum 4-7 services
            </p>
          </div>
          <div className="flex flex-col col-span-2 items-start justify-center gap-[5px]">
            <label
              htmlFor="skills"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              skills
            </label>
            <div className="flex items-center content-center gap-[3.613px] self-stretch flex-wrap px-[10.116px] py-[7.226px] rounded-lg bg-white">
              {inputData?.skills.map((tag, index) => (
                <div
                  key={index}
                  className="flex h-6 justify-center items-center gap-0.5 bg-[#C5CEFB] pl-1.5 pr-2 py-1 rounded-xl text-[#4461F2] border border-[#4461F2] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                >
                  <button type="button" onClick={() => handleTagRemove(tag)}>
                    <RxCrossCircled />
                  </button>
                  <span className="">{tag}</span>
                </div>
              ))}
              <input
                type="text"
                name="skills"
                id="skills"
                placeholder="Frontend_Developer"
                value={currentTag}
                onChange={handleTagInputChange}
                onKeyPress={handleTagInputKeyPress}
                className={`text-sm not-italic font-normal leading-[100%] w-fit h-full p-1 tracking-[-0.7px] flex-grow focus:outline-none ${
                  inputData?.skills.length === 7 ? "hidden" : "block"
                }`}
              />
            </div>
            <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
              Maximum 4-7 skills
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full items-start gap-[5px]">
          <label
            htmlFor="collegeName"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            College name
          </label>
          <select
            name="collegeName"
            id="collegeName"
            value={inputData?.collegeName}
            onChange={(e) =>
              setInputData({ ...inputData, collegeName: e.target.value })
            }
            className="flex items-center w-full focus:outline-none p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
          >
            <option value="">Select your college</option>
            {CollegeName?.map((college, index) => (
              <option value={college} key={index}>
                {college}
              </option>
            ))}
          </select>
        </div>
        <div className="flex h-11 items-center gap-10 justify-between self-stretch-[#909090] mt-7 p-3.5 rounded-lg bg-white relative w-full">
          <label
            htmlFor="resume"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] absolute -top-2/3 inset-0 md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            Resume
          </label>
          <label
            htmlFor="resume"
            className={`${
              inputData?.resume
                ? "text-black"
                : "text-[color:var(--Main-Colors-Gray-0,#9F9F9F)]"
            } whitespace-break-spaces break-words shrink text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]`}
          >
            {inputData?.resume
              ? inputData?.resume?.name === undefined
                ? `${inputData?.name.split(" ")[0]}'sResume.${
                    inputData?.resume.split(".")[1]
                  }`
                : inputData?.resume?.name?.slice(0, 40) + "..."
              : "Upload your resume here"}
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            onChange={(e) =>
              setInputData({ ...inputData, resume: e.target.files[0] })
            }
            className="hidden"
          />
          {/* <button
            type="button"
            onClick={() => document?.getElementById("certification")?.click()}
            className="flex h-[31.259px] justify-center items-center gap-[2.605px] pl-[7.815px] pr-[10.42px] py-[5.21px] rounded-[15.63px] bg-[#E9DFFC] text-[color:var(--Main-Colors-Purple-6,#784DC7)] text-[18.235px] not-italic font-normal leading-[100%] tracking-[-0.912px]"
          >
            <MdOutlineUploadFile />
            Upload
          </button> */}
          <button
            type="button"
            onClick={() => document?.getElementById("resume")?.click()}
            className="w-[79.95px] h-[25.08px] pl-[6.13px] pr-[8.17px] py-[4.08px] bg-black rounded-xl border justify-center items-center gap-0.5 inline-flex"
          >
            <div className="text-white text-sm font-normal font-['Neue Helvetica'] leading-[14.29px]">
              Upload
            </div>
          </button>
        </div>
      </div>
      {/* {isShown && ( */}
      <button
        type="submit"
        className="flex justify-center items-center gap-2 rounded [background:var(--Primary-1,#4461F2)] px-8 py-4 text-[color:var(--Primary-blue,#FFF)] font-[450] leading-[100%] tracking-[-1px]"
      >
        <p className="">Save & Continue</p>
      </button>
      {/* )} */}
    </form>
  );
};

export default ProfessionalInfo;
