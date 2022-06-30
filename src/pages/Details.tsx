import { Card, CardActions, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPokemon } from "../API/pokemons";
import Loading from "../components/Loading";
import { PokemonDetails } from "../utils/types";

interface Props extends PokemonDetails {}

const Details = () => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  useEffect(() => {
    getPokemon(id!).then((resuls) => {
      setPokemon(resuls);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  console.log("pokemon?.abilities", pokemon?.abilities);

  const abillitesList = pokemon?.abilities.map((ability, index) => {
    return (
      <li key={index} className="text-xl">
        {ability.ability.name}
      </li>
    );
  });

  console.log("pokemone", pokemon);

  return (
    <section className="container mx-auto px-4 py-4">
      <Link to="/" className="text-3xl cursor-pointer my-5">
        Back
      </Link>
      <Card style={{ backgroundColor: pokemon?.color }}>
        <CardContent className="flex flex-col">
          <div className="grid justify-center px-8 md:grid-cols-2">
            <div>
              <img
                src={pokemon?.sprites.front_default}
                alt="pokemon name"
                className="w-full"
              />
            </div>
            <div>
              <img
                src={pokemon?.sprites.back_default}
                alt="pokemon name"
                className="w-full"
              />
            </div>
            <div className="text-center space-y-6 mb-8 md:space-y-12 ">
              <h3 className="text-4xl">name: {pokemon?.name}</h3>
              <p className="text-xl">height: {pokemon?.height}</p>
              <p className="text-xl">weight: {pokemon?.weight}</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl mb-6 md:mb-12">Abillites</h3>
              <ul className="space-y-6 md:space-y-12">{abillitesList}</ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Details;
