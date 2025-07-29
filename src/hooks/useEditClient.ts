import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/api";

type EditClientInput = {
  id: string;
  name: string;
  salary: number;
  companyValuation: number;
};

export function useEditClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...rest }: EditClientInput) => {
      const { data } = await axios.patch(`${API_URL}/users/${id}`,
        rest
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
