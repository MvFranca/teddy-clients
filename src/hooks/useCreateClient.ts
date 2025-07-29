import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/api"; 

type NewClient = {
  name: string;
  salary: number;
  companyValuation: number;
};

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newClient: NewClient) => {
      const { data } = await axios.post(
        `${API_URL}/users`,
        newClient
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
