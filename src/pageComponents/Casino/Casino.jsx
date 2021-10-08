import React, { useState, useEffect } from "react";
import "./Casino.scss";
import Slider from "react-slick";
import "../../components/Header.scss";
import FilterCasino from "./FilterCasino.jsx";
import Games from "./Games.jsx";
import LoadingCasino from "../../components/Loading.jsx";
import GamesWithActive from "./GamesWithActive";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
};

function SimpleSlider({ sliders }) {
  return (
    <Slider {...settings}>
      {(sliders || []).map((item, id) => {
        return (
          <div key={id}>
            <img src={"https://content.playlogiq.com/" + item.image_url} alt={item.order} />
          </div>
        );
      })}
    </Slider>
  );
}

function Casino({ sliders }) {
  const [casinoData, setCasinoData] = useState({});
  const [active, setActive] = useState({ id: 231 });
  const [activeFav, setActiveFav] = useState([]);
  const [loadingCasino, setLoadingCasino] = useState(true);
  const [fav, setFav] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleFav = () => {
    setFav(true);
  };
  const falseFav = () => {
    setFav(false);
  };

  const allGames = Object.values(casinoData?.result?.providers || {}).map((provider) => provider.slots);

  const toggleActive = (item) => {
    setActive(item);
  };
  console.log(activeFav);
  const toggleActiveFav = (item) => {
    const newFavoritedList = [...activeFav, item];
    setActiveFav(newFavoritedList);
  };

  const url = "https://testoffice.playlogiq.com/betbuq/get_slots/casino?platform=web&img=safari";

  const fetchApi = async () => {
    try {
      const response = await fetch(url);
      const casinoData = await response.json();
      setCasinoData(casinoData);
      setLoadingCasino(false);
    } catch (error) {
      setLoadingCasino(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const addFavoritedSlot = (item) => {
    const newFavoritedList = [...favorites, item];
    setFavorites(newFavoritedList);
  };
  const removeFavoritedSlot = (item) => {
    const newFavoritedList = favorites.filter((favorite) => {
      return favorite.id !== item.id;
    });

    setFavorites(newFavoritedList);
  };

  if (loadingCasino) {
    return (
      <main>
        <LoadingCasino />
      </main>
    );
  } else {
    return (
      <div className="casino">
        <div className="slider">
          <SimpleSlider sliders={sliders} />
        </div>
        <FilterCasino
          falseFav={falseFav}
          handleFav={handleFav}
          toggleActive={toggleActive}
          active={active}
          casinoData={casinoData}
        />
        {active.id == "231" ? (
          <Games toggleActive={toggleActive} allGames={allGames} casinoData={casinoData} />
        ) : (
          <GamesWithActive
            activeFav={activeFav}
            toggleActiveFav={toggleActiveFav}
            favorites={favorites}
            fav={fav}
            addFavoritedSlot={addFavoritedSlot}
            removeFavoritedSlot={removeFavoritedSlot}
            allGames={allGames}
            active={active}
          />
        )}
      </div>
    );
  }
}

export default Casino;
