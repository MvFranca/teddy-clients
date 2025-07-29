import { ClientsList } from "../components/clients/ClientsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const ClientsScreen = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <ClientsList />
    </QueryClientProvider>
  );
};

export default ClientsScreen;
