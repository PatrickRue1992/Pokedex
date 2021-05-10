import React, { useState, useEffect } from "react";
import SinglePokemon from "./SinglePokemon";
import "./Styles/Pokelist.css";
import { getPokemon, getPokemonData } from "./util/pokemon";

function Pokelist() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);

      setLoading(false);
    }

    fetchData();
  }, []);

  const nextPoke = async () => {
    setLoading(true);
    let data = await getPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  const prevPoke = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemonData(pokemon.url);
        console.log(pokemonRecord);
        return pokemonRecord;
      })
    );

    setPokemons(_pokemonData);
  };

  return (
    <>
      <header>
        <p>Pokedex</p>
      </header>
      {loading ? (
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Loading...</h1>
      ) : (
        <div className="container">
          <div className="btn-container">
            <button className="btn" onClick={prevPoke}>
              prev
            </button>
            <button className="btn" onClick={nextPoke}>
              next
            </button>
          </div>

          <div className="Pokemon-Container">
            {pokemons.map((poke, index) => {
              return (
                <>
                  <SinglePokemon
                    key={index}
                    pokemon={poke}
                    /*  id={poke.id}
                    name={poke.name}
                    img={poke.sprites.other["official-artwork"].front_default} */
                  />
                </>
              );
            })}
          </div>
          <button className="btn" onClick={prevPoke}>
            prev
          </button>
          <button className="btn" onClick={nextPoke}>
            next
          </button>
        </div>
      )}
    </>
  );
}

export default Pokelist;
