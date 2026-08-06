import React from "react";
import {
  FileText,
  Send,
  Terminal,
  Layout,
  Server,
  Database,
  Cpu,
  Download,
  ExternalLink,
  Brain
} from "lucide-react";
import Resume from "../assets/rahul-resume.pdf";
import RahulImage from "../assets/Rahul.jpeg";

const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "MongoDB",
  "Express.js",
  "React.js",
  "Node.js",
  "REST APIs",
  "ImageKit",
  "Tailwind CSS",
];

const stats = [
  { value: "MERN Stack", label: "Core Focus" },
  { value: "Real-Time", label: "WebSockets & Chat" },
  { value: "Full Stack", label: "End-to-End Apps" },
];

function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800/60">
      <div className="mx-auto max-w-6xl px-6 space-y-16">

        <div className="grid items-center gap-12 lg:grid-cols-12">

          <div className="lg:col-span-7 space-y-6">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Full-Stack Roles
            </div>

            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-100">
                Rahul Naktode
              </h1>
              <p className="mt-2 text-xl font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Full Stack MERN Developer
              </p>
            </div>

            <p className="text-base leading-relaxed text-slate-400 max-w-xl">
              I am a passionate software developer specializing in designing, building, and deploying scalable web applications. My expertise spans constructing real-time engines with Socket.io, configuring cloud image management via ImageKit, and crafting interactive, responsive React dashboards.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 active:scale-95 flex items-center gap-2"
              >
                Send Message <Send className="h-4 w-4" />
              </a>

              <a
                href={Resume} 
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-6 py-3 text-sm font-semibold text-indigo-300 transition-all hover:bg-indigo-500/20 hover:border-indigo-500/50 flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-indigo-400" />
                View Resume
                <Download className="h-3.5 w-3.5 ml-1 opacity-70" />
              </a>
            </div>

            <ul className="flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-800/80 pt-6 mt-6">
              {stats.map((s) => (
                <li key={s.label}>
                  <p className="font-display text-xl font-bold text-slate-100">{s.value}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-slate-400">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>

              <div className="relative rounded-2xl border border-slate-800 bg-[#0F172A] p-3 shadow-2xl overflow-hidden">
                <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src={RahulImage}
                    alt="Rahul Naktode"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-3 px-2 py-1.5 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/80">
                  <span>Rahul Naktode</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

<div className="border-t border-slate-800/60 pt-16">

<h1 className="text-3xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2 mb-8">
   <Brain className="h-6 w-6 text-indigo-400" />
  Skills</h1>
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-xl hover:border-indigo-500/40 transition-colors">
              <Layout className="h-5 w-5 text-indigo-400 mb-2" />
              <h3 className="font-bold text-slate-100 text-xs">Frontend</h3>
              <p className="text-[11px] text-slate-400 mt-1">HTML, CSS, JavaScript, React.js, Tailwind CSS</p>
            </div>
            <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-xl hover:border-indigo-500/40 transition-colors">
              <Server className="h-5 w-5 text-emerald-400 mb-2" />
              <h3 className="font-bold text-slate-100 text-xs">Backend</h3>
              <p className="text-[11px] text-slate-400 mt-1">Node.js, Express.js, REST APIs</p>
            </div>
            <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-xl hover:border-indigo-500/40 transition-colors">
              <Database className="h-5 w-5 text-purple-400 mb-2" />
              <h3 className="font-bold text-slate-100 text-xs">Database</h3>
              <p className="text-[11px] text-slate-400 mt-1">MongoDB</p>
            </div>
            <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-xl hover:border-indigo-500/40 transition-colors">
              <Cpu className="h-5 w-5 text-amber-400 mb-2" />
              <h3 className="font-bold text-slate-100 text-xs">Real-Time</h3>
              <p className="text-[11px] text-slate-400 mt-1">Socket.io, WebSockets</p>
            </div>
          </div>

          <div className="md:col-span-5 rounded-xl border border-slate-800 bg-[#0F172A] p-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">developer.ts</span>
            </div>
            <pre className="mt-4 overflow-x-auto text-xs font-mono leading-6 text-slate-300">
              <code>{`const developer = {
  name: "Rahul Naktode",
  role: "Full Stack Engineer",
  specialization: "MERN Stack",
  available: true
};`}</code>
            </pre>
            <div className="mt-4 border-t border-slate-800 pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Tech Stack</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 text-[11px] font-mono text-indigo-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
      </div>
    </section>
  );
}

export default About;