import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/api"; 

type Client = {
  id: string;
  name: string;
  salary: number;
  companyValuation: number;
};

type Response = {
  clients: Client[];
  totalPages: number;
  page: number;
  perPage: number;
};

export function useClients(page: number, perPage: number) {
  return useQuery<Response>({
    queryKey: ["clients", page, perPage],
    queryFn: async () => {
      const { data } = await axios.get<Response>(`${API_URL}/users`,
        {
          params: { page, limit: perPage },
        }
      );
      return data;
    },
  });
}
