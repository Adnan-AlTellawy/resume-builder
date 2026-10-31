import { apiClient } from "../utils/apiClient";

export const getResumes = async () => {
  const { data } = await apiClient.get("/resumes");
  return data?.resumes || [];
};

export const getResumeById = async (id) => {
  const { data } = await apiClient.get(`/resumes/${id}`);
  return data;
};

export const createResume = async (payload) => {
  const { data } = await apiClient.post("/resumes", payload);
  return data?.resume || data;
};

export const updateResume = async (id, formData) => {
  const { data } = await apiClient.post(`/resumes/update/${id}`, formData);
  return data?.resume || data;
};

export const deleteResume = async (id) => {
  const { data } = await apiClient.delete(`/resumes/${id}`);
  return data;
};

export const getPublicResumes = async () => {
  const { data } = await apiClient.get("/resumes/public");
  return data?.resumes || [];
};
