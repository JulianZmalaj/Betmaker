import React, { useRef } from "react";
import "../Casino/Games.scss";
import Slider from "react-slick";

function SimpleSlider({ slideref, allGames, addFavoritedSlot, favorites, removeFavoritedSlot }) {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    arrows: false,
    variableWidth: true,
  };
  return (
    <Slider favorites={favorites} {...settings} ref={slideref}>
      {allGames
        .flat()
        .filter((slot) => Object.keys(slot.categories || {}).includes("45"))
        .map((item) => {
          return (
            <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
              <div className="imageContainer">
                <img src={item.desktop_logo} alt="" />
                <div className="hover">
                  <i className="fas fa-play-circle fa-3x"></i>
                </div>
              </div>
              <div>
                <span>{item.name}</span>
                <i
                  onClick={() => {
                    favorites.includes(item) ? removeFavoritedSlot(item) : addFavoritedSlot(item);
                  }}
                  className={
                    favorites.includes(item) ? "active fal fa-heart animate__animated animate__tada" : "fal fa-heart"
                  }
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          );
        })}
    </Slider>
  );
}

function ProvidersSlider({ provider_slideref, casinoData, favorites }) {
  const settings2 = {
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    dots: false,
  };
  const Providers = Object.values(casinoData?.result?.providers || {});

  return (
    <Slider favorites={favorites} {...settings2} ref={provider_slideref}>
      {Providers.map((provider, index) => {
        return (
          <div key={index}>
            <div className="providerContainer">
              <img src={provider.provider_logo} alt={provider.name} />
              <div className="providerContainer--bottom">
                <div>
                  <span>{provider.name}</span>
                  <span>Explore {provider.name} !</span>
                </div>
                <button>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}

function Games({ toggleActive, allGames, casinoData, addFavoritedSlot, favorites, fav, removeFavoritedSlot }) {
  const slideref = useRef({});
  const provider_slideref = useRef({});

  const Providers = Object.values(casinoData?.result?.categories || {});

  return !fav ? (
    <>
      <div className="gameSlider tournaments content-m">
        <div className="gameSlider--title">
          <i className="fal fa-star"></i>
          <span>Top Games</span>
          <div>
            <i onClick={slideref.current.slickPrev} className="far fa-chevron-left"></i>
            <i onClick={slideref.current.slickNext} className="far fa-chevron-right"></i>
          </div>
        </div>
        <div className="gameSlider--games">
          <SimpleSlider
            favorites={favorites}
            addFavoritedSlot={addFavoritedSlot}
            allGames={allGames}
            slideref={slideref}
            removeFavoritedSlot={removeFavoritedSlot}
          ></SimpleSlider>
        </div>
      </div>
      {Providers.map((item, index) => {
        if (item.id !== 45) {
          return (
            <div key={index} className="category content-m">
              <div className="category-title">
                <span>{item.name}</span>
                <button
                  onClick={() => {
                    window.scrollTo(0, 400);
                    toggleActive({
                      id: item.id,
                      name: item.name,
                    });
                  }}
                >
                  Show All
                </button>
              </div>
              <div className="category-games">
                {allGames
                  .flat()
                  .filter((slot) => Object.keys(slot.categories || {}).includes(item.id.toString()))
                  .splice(0, 12)
                  .map((item, index) => {
                    return (
                      <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                        <div className="imageContainer">
                          <img src={item.desktop_logo} alt="" />
                          <div className="hover">
                            <i className="fas fa-play-circle fa-3x"></i>
                          </div>
                        </div>
                        <div>
                          <span>{item.name}</span>
                          <i
                            onClick={() => {
                              favorites.includes(item) ? removeFavoritedSlot(item) : addFavoritedSlot(item);
                            }}
                            className={
                              favorites.includes(item)
                                ? "active fal fa-heart animate__animated animate__tada"
                                : "fal fa-heart"
                            }
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}

      <div className="gameSlider providers content-m">
        <div className="gameSlider--title">
          <i className="fal fa-cubes"></i>
          <span>
            Game Providers <i>Only the most awesome games</i>
          </span>
          <div>
            <i onClick={provider_slideref.current.slickPrev} className="far fa-chevron-left"></i>
            <i onClick={provider_slideref.current.slickNext} className="far fa-chevron-right"></i>
          </div>
        </div>
        <div className="gameSlider--games">
          <ProvidersSlider casinoData={casinoData} provider_slideref={provider_slideref}></ProvidersSlider>
        </div>
      </div>
    </>
  ) : null;
}

export default Games;
