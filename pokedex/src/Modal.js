import React from "react";
import "./Styles/Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import typeColors from "./util/typeColors";

function Modal({
  closeModal,
  singlePoke,
  singlePokeSpecies,
  singlePokeEvoChain,
}) {
  let bioText = singlePokeSpecies.flavor_text_entries[0].flavor_text;
  bioText = bioText.split("").join(" ");

  //Start ID of the first Poke in the chain
  let basePokeTempId = singlePokeEvoChain.chain.species.url;
  basePokeTempId = basePokeTempId.split("/");
  basePokeTempId = basePokeTempId[6];
  //End ID of the first Poke in the chain

  //get ID first evolv if exists
  let firstEvolTempId = "";
  if (singlePokeEvoChain.chain.evolves_to.length > 0) {
    firstEvolTempId = singlePokeEvoChain.chain.evolves_to[0].species.url;
    firstEvolTempId = firstEvolTempId.split("/");
    firstEvolTempId = firstEvolTempId[6];
  }

  //get ID second evol if exists
  let secondEvolTempId = "";
  if (
    singlePokeEvoChain.chain.evolves_to.length > 0 &&
    singlePokeEvoChain.chain.evolves_to[0].evolves_to.length > 0
  ) {
    secondEvolTempId =
      singlePokeEvoChain.chain.evolves_to[0].evolves_to[0].species.url;
    secondEvolTempId = secondEvolTempId.split("/");
    secondEvolTempId = secondEvolTempId[6];
  }

  console.log(secondEvolTempId);
  /*  console.log(singlePokeEvoChain.chain.evolves_to[0].evolves_to.length); */
  return (
    <>
      <div className="modalContainer" key={singlePoke.id}>
        <header>
          <i className="closeIcon" onClick={closeModal}>
            <AiOutlineClose size={60} />
          </i>
        </header>
        <div
          className="ModalContent"
          style={{
            background: `linear-gradient(${
              typeColors[singlePoke.types[0].type.name]
            }, #FFFFFF)`,
          }}
        >
          <div className="picContainer">
            <div className="id">
              <p>
                {" "}
                {singlePoke.id > 99
                  ? `#${singlePoke.id}`
                  : `#0${singlePoke.id}`}
              </p>
            </div>
            <img
              className="modal_img"
              src={singlePoke.sprites.other["official-artwork"].front_default}
              alt=""
            />
            <div className="pokeName">
              <p>{singlePoke.name}</p>
            </div>
          </div>

          {/* start mittlerer sector */}
          <div className="Biography">
            <p>Bio</p>
            <div className="bio_data">
              <p className="bio_Text">{bioText}</p>
              <div className="bio_data_container">
                <p>Genus: </p>
                <p>{singlePokeSpecies.genera[7].genus}</p>
                <p>{singlePoke.types.length > 1 ? "Types:" : "Type:"}</p>

                <p>
                  {singlePoke.types[0].type.name}

                  {singlePoke.types.length > 1
                    ? ` / ${singlePoke.types[1].type.name}`
                    : ""}
                </p>

                <p>Height: </p>
                <p>
                  {singlePoke.height / 10}m (
                  {Math.floor(((singlePoke.height / 10) * 39.37) / 12)}&apos;
                  {(((singlePoke.height / 10) * 39.37) % 12).toFixed(1)}
                  &quot;)
                </p>

                <p>Weight:</p>
                <p>
                  {singlePoke.weight / 10}kg (
                  {((singlePoke.weight / 10) * 2.2).toFixed(1)} lbs)
                </p>

                <p>Ability:</p>
                <p>{singlePoke.abilities[0].ability.name}</p>

                <p>
                  {singlePoke.abilities.length > 1 ? "Hidden Ability:" : ""}
                </p>
                <p className="test">
                  {singlePoke.abilities.length > 1
                    ? `${singlePoke.abilities[1].ability.name} `
                    : ""}
                </p>
              </div>
            </div>

            <div className="training_container">
              <p>Training</p>
              <div className="training_data">
                <p>Base Exp:</p>
                <p>{singlePoke.base_experience}</p>

                <p>Base Happines:</p>
                <p>{singlePokeSpecies.base_happiness}</p>

                <p>Catch Rate:</p>
                <p>
                  {singlePokeSpecies.capture_rate} (
                  {((singlePokeSpecies.capture_rate / 255) * 100).toFixed(1)}
                  %)
                </p>

                <p>Growth Rate:</p>
                <p>{singlePokeSpecies.growth_rate.name}</p>
              </div>
            </div>
          </div>

          {/* Start rechter Part (evolution und base stats) */}
          <div className="rightPart">
            <div className="evolutions">
              <p>Evolution</p>

              {/* evolution api anschauen und iterieren */}
              <div className="evo_container">
                <div className="evo_images">
                  <div></div>
                  {/* Every Pokemons first Stage is shown first */}
                  <p className="evo_id">{basePokeTempId}</p>
                  <img
                    className="evoo"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${basePokeTempId}.png`}
                    alt=""
                  />
                  <p className="evo_name">
                    {singlePokeEvoChain.chain.species.name}
                  </p>
                </div>

                {/* dynamic Container, check if there is a first evolution, if yes, show it */}

                {singlePokeEvoChain.chain.evolves_to.length > 0 ? (
                  <div className="evo_images">
                    <p className="evo_id">{firstEvolTempId}</p>
                    <img
                      className="evoo"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${firstEvolTempId}.png`}
                      alt=""
                    />
                    <p className="evo_name">
                      {singlePokeEvoChain.chain.evolves_to[0].species.name}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {/* dynamic Container, 2nd evolution, if yes, show it */}

                {singlePokeEvoChain.chain.evolves_to.length > 0 &&
                singlePokeEvoChain.chain.evolves_to[0].evolves_to.length > 0 ? (
                  <div className="evo_images">
                    <p className="evo_id">{secondEvolTempId}</p>
                    <img
                      className="evoo"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${secondEvolTempId}.png`}
                      alt=""
                    />
                    <p className="evo_name">
                      {
                        singlePokeEvoChain.chain.evolves_to[0].evolves_to[0]
                          .species.name
                      }
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="base_stats_container">
              <p>Base Stats</p>

              <div className="base_stats">
                <div className="stat_container">
                  <p>HP</p>
                  <p>{singlePoke.stats[0].base_stat}</p>
                </div>
                <div className="stat_container">
                  <p>Atk</p>
                  <p>{singlePoke.stats[1].base_stat}</p>
                </div>
                <div className="stat_container">
                  <p>Def</p>
                  <p>{singlePoke.stats[2].base_stat}</p>
                </div>
                <div className="stat_container">
                  <p>Sp.Atk</p>
                  <p>{singlePoke.stats[3].base_stat}</p>
                </div>
                <div className="stat_container">
                  <p>Sp.Def</p>
                  <p>{singlePoke.stats[4].base_stat}</p>
                </div>
                <div className="stat_container">
                  <p>Speed</p>
                  <p>{singlePoke.stats[5].base_stat}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
