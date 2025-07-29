import clsx from "clsx";

interface Props {
  page: number;
  totalPages: number;
  isFetching: boolean;
  onPageChange: (newPage: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  const delta = 1;
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);

  if (left > 2) {
    range.push("...");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total);
  }

  return range;
}

export function PaginationControls({
  page,
  totalPages,
  isFetching,
  onPageChange,
}: Props) {
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-sm text-black">
            ...
          </span>
        ) : (
          <button
            key={p}
            disabled={isFetching}
            onClick={() => onPageChange(p)}
            className={clsx(
              "w-[35px] h-[35px] rounded text-sm font-medium",
              {
                "bg-orange-500 text-white": p === page,
                "text-black hover:text-orange-500 transition-colors": p !== page,
              }
            )}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
}
