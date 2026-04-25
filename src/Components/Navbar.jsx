import React from "react";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0  z-50 w-full border-b border-zinc-200 bg-[#f8f8f8]">
      <div className="mx-auto flex h-[82px] w-full items-center justify-between px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-10">
          <a
            href="/"
            className="text-[22px] font-bold tracking-tight text-[#111111]"
          >
            DEVFOLIO
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#"
              className="text-[18px] font-medium text-[#111111] transition hover:text-black"
            >
              Explore
            </a>

            <a
              href="#"
              className="text-[18px] font-medium text-[#111111] transition hover:text-black"
            >
              Jobs
            </a>

            <a
              href="#"
              className="flex items-center gap-1 text-[18px] font-medium text-[#111111] transition hover:text-black"
            >
              Resources
              <ChevronDown className="h-4 w-4 stroke-[2.2]" />
            </a>

            <div className="h-6 w-px bg-zinc-300" />

            <a
              href="#"
              className="flex items-center gap-1 text-[18px] font-medium text-[#111111] transition hover:text-black"
            >
              Hire
              <ChevronDown className="h-4 w-4 stroke-[2.2]" />
            </a>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-[#0057ff] px-6 py-3 text-[17px] font-semibold text-white shadow-sm transition hover:bg-[#0047d6]">
            Create Now
          </button>

          <button className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-[17px] font-semibold text-[#1d4ed8] transition hover:bg-zinc-50">
            Sign In
          </button>

          <div className="ml-1 flex items-center gap-2">
            <span className="text-[30px] font-black leading-none text-black">
              A
            </span>
            <span className="text-[20px] font-semibold text-black">Adobe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
