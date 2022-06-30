import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPokemons } from "./API/pokemons";
import "./App.css";
import Loading from "./components/Loading";
import PokemonCard from "./components/PokemonCard";
import PokemonPagination from "./components/PokemonPagination";
import { PAGE_SIZE } from "./utils/constants";
import { PokemonDetails } from "./utils/types";

function App() {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [next, setNext] = useState<number | null>(0);
  const [previous, setPrevious] = useState<number | null>(0);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPokemons({ limit: 9, offset: 0 }).then((res) => {
      setPokemons(res[0]);
      setCount(res[1]);
      setNext(res[2]);
      setPrevious(res[3]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const pageNumbers = Math.round(count / PAGE_SIZE);

  const handlePageChanged = (pageNumber: number) => {
    setLoading(true);
    const newOffset = (pageNumber - 1) * PAGE_SIZE;

    getPokemons({ limit: 9, offset: newOffset }).then((res) => {
      setPokemons(res[0]);
      setCount(res[1]);
      setNext(res[2]);
      setPrevious(res[3]);
      setPage(pageNumber);
      setLoading(false);
    });
  };

  return (
    <main>
      <div className="container mx-auto my-8">
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
          {pokemons.map((pokemon) => (
            <PokemonCard {...pokemon} key={pokemon.id} />
          ))}
        </section>
        <footer>
          <PokemonPagination
            count={pageNumbers}
            page={page}
            onPageChange={handlePageChanged}
          />
        </footer>
      </div>
    </main>
  );
}

export default App;
