import { Button } from "@teddy/design-system";

interface Props {
  page: number;
  totalPages: number;
  isFetching: boolean;
  onPageChange: (newPage: number) => void;
}

export function PaginationControls({
  page,
  totalPages,
  isFetching,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isFetching}
        size="sm"
      >
        Anterior
      </Button>

      <span className="text-sm text-gray-600">
        Página {page} de {totalPages}
      </span>

      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || isFetching}
        size="sm"
      >
        Próxima
      </Button>
    </div>
  );
}
