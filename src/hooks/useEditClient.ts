import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
      const { data } = await axios.patch(
        `https://boasorte.teddybackoffice.com.br/users/${id}`,
        rest
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
