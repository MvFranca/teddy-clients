import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
        console.log('id:', id)
      await axios.delete(`https://boasorte.teddybackoffice.com.br/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir o cliente.");
    },
  });
}
