import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Client } from "../types/ClientType";

type Response = {
  clients: Client[];
  total: number;
  page: number;
  perPage: number;
};

export function useClients(page: number) {
  return useQuery({
    queryKey: ["clients", page],
    queryFn: async (): Promise<Response> => {
      const res = await axios.get("https://boasorte.teddybackoffice.com.br/users", {
        params: { page, per_page: 10 },
      });
      return res.data;
    },
  });
}
