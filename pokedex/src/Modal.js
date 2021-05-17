import React from "react";
import "./Styles/Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import typeColors from "./util/typeColors";
import LeftModalComponent from "./ModalComponents/LeftModalComponent";
import BiographyComponent from "./ModalComponents/BiographyComponent";
import TrainingDataComponent from "./ModalComponents/TrainingDataComponent";
import BaseStatsDataComponent from "./ModalComponents/BaseStatsDataComponent";
import EvolutionDataComponent from "./ModalComponents/EvolutionDataComponent";

function Modal({
  closeModal,
  singlePoke,
  singlePokeSpecies,
  singlePokeEvoChain,
}) {
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
          {/* left part Model */}
          <LeftModalComponent singlePoke={singlePoke} />

          {/* start mittlerer sector */}
          <div className="Biography">
            <p>Bio</p>
            {/* Biog */}
            <BiographyComponent
              singlePokeSpecies={singlePokeSpecies}
              singlePoke={singlePoke}
            />

            <TrainingDataComponent
              singlePoke={singlePoke}
              singlePokeSpecies={singlePokeSpecies}
            />
          </div>

          {/* Start rechter Part (evolution und base stats) */}
          <div className="rightPart">
            <EvolutionDataComponent singlePokeEvoChain={singlePokeEvoChain} />
            <BaseStatsDataComponent singlePoke={singlePoke} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
