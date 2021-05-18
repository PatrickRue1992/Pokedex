import React from "react";

const EvolutionDataComponent = ({ singlePokeEvoChain, openModal }) => {
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

  return (
    <>
      <div className="evolutions">
        <p>Evolution</p>

        {/* evolution api anschauen und iterieren */}
        <div className="evo_container">
          <div className="evo_images">
            <div></div>
            {/* Every Pokemons first Stage is shown first */}
            <p className="evo_id">
              {basePokeTempId > 99
                ? `#${basePokeTempId}`
                : `#0${basePokeTempId}`}
            </p>
            <img
              className="evoo"
              onClick={openModal}
              data-id={basePokeTempId}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${basePokeTempId}.png`}
              alt=""
            />
            <p className="evo_name">{singlePokeEvoChain.chain.species.name}</p>
          </div>

          {/* dynamic Container, check if there is a first evolution, if yes, show it */}

          {singlePokeEvoChain.chain.evolves_to.length > 0 ? (
            <div className="evo_images">
              <p className="evo_id">
                {firstEvolTempId > 99
                  ? `#${firstEvolTempId}`
                  : `#0${firstEvolTempId}`}
              </p>
              <img
                className="evoo"
                data-id={firstEvolTempId}
                onClick={openModal}
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
              <p className="evo_id">
                {secondEvolTempId > 99
                  ? `#${secondEvolTempId}`
                  : `#0${secondEvolTempId}`}
              </p>
              <img
                className="evoo"
                data-id={secondEvolTempId}
                onClick={openModal}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${secondEvolTempId}.png`}
                alt=""
              />
              <p className="evo_name">
                {
                  singlePokeEvoChain.chain.evolves_to[0].evolves_to[0].species
                    .name
                }
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default EvolutionDataComponent;
