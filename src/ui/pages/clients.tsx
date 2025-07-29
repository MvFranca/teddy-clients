import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClientsList } from "../components/ClientsList";

const queryClient = new QueryClient();

const ClientsScreen = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientsList />
    </QueryClientProvider>
  );
};

export default ClientsScreen;
