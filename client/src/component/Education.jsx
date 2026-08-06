import React, { useState, useEffect } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import axios from "axios";

function Education() {

  // Static Fallback Data
  const defaultEducation = [
    {
      _id: "1",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Information Technology",
      institution: "Tulsiramji Gaikwad-Patil College of Engineering & Technology, Nagpur",
      location: "Nagpur, Maharashtra",
      duration: "2023 - 2027",
      grade: "9.0 CGPA",
      description: "Specialized in Full-Stack Web Development",
    },
    {
      _id: "2",
      degree: "Higher Secondary Certificate (HSC)",
      field: "Science Stream (PCMB)",
      institution: "Saraswati Jr. College, Arjuni/Mor",
      location: "Arjuni/Mor, Maharashtra",
      duration: "2021 - 2023",
      grade: "64%",
      description: "Focused on Physics, Chemistry,Higher Mathematics, and Biology",
    }
  ];

  return (
    <section id="education" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="space-y-2 border-b border-slate-800 pb-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 flex items-center gap-3">
          <GraduationCap className="h-7 w-7 text-indigo-400" /> Educational Background
        </h2>
        <p className="text-sm text-slate-400">My academic qualifications and formal learning journey.</p>
      </div>

      {/* Education Timeline */}
      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 pl-6 space-y-8">
        {defaultEducation.map((item) => (
          <div key={item._id} className="relative group">
            {/* Timeline Dot Icon */}
            <div className="absolute -left-[35px] top-1.5 h-4 w-4 rounded-full bg-indigo-500 border-4 border-slate-950 group-hover:scale-125 transition-transform" />

            {/* Card Body */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition-all space-y-3 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{item.degree}</h3>
                  <p className="text-sm font-medium text-indigo-400">{item.field}</p>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 w-fit">
                  <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                  {item.duration}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">{item.institution}</span>
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {item.location}
                  </span>
                )}
                {item.grade && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Award className="h-3 w-3" /> Grade: {item.grade}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/60">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;