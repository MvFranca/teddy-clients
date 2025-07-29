import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
        "https://boasorte.teddybackoffice.com.br/users",
        newClient
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
