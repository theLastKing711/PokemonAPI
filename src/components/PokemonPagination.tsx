import { Pagination } from "@mui/material";
import React from "react";

interface Props {
  count: number;
  page: number;
  onPageChange: (value: number) => void;
}

const PokemonPagination: React.FC<Props> = ({ count, page, onPageChange }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <Pagination page={page} count={count} onChange={handleChange} />
    </div>
  );
};

export default PokemonPagination;
