import { Button, Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Pokemon, PokemonDetails } from "../utils/types";
import Loading from "./Loading";

interface Props extends PokemonDetails {}

const PokemonCard: React.FC<Props> = ({
  base_experience,
  height,
  id,
  is_default,
  name,
  order,
  sprites,
  weight,
}) => {
  return (
    <article>
      <Card>
        <CardContent className="flex flex-col">
          <div className="border-b-4">
            <img
              src={sprites.front_default}
              alt="pokemon name"
              className="w-full"
            />
          </div>
          <h3 className="text-2xl mt-3">name: {name}</h3>
          <p className="text-xl mt-3">height: {height}</p>
          <p className="text-xl mt-3">weight: {weight}</p>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" sx={{ width: "100%" }}>
            <Link to={`/${id}`} className="w-full">
              Detials
            </Link>
          </Button>
        </CardActions>
      </Card>
    </article>
  );
};

export default PokemonCard;
