import React, { useState, useEffect, useRef } from "react";
import { Layers, Star, PlusCircle, Globe, Upload, Loader2, X } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PhotoViwer from "./PhotoViwer";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

function Project() {
  const [projects, setProjects] = useState([]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    imageUrl: [],
    demoLink: "",
    githubLink: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const authenticator = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  // ImageKit Upload Handler
  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast.error("Please select an image file to upload");
      return;
    }

    const file = fileInput.files[0];
    setUploading(true);

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      toast.error("Failed to authenticate ImageKit server");
      setUploading(false);
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });

      // Append new uploaded image URL
      setNewProject((prev) => ({
        ...prev,
        imageUrl: [...prev.imageUrl, uploadResponse.url],
      }));

      toast.success("Image uploaded successfully!");
      setProgress(0);
      fileInput.value = "";
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // Fetch Projects from API
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/fetchproject`);

      console.log("Backend Response:", res.data);

      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setProjects(res.data.data);
      } else if (Array.isArray(res.data)) {
        setProjects(res.data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setProjects([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addProject = async (e) => {
    e.preventDefault();

    if (!newProject.title.trim() || !newProject.description.trim()) {
      return toast.error("Title and Description are required!", { id: "validationError" });
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/project`, newProject);

      if (response.data.success) {
        toast.success(response.data.message || "Project added successfully!", { id: "addProjectSuccess" });

        if (response.data.project) {
          setProjects((prev) => [response.data.project, ...prev]);
        } else {
          fetchProjects();
        }

        setNewProject({
          title: "",
          description: "",
          imageUrl: [],
          demoLink: "",
          githubLink: "",
          featured: false,
        });
        setShowForm(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add project", { id: "addProjectError" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
            <Layers className="h-6 w-6 text-indigo-400" /> Projects Management
          </h2>
          <p className="text-sm text-slate-400 mt-1">View published projects or add a new one.</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <PlusCircle className="h-4 w-4" /> Add Project
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          🚀 Published Projects ({projects.length})
        </h3>

        {fetching ? (
          <div className="flex items-center gap-2 text-slate-400 py-8">
            <Loader2 className="h-5 w-5 animate-spin text-indigo-400" /> Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">Ajun kontech project add kelele nahit.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(projects) &&
              projects.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500/40 transition-all relative group"
                >
                  <div>
                    {item.featured && (
                      <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-semibold">
                        <Star className="h-3 w-3 fill-amber-300" /> Featured
                      </span>
                    )}

                    {item.imageUrl ? (
                      <div className="h-44 w-full mb-4 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                        <PhotoViwer
                        imageUrl={item.imageUrl}
                        alt={item?.title || "Certificate Image"}
                        className="w-full h-full object-cover"
                      />
                      </div>
                    ) : (
                      <div className="h-44 w-full mb-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-600 text-xs">
                        No Image Provided
                      </div>
                    )}

                    <h4 className="text-lg font-bold text-slate-100 mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-medium">
                    {item.demoLink ? (
                      <a
                        href={item.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Globe className="h-3.5 w-3.5" /> Demo
                      </a>
                    ) : (
                      <span className="text-slate-600">No Demo</span>
                    )}

                    {item.githubLink && (
                      <a
                        href={item.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-white flex items-center gap-1"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-xl relative shadow-2xl space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h1 className="text-xl font-bold text-slate-100">Add New Project</h1>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={addProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleChange}
                  placeholder="e.g. SocialMediaGram"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Brief summary of your project..."
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2 border border-slate-800 p-3 rounded-xl bg-slate-950/50">
                <label className="block text-xs font-semibold text-slate-300">Upload Project Screenshots (ImageKit)</label>

                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700"
                  />
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors"
                  >
                    {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                    Upload
                  </button>
                </div>

                {progress > 0 && (
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}

                {newProject.imageUrl && newProject.imageUrl.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {newProject.imageUrl.map((photo, index) => (
                      <PhotoViwer
                        imageUrl={photo}
                        key={index}
                        onDelete={(url) => {
                          setNewProject({
                            ...newProject,
                            imageUrl: newProject.imageUrl.filter((p) => p !== url),
                          });
                        }}
                        showDelete
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    name="demoLink"
                    value={newProject.demoLink}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    name="githubLink"
                    value={newProject.githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={newProject.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="featured" className="text-xs font-medium text-slate-300 cursor-pointer">
                  Mark as Featured Project
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
                {loading ? "Saving Project..." : "Publish Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
}

export default Project;