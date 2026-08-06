import React, { useState } from "react";
import { Loader2, Send } from "lucide-react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);
  setSuccessMessage("");

  try {
    // 1. Send formData in axios payload
    const response = await axios.post("http://localhost:8080/message", formData);

    if (response.status === 200 || response.status === 201 || response.data?.success) {
      const firstName = formData.name ? formData.name.split(" ")[0] : "there";
      setSuccessMessage(`Thanks ${firstName}, message sent successfully! I will reply soon.`);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } else {
      throw new Error(response.data?.message || "Server error");
    }
  } catch (err) {
    console.error("Message submit error:", err);
    setErrors({ 
      server: err.response?.data?.message || "Failed to send message. Please try again later." 
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-[#0F172A] p-8 rounded-2xl border border-slate-800 shadow-xl">
      {successMessage && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          {successMessage}
        </div>
      )}

      {errors.server && (
        <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          {errors.server}
        </div>
      )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-200">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
          />
          {errors.name && <span className="text-xs text-rose-400">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-200">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
          />
          {errors.email && <span className="text-xs text-rose-400">{errors.email}</span>}
        </div>
      

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-200">Message</label>
        <textarea
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project or inquiry..."
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 resize-none"
        />
        {errors.message && <span className="text-xs text-rose-400">{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 active:scale-95"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default Contact;