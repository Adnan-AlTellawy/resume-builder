import { apiClient } from "./apiClient";

export const enhanceSummary = async (userContent) => {
  const { data } = await apiClient.post("/ai/enhance-summary", {
    userContent,
  });
  return data;
};

export const enhanceJobDescription = async (userContent) => {
  const { data } = await apiClient.post("/ai/enhance-job-description", {
    userContent,
  });
  return data;
};

export const uploadAndExtract = async (resumeText) => {
  const { data } = await apiClient.post("/ai/upload-resume", {
    resumeText,
  });
  return data;
};
