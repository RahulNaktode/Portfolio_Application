import React from "react";
import Project from "../component/Project";
import About from "../component/About";
import Certifications from "../component/Certification";
import Contact from "../component/Contact";
import Navbar from "../component/Navbar";
import Education from "../component/Education";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <main className="space-y-16 pb-20">
        <About />
        <Project />
        <Certifications />
        <Education />
        <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-100">Contact Me</h2>
            <p className="text-sm text-slate-400 mt-2">Have a project in mind or want to collaborate? Feel free to reach out.</p>
          </div>
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;