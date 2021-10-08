import React, { useState, useEffect } from "react";
import "./Games.scss";

function GamesWithActive({
  allGames,
  active,
  addFavoritedSlot,
  fav,
  favorites,
  removeFavoritedSlot,
  toggleActiveFav,
  activeFav,
}) {
  const [splice, setSplice] = useState(12);

  const handleSplice = () => {
    setSplice(splice + 10);
  };
  useEffect(() => {
    setSplice(12);
  }, [active.id]);
  const numberOfGames = allGames
    .flat()
    .filter((slot) => Object.keys(slot.categories || {}).includes(active.id.toString()));

  return (
    <>
      {!fav ? (
        <div className="category content-m">
          <div className="category-title">
            <span>{active.name}</span>
          </div>
          <div className="category-games">
            {allGames
              .flat()
              .filter((slot) => Object.keys(slot.categories || {}).includes(active.id.toString()))
              .slice(0, splice)
              .map((item, index) => {
                return (
                  <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                    <div className="imageContainer">
                      <img src={item.logo} alt="" />
                      <div className="hover">
                        <i className="fas fa-play-circle fa-3x"></i>
                      </div>
                    </div>
                    <div>
                      <span>"{item.name}"</span>
                      <i
                        onClick={() => {
                          toggleActiveFav(item);
                          addFavoritedSlot(item);
                        }}
                        className="fal fa-heart"
                        className={activeFav.id === item.id ? "active fal fa-heart" : "fal fa-heart"}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                );
              })}
          </div>
          {numberOfGames.length > splice ? (
            <button className="loadMore" onClick={handleSplice}>
              <i className="fal fa-sync-alt"></i>
              <span>Load More</span>
            </button>
          ) : null}
        </div>
      ) : (
        <div className="category content-m">
          <div className="category-title">
            <span>Favorites</span>
          </div>
          <div className="category-games">
            {favorites.map((item) => {
              return (
                <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                  <div className="imageContainer">
                    <img src={item.logo} alt="" />
                    <div className="hover">
                      <i className="fas fa-play-circle fa-3x"></i>
                    </div>
                  </div>
                  <div>
                    <span>"{item.name}"</span>
                    <i
                      onClick={() => {
                        removeFavoritedSlot(item);
                      }}
                      className="fal fa-heart"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {numberOfGames.length > splice ? (
            <button className="loadMore" onClick={handleSplice}>
              <i className="fal fa-sync-alt"></i>
              <span>Load More</span>
            </button>
          ) : null}
        </div>
      )}
    </>
  );
}

export default GamesWithActive;
