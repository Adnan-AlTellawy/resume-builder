import React, { useEffect, useState } from "react";
import { getPublicResumes } from "../services/resumes";

const Preview = () => {
  const [publicResumes, setPublicResumes] = useState([]);

  useEffect(() => {
    const loadPublic = async () => {
      try {
        const data = await getPublicResumes();
        setPublicResumes(data || []);
      } catch {
        setPublicResumes([]);
      }
    };
    loadPublic();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Public Resumes</h1>
      {publicResumes.length === 0 ? (
        <p className="text-gray-500">No public resumes found.</p>
      ) : (
        <ul className="space-y-2">
          {publicResumes.map((r) => (
            <li key={r._id || r.id} className="border rounded p-3">
              {r.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Preview;
