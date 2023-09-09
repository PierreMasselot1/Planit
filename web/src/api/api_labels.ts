import { Label } from "@shared/types/label_types";
import axiosInstance from "./axios";

export const getLabelsAPI = async (): Promise<Label[]> => {
  const labels = (await axiosInstance.get("/api/label")).data.labels;
  return labels;
};

export const getLabelsForTodoAPI = async (id: number): Promise<Label[]> => {
  const labels = (await axiosInstance.get(`/api/label/todo?id=${id}`)).data
    .labels;
  return labels;
};

export const createLabelAPI = async (label: Label) => {
  const newLabel = (await axiosInstance.post("/api/label", label)).data.label;
  return newLabel;
};
