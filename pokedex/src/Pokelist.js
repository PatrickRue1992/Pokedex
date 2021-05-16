import React, { useState, useEffect } from "react";
import SinglePokemon from "./SinglePokemon";
import "./Styles/Pokelist.css";
import { getPokemon, getPokemonData } from "./util/pokemon";
import Modal from "./Modal";

const initialUrl = "https://pokeapi.co/api/v2/pokemon";

function Pokelist() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [singlePoke, setSinglePoke] = useState([]);
  const [singlePokeSpecies, setSinglePokeSpecies] = useState([]);

  const closeModal = () => {
    setShowModal(false);
    setSinglePoke([]);
    setSinglePokeSpecies([]);
  };

  //show Modal and what information to get
  const openModal = async (e) => {
    let tempId = e.target.dataset.id;
    //fetch detailed information about the pokemon based on its ID
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${tempId}`);
    const data = await response.json();
    setSinglePoke(data);
    //fetch more detailed information about the pokemon based on its ID
    const specieResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${tempId}`
    );
    const specieData = await specieResponse.json();
    setSinglePokeSpecies(specieData);

    const evoChainResp = await fetch(singlePokeSpecies.evolution_chain.url);
    const evoChainData = await evoChainResp.json();

    setShowModal(true);
  };

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

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemonData(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemons(_pokemonData);
    await console.log(pokemons);
  };

  //next 20 Pokemon
  const nextPoke = async () => {
    setLoading(true);
    let data = await getPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setShowModal(false);
    setLoading(false);
  };

  // previous 20 Pokemon
  const prevPoke = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setShowModal(false);
    setLoading(false);
  };

  return (
    <>
      <header>
        <p>Pokédex</p>
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

          {/* show Modal */}

          {showModal && (
            <Modal
              singlePoke={singlePoke}
              closeModal={closeModal}
              singlePokeSpecies={singlePokeSpecies}
            />
          )}

          <div className="Pokemon-Container">
            {pokemons.map((poke) => {
              return (
                <>
                  <SinglePokemon
                    key={poke.id}
                    pokemon={poke}
                    openModal={openModal}
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
