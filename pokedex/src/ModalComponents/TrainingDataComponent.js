import React from "react";

const TrainingDataComponent = ({ singlePokeSpecies, singlePoke }) => {
  return (
    <>
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
    </>
  );
};

export default TrainingDataComponent;
