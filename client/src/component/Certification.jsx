import React, { useState, useEffect, useRef } from "react";
import { Award, CheckCircle2, PlusCircle, Loader2, X, Upload } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { upload } from "@imagekit/react";
import PhotoViwer from "./PhotoViwer";

function Certifications() {
  // 1. Fixed Date Initialization Error (new Date())
  const [certifications, setCertifications] = useState([]);
  const [newCert, setNewCert] = useState({
    title: "",
    imageUrl: "",
    completionDate: new Date().toISOString().split("T")[0],
  });

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // ImageKit Upload States
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  // Helper Function for Safe Image URL Resolution
  const resolveImageUrl = (img) => {
    if (!img) return null;
    if (Array.isArray(img)) return img[0] || null;
    if (typeof img === "string") return img;
    return null;
  };

  // ImageKit Authenticator
  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth");
      if (!response.ok) throw new Error("Auth failed");
      return await response.json();
    } catch (error) {
      console.error("Auth error:", error);
      throw error;
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return toast.error("Please select a file to upload");
    }

    const file = fileInput.files[0];
    setUploading(true);

    try {
      const { signature, expire, token, publicKey } = await authenticator();
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => setProgress(Math.round((event.loaded / event.total) * 100)),
      });

      // Handle ImageKit URL string
      const uploadedUrl = uploadResponse.url || uploadResponse.filePath;
      setNewCert((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      toast.success("Certificate image uploaded!");
      setProgress(0);
      fileInput.value = "";
    } catch (error) {
      toast.error("Upload failed!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Fetch Certificates from Backend
  const fetchCertificates = async () => {
    try {
      const res = await axios.get("http://localhost:8080/fetchcertificate");
      console.log("Backend Response:", res.data);

      // Extract array safely from any key structure
      const rawData = res.data?.data || res.data?.certificates || res.data;

      if (Array.isArray(rawData)) {
        setCertifications(rawData.filter((item) => item !== null));
      } else {
        setCertifications([]);
      }
    } catch (err) {
      console.error("Failed to fetch certifications:", err);
      setCertifications([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCert((prev) => ({ ...prev, [name]: value }));
  };

  const addCertificate = async (e) => {
    e.preventDefault();

    if (!newCert.title.trim() || !newCert.imageUrl.trim()) {
      return toast.error("Title and Certificate Image are required!");
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/certificate", newCert);

      if (response.data?.success) {
        toast.success(response.data.message || "Certification added successfully!");

        if (response.data.certificate) {
          setCertifications((prev) => [response.data.certificate, ...prev]);
        } else {
          fetchCertificates();
        }

        setNewCert({
          title: "",
          imageUrl: "",
          completionDate: new Date().toISOString().split("T")[0],
        });
        setShowForm(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add certification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="certifications" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
            <Award className="h-6 w-6 text-indigo-400" /> Certifications & Training
          </h2>
          <p className="text-sm text-slate-400 mt-1">Verified certificates and course completions.</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm shadow-lg shadow-indigo-600/20"
        >
          <PlusCircle className="h-4 w-4" /> Add Certificate
        </button>
      </div>

      {fetching ? (
        <div className="flex items-center gap-2 text-slate-400 py-8">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" /> Loading certificates...
        </div>
      ) : certifications.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">No certifications added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((item, index) => {
            const validImageUrl = resolveImageUrl(item?.imageUrl);

            return (
              <div
                key={item?._id || index}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500/40 transition-all relative group"
              >
                <div>
                  {validImageUrl ? (
                    <div className="h-48 w-full mb-4 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                      <PhotoViwer
                        imageUrl={validImageUrl}
                        alt={item?.title || "Certificate Image"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full mb-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-600 text-xs">
                      No Image Provided
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    {item?.title || "Untitled Certificate"}
                  </h4>

                  {item?.completionDate && (
                    <p className="text-xs text-slate-400 mt-2">
                      Issued Date: <span className="text-slate-300">{item.completionDate}</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Certificate Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md relative shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100">Add New Certificate</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={addCertificate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newCert.title}
                  onChange={handleChange}
                  placeholder="e.g. MERN Stack Web Development"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Completion Date</label>
                <input
                  type="date"
                  name="completionDate"
                  value={newCert.completionDate}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* ImageKit Upload Input */}
              <div className="space-y-2 border border-slate-800 p-3 rounded-xl bg-slate-950/50">
                <label className="block text-xs font-semibold text-slate-300">Certificate Image *</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-slate-800 file:text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium shrink-0"
                  >
                    {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                    Upload
                  </button>
                </div>

                {progress > 0 && (
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                    <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                  </div>
                )}

                {newCert.imageUrl && (
                  <div className="mt-2 h-24 w-full rounded-lg overflow-hidden border border-slate-700">
                    <img src={newCert.imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
                {loading ? "Saving..." : "Save Certificate"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </section>
  );
}

export default Certifications;