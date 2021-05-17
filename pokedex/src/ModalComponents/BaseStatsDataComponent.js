import React from "react";

const BaseStatsDataComponent = ({ singlePoke }) => {
  return (
    <>
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
    </>
  );
};

export default BaseStatsDataComponent;
