import Link from "next/link";
import React from "react";
import CustomTitleBtn from "./CustomTitleBtn";

const HeroSection = () => {
  return (
    <div className="min-h-[60vh] flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row items-center justify-between">
      <div className="space-y-10 text-center lg:text-left">
        <h1 className="text-4xl lg:text-7xl font-bold">
          Nice to meet you! 👋
          <br />{" "}
          <span className="underline underline-offset-8 decoration-green-500">
            {"I'm Pavan"}
          </span>
        </h1>
        <p className="md:w-96 text-lg text-gray-300 ">
          {`Based in Germany, I'm a Fullstack and Cloud Developer. Passionate about building modern web applications on the cloud.
            
            I'm currently working as a Cloud Engineer at BMW Group. I am doing my Master's degree in Computer Science from University of Bamberg.
            `}
        </p>
        <Link
          href={"mailto:pavanrkadave@gmail.com"}
          className="inline-block group"
        >
          <CustomTitleBtn title="Contact Me 📮" />
        </Link>
      </div>
      <div>
        <div className="w-72 h-72 space-y-3 -rotate-[30deg] relative">
          <div className="flex gap-3 translate-x-8">
            <div className="w-32 h-32 rounded-2xl bg-green-500"></div>
            <div className="w-32 h-32 rounded-full bg-indigo-500"></div>
          </div>
          <div className="flex gap-3 -translate-x-8">
            <div className="w-32 h-32 rounded-2xl bg-indigo-500"></div>
            <div className="w-32 h-32 rounded-full bg-green-500"></div>
          </div>
          <div className="glow absolute top-[40%] right-1/2 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
