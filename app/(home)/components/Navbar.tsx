import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

function Navbar() {
  const socials = [
    {
      Link: "https://www.linkedin.com/in/pavanhegde97/",
      Label: "LinkedIn",
      Icon: FaLinkedin,
    },
    {
      Link: "https://github.com/pavanrkadave",
      Label: "GitHub",
      Icon: FaGithub,
    },
    {
      Link: "https://x.com/pavanrkadave",
      Label: "X",
      Icon: FaXTwitter,
    },
  ];
  return (
    <nav className="py-10 flex justify-between items-center">
      <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2">
        Pavan Hegde 👨🏻‍💻
      </h1>
      <div className="flex items-center gap-5">
        {socials.map((social, index) => {
          const Icon = social.Icon;
          return (
            <Link href={social.Link} key={index} aria-label={social.Label}>
              <Icon className="w-6 h-6 hover:scale-125 transition-all" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
