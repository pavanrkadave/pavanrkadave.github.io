"use client";

import React from "react";
import CustomTitleBtn from "./CustomTitleBtn";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  FaDocker,
  FaNodeJs,
  FaJava,
  FaAws,
  FaGitAlt,
  FaReact,
} from "react-icons/fa6";
import {
  SiJavascript,
  SiSpringboot,
  SiTerraform,
  SiKubernetes,
  SiPostgresql,
  SiGithubactions,
} from "react-icons/si";

const Skills = () => {
  const skills = [
    {
      title: "Java",
      icon: FaJava,
    },
    {
      title: "Spring Boot",
      icon: SiSpringboot,
    },
    {
      title: "JavaScript",
      icon: SiJavascript,
    },
    {
      title: "NodeJS",
      icon: FaNodeJs,
    },
    {
      title: "React",
      icon: FaReact,
    },
    {
      title: "AWS",
      icon: FaAws,
    },
    {
      title: "Terraform",
      icon: SiTerraform,
    },
    {
      title: "Docker",
      icon: FaDocker,
    },
    {
      title: "Kubernetes",
      icon: SiKubernetes,
    },
    {
      title: "Postgres",
      icon: SiPostgresql,
    },
    {
      title: "Github Actions",
      icon: SiGithubactions,
    },
    {
      title: "Git",
      icon: FaGitAlt,
    },
  ];
  return (
    <div className="max-w-5xl mx-auto px-8">
      <CustomTitleBtn
        title="Skills 🔪"
        className="flex flex-col items-center justify-center -rotate-6"
      />
      <HoverEffect items={skills} />
    </div>
  );
};

export default Skills;
