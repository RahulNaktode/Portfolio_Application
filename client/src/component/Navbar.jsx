import React, { useState } from "react";
import { Terminal, Menu, X } from "lucide-react";
import GithubIcon from "../assets/github.png";
import LinkedInIcon from "../assets/linkedIn.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-100 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="font-display text-base font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            Rahul Naktode
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-slate-400 transition-colors hover:text-indigo-400"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-lg transition-all"
          >
            <img src={GithubIcon} alt="GitHub" className="h-4 w-4 object-contain invert brightness-200" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-lg transition-all"
          >
            <img src={LinkedInIcon} alt="LinkedIn" className="h-4 w-4 object-contain invert brightness-200" />
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-95"
          >
            Contact Me
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
          className="p-2 text-slate-400 hover:text-slate-100 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-b border-slate-800 bg-[#0F172A] px-6 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-indigo-400"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4 text-slate-400">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">
                  G
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
                  ll
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
              >
                Get in touch
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;