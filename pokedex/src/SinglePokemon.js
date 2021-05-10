import React from "react";
import "./Styles/SinglePokemon.css";
import typeColors from "./util/typeColors";

function SinglePokemon({ pokemon }) {
  return (
    <>
      <section
        key={pokemon.id}
        className="SinglePokeContainer"
        style={{
          background: `linear-gradient(${
            typeColors[pokemon.types[0].type.name]
          }, #FFFFFF)`,
        }}
      >
        <p>#0{pokemon.id}</p>
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <p>{pokemon.name}</p>
      </section>
    </>
  );
}

export default SinglePokemon;

/* style={{ backgroundColor: typeColors[pokemon.types[0].type.name] }} */
