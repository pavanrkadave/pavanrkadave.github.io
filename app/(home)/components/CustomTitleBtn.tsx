import React from "react";

const CustomTitleBtn = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <h1 className="text-3xl font-bold group-hover:text-green-400 transition-all">
        {title}
      </h1>
      <div className="w-40 h-2 bg-green-500 rounded-full"></div>
      <div className="w-40 h-2 bg-indigo-500 rounded-t-full translate-x-2"></div>
    </div>
  );
};

export default CustomTitleBtn;
