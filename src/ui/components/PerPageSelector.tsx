import React from "react";

type PerPageSelectorProps = {
  perPage: number;
  onChange: (value: number) => void;
};

export function PerPageSelector({ perPage, onChange }: PerPageSelectorProps) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(Number(event.target.value));
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="perPage" className="hidden sm:block text-lg text-black">
        Clientes por página:
      </label>
      <select
        id="perPage"
        name="perPage"
        className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer"
        value={perPage}
        onChange={handleChange}
      >
        {[4, 8, 12, 16].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
