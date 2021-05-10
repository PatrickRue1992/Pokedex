import React from "react";
import "./Styles/Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import typeColors from "./util/typeColors";

function Modal({ closeModal, singlePoke }) {
  return (
    <>
      <div className="modalContainer">
        <header>
          <i className="closeIcon" onClick={closeModal}>
            <AiOutlineClose size={60} />
          </i>
        </header>
        <div className="ModalContent">
          <div
            className="picContainer"
            style={{
              background: `linear-gradient(${
                typeColors[singlePoke.types[0].type.name]
              }, #FFFFFF)`,
            }}
          >
            <div className="id">
              <p>#0{singlePoke.id}</p>
            </div>
            <img
              src={singlePoke.sprites.other["official-artwork"].front_default}
              alt=""
            />
            <div className="pokeName">
              <p>{singlePoke.name}</p>
            </div>
          </div>
          <p>MODAL</p>
          <p>NAME</p>
        </div>
      </div>
    </>
  );
}

export default Modal;
