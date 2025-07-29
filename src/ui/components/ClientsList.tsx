import { Button, ClientCard } from "@teddy/design-system";
import { useClients } from "../../hooks/useClients";
import { useState } from "react";

export function ClientsList() {
const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(16);

const { data, isFetching } = useClients(page, perPage);

  const totalPages = data?.totalPages ?? 1;
  const clients = data?.clients ?? [];

  function handlePrev() {
    setPage((old) => Math.max(old - 1, 1));
  }

  function handleNext() {
    setPage((old) => Math.min(old + 1, totalPages));
  }

  function handlePerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(Number(event.target.value));
    setPage(1); // voltar para a primeira página ao trocar o limite
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-start py-8">
      <div className="max-w-[1200px] w-full px-4 flex gap-y-2.5 flex-col">
        <div className="flex justify-between items-center">
          <p className="text-black text-lg">
            <span className="font-bold">{data?.clients.length ?? 0}</span> clientes encontrados:
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="perPage" className="hidden sm:block text-lg text-black">
              Clientes por página:
            </label>
            <select
              id="perPage"
              name="perPage"
              className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer"
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>
        </div>
        {/* Lista de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-[10px]">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              salary={client.salary}
              company={client.companyValuation}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => alert("Criar Cliente")}
          fullWidth
        >
          Criar Cliente
        </Button>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={page === 1 || isFetching}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-700">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages || isFetching}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
