import React, { useState, useEffect } from "react";
import "./Games.scss";

function GamesWithActive({
  allGames,
  active,
  addFavoritedSlot,
  fav,
  favorites,
  removeFavoritedSlot,
  toggleSortActive,
  sortActive,
}) {
  const [splice, setSplice] = useState(12);
  const handleSplice = () => {
    setSplice(splice + 12);
  };
  useEffect(() => {
    setSplice(18);
  }, [active.id]);

  const numberOfGames = allGames
    .flat()
    .filter((slot) => Object.keys(slot.categories || {}).includes(active.id.toString()));

  const activeSlots = allGames
    .flat()
    .filter((slot) => Object.keys(slot.categories || {}).includes(active.id.toString()))
    .slice(0, splice);

  const sortedSlotsName = allGames
    .flat()
    .filter((slot) => Object.keys(slot.categories || {}).includes(active.id.toString()))
    .slice(0, splice)
    .sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  const sortedSlotsId = allGames
    .flat()
    .filter((slot) => Object.keys(slot.categories || {}).includes(active.id.toString()))
    .slice(0, splice)
    .sort((a, b) => {
      return a.id - b.id;
    });

  return (
    <>
      {!fav ? (
        numberOfGames.length > 0 ? (
          <div className="category content-m">
            <div className="category-title">
              <span>{active.name}</span>
              <div className="sortDiv">
                <span
                  onClick={() => {
                    toggleSortActive(99);
                  }}
                >
                  Sort By
                </span>
                <span
                  onClick={() => {
                    toggleSortActive(1);
                  }}
                  className={sortActive.includes("1") ? "active" : ""}
                >
                  A-Z
                </span>
                <span
                  onClick={() => {
                    toggleSortActive(2);
                  }}
                  className={sortActive.includes("2") ? "active" : ""}
                >
                  Popularity
                </span>
                <span
                  onClick={() => {
                    toggleSortActive(99);
                  }}
                  className={sortActive.includes("3") ? "active" : ""}
                >
                  Provider
                </span>
              </div>
            </div>
            <div className="category-games">
              {sortActive.includes("1")
                ? sortedSlotsName.map((item, index) => {
                    return (
                      <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                        <div className="imageContainer">
                          <img src={item.desktop_logo} alt="" />
                          <div className="hover">
                            <i className="fas fa-play-circle fa-3x"></i>
                          </div>
                        </div>
                        <div>
                          <span>"{item.name}"</span>
                          <i
                            onClick={() => {
                              favorites.includes(item) ? removeFavoritedSlot(item) : addFavoritedSlot(item);
                            }}
                            className={
                              "fal fa-heart" +
                              (favorites.includes(item) ? " active  animate__animated animate__tada" : "")
                            }
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    );
                  })
                : sortActive.includes("99")
                ? activeSlots.map((item, index) => {
                    return (
                      <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                        <div className="imageContainer">
                          <img src={item.desktop_logo} alt="" />
                          <div className="hover">
                            <i className="fas fa-play-circle fa-3x"></i>
                          </div>
                        </div>
                        <div>
                          <span>"{item.name}"</span>
                          <i
                            onClick={() => {
                              favorites.includes(item) ? removeFavoritedSlot(item) : addFavoritedSlot(item);
                            }}
                            className={
                              "fal fa-heart" +
                              (favorites.includes(item) ? " active  animate__animated animate__tada" : "")
                            }
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    );
                  })
                : sortActive.includes("2")
                ? sortedSlotsId.map((item, index) => {
                    return (
                      <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                        <div className="imageContainer">
                          <img src={item.desktop_logo} alt="" />
                          <div className="hover">
                            <i className="fas fa-play-circle fa-3x"></i>
                          </div>
                        </div>
                        <div>
                          <span>"{item.name}"</span>
                          <i
                            onClick={() => {
                              favorites.includes(item) ? removeFavoritedSlot(item) : addFavoritedSlot(item);
                            }}
                            className={
                              "fal fa-heart" +
                              (favorites.includes(item) ? " active  animate__animated animate__tada" : "")
                            }
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    );
                  })
                : null}
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
              <span>There are no slots for this category </span>
            </div>
          </div>
        )
      ) : favorites.length > 0 ? (
        <div className="category content-m">
          <div className="category-title">
            <span>Favorites</span>
            <div className="sortDiv">
              <span
                onClick={() => {
                  toggleSortActive(5);
                }}
              >
                Sort By
              </span>
              <span
                onClick={() => {
                  toggleSortActive(1);
                }}
                className={sortActive.includes("1") ? "active" : ""}
              >
                A-Z
              </span>
              <span
                onClick={() => {
                  toggleSortActive(2);
                }}
                className={sortActive.includes("2") ? "active" : ""}
              >
                Popularity
              </span>
              <span
                onClick={() => {
                  toggleSortActive(3);
                }}
                className={sortActive.includes("3") ? "active" : ""}
              >
                Provider
              </span>
            </div>
          </div>
          <div className="category-games">
            {favorites.map((item) => {
              return (
                <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                  <div className="imageContainer">
                    <img src={item.desktop_logo} alt="" />
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
                      className={favorites.includes(item) ? "active fal fa-heart" : "fal fa-heart"}
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
            <span className="EmptyFavList">
              <i className="fas fa-exclamation-circle"></i>
              <span>Favorited list is Empty </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default GamesWithActive;
