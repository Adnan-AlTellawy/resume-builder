
import {
  CloudUpload,
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const color = ["#2e7d32", "#0d47a1", "#d500f9", "#66bb6a"];
  const [allResumes, setAllResumes] = useState([
    {
      _id: "mock-1",
      title: "My First Resume",
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "mock-2",
      title: "Software Engineer Resume",
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [ShowCreateResumes, setShowCreateResumes] = useState(false);
  const [ShowUploadExisting, setShowUploadExisting] = useState(false);
  const [editresumeid, seteditresumeid] = useState("");
  const [title, settitle] = useState("");
  const [resume, setresume] = useState(null);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const createResume = async (e) => {
    e.preventDefault();
    setShowCreateResumes(false);
    try {
      const newId = "mock-" + Date.now();
      const newResume = {
        _id: newId,
        title: title || "Untitled Resume",
        updatedAt: new Date().toISOString(),
      };
      setAllResumes((prev) => [...prev, newResume]);
      navigate(`/app/builder/${newId}`);
      settitle("");
    } catch (err) {
      setError(err.message || "Failed to create resume");
    }
  };

  const deleteresume = async (resumeid) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resume?",
    );
    if (!confirm) return;
    try {
      setAllResumes((prev) => prev.filter((r) => r._id !== resumeid));
      setError("");
    } catch (err) {
      const message = err.message || "Failed to delete resume";
      setError(message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const editTitle = async (e) => {
    e.preventDefault();
    if (!editresumeid) return;
    try {
      setAllResumes((prev) =>
        prev.map((r) =>
          r._id === editresumeid ? { ...r, title, updatedAt: new Date().toISOString() } : r
        )
      );
      seteditresumeid("");
      settitle("");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to update title");
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
            {error}
          </div>
        )}
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe Doe
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResumes(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center 
          gap-2 rounded-lg text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 transition-all duration-300 cursor-pointer hover:shadow-lg"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />{" "}
            <p className="text-sm group-hover:text-indigi-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
        </div>
        <hr className="text-slate-300 my-6 max-w-[350px]" />
        <div className="flex flex-wrap max-w-[500px] min-w-[100px] gap-4">
{allResumes.map((resumes, index) => {
            const baseColor = color[index % color.length];
            return (
              <div
                key={resumes._id}
                onClick={() => navigate(`/app/builder/${resumes._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex
              flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg 
              transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}60, ${baseColor}10)`,
                }}
              >
                <FilePenLineIcon
                  className="size-7 hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                ></FilePenLineIcon>
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resumes.title}
                </p>
                <p
                  style={{ color: baseColor + "90" }}
                  className="absolute bottom-1 text-[13px] text-slate-400 text-center group-hover:text-slate-500 transition-all duration-300 px-2"
                >
                  Updated On {new Date(resumes.updatedAt).toLocaleDateString()}
                </p>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 flex items-center gap-1"
                >
                  <TrashIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (resumes._id) {
                        deleteresume(resumes._id);
                      }
                    }}
                    className="size-7 p-1.5 hover:bg-white/20 rounded text-slate-700 transition-colors cursor-pointer"
                  />
                  <PencilIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      seteditresumeid(resumes._id);
                      settitle(resumes.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/20 rounded text-slate-700 transition-colors cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {ShowCreateResumes &&
          createPortal(
            <div
              className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => setShowCreateResumes(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-resume-title"
            >
              <form
                onSubmit={createResume}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 text-center shadow-xl"
              >
                <h2
                  id="create-resume-title"
                  className="text-xl font-bold text-slate-800 mb-1"
                >
                  Create a Resume
                </h2>
                <p className="text-sm text-slate-500 mb-5">
                  Choose a title for your new resume
                </p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  placeholder="Enter resume title"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 mb-4 text-left text-slate-800 outline-none ring-green-600/30 focus:border-green-600 focus:ring-2" required
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 py-2.5 font-medium text-white transition-colors hover:bg-green-700"
                >
                  Create Resume
                </button>
                <button
                  type="button"
                  className="absolute top-3 right-3 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close"
                  onClick={() => {
                    setShowCreateResumes(false);
                    settitle("");
                  }}
                >
                  <XIcon className="size-5" />
                </button>
              </form>
            </div>,
            document.body,
          )}
        {ShowUploadExisting &&
          createPortal(
            <div
              className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => setShowUploadExisting(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="upload-resume-title"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 text-center shadow-xl"
              >
                <h2
                  id="upload-resume-title"
                  className="text-xl font-bold text-slate-800 mb-1"
                >
                  Upload a Resume
                </h2>
                <p className="text-sm text-slate-500 mb-5">
                  Choose a title for your new resume
                </p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  placeholder="Enter resume title"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 mb-4 text-left text-slate-800 outline-none ring-green-600/30 focus:border-green-600 focus:ring-2"
                  required
                />
                <div>
                  select resume file
                  <label
                    htmlFor="resume-input"
                    className="flex flex-col items-center justify-center gap-2
                    border group text-slate-400 border-slate-400 border-dashed
                    rounded-md p-4 py-10 my-4 hover:border-green-500
                    hover:text-green-700 cursor-pointer transition-colors"
                  >
                    {resume ? (
                      <p className="text-green-700">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload resume</p>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="resume-input"
                    accept=".pdf"
                    hidden
                    onChange={(e) => {
                      setresume(e.target.files[0]);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 py-2.5 font-medium text-white transition-colors hover:bg-green-700"
                >
                  Upload Resume
                </button>
                <button
                  type="button"
                  className="absolute top-3 right-3 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label="Close"
                  onClick={() => {
                    setShowUploadExisting(false);
                    settitle("");
                  }}
                >
                  <XIcon className="size-5" />
                </button>
              </form>
            </div>,
            document.body,
          )}
        {editresumeid &&
          createPortal(
            <div
              className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => seteditresumeid("")}
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-resume-title"
            >
              <form
                onSubmit={editTitle}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 text-center shadow-xl"
              >
                <h2
                  id="edit-resume-title"
                  className="text-xl font-bold text-slate-800 mb-1"
                >
                  edit resume title
                </h2>
                <p className="text-sm text-slate-500 mb-5">
                  Choose a title for your new resume
                </p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  placeholder="Enter resume title"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 mb-4 text-left text-slate-800 outline-none ring-green-600/30 focus:border-green-600 focus:ring-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 py-2.5 font-medium text-white transition-colors hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="absolute top-3 right-3 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close"
                  onClick={() => {
                    seteditresumeid("");
                    settitle("");
                  }}
                >
                  <XIcon className="size-5" />
                </button>
              </form>
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};
export default Dashboard;