import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const HOST_NAME = process.env.EXPO_PUBLIC_HOST_NAME;

export const getPsychiatristsListRequest = async () => {
  try {
    const response = await axios.get(`${HOST_NAME}/psy/list`);
    return response.data?.psychiatrists || [];
  } catch (error: any) {
    console.error("Error in GET /psy/list:", error);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const usePsychiatristsList = () => {
  const mutation = useMutation({
    mutationFn: () => getPsychiatristsListRequest(),
  });

  return {
    loadPsychiatrists: mutation.mutate,
    psychiatrists: mutation.data,
    error: mutation.error,
  };
};
