import React, { useState, useEffect } from "react";
import "../Casino/Casino.scss";
import Slider from "react-slick";
import "../../components/Header.scss";
import FilterCasino from "../Casino/FilterCasino.jsx";
import AllGames from "./AllGamesVirtual.jsx";
import LoadingCasino from "../../components/Loading.jsx";
import GamesWithActive from "../Casino/GamesWithActive";
import CasinoModal from "../Casino/CasinoModal";

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
  const [loadingCasino, setLoadingCasino] = useState(true);
  const [fav, setFav] = useState(false);
  const [favPopUp, setfavPopUp] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalFilters, setModalFilters] = useState([]);
  const [modalCategories, setModalCategories] = useState([]);
  const [sortActive, setSortActive] = useState("99");

  const toggleSortActive = (item) => {
    setSortActive(item.toString());
  };

  const addModalCategory = (item) => {
    const newModalCategoriesList = [...modalCategories, item];
    let uniqueList = [...new Set(newModalCategoriesList)];
    setModalCategories(uniqueList);
  };

  const removeModalCategory = (item) => {
    const newModalCategoriesList = modalCategories.filter((filter) => {
      return filter.id !== item.id;
    });

    setModalCategories(newModalCategoriesList);
  };
  const addModalFilters = (item) => {
    const newModalFiltersList = [...modalFilters, item];
    let uniqueList = [...new Set(newModalFiltersList)];
    setModalFilters(uniqueList);
  };

  const removeModalFilters = (item) => {
    const newModalFiltersList = modalFilters.filter((filter) => {
      return filter.id !== item.id;
    });

    setModalFilters(newModalFiltersList);
  };

  const handleModalToggle = () => {
    setToggleModal(!toggleModal);
  };

  const handleFav = () => {
    setFav(true);
    setfavPopUp(true);
  };
  const falseFav = () => {
    setFav(false);
    setfavPopUp(false);
  };

  const allGames = Object.values(casinoData?.result?.providers || {}).map((provider) => provider.slots);

  const toggleActive = (item) => {
    setActive(item);
  };

  const url = "https://testoffice.playlogiq.com/betbuq/get_slots/virtual?platform=web&img=safari";

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

  useEffect(() => {
    const favoritedSlots = JSON.parse(localStorage.getItem("favorited-slots"));

    favoritedSlots?.length > 0 && setFavorites(favoritedSlots);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("favorited-slots", JSON.stringify(items));
  };

  const clearModalFilters = (item) => {
    const newModalFiltersList = [];
    const newModalCategories = [];

    setModalFilters(newModalFiltersList);
    setModalCategories(newModalCategories);
  };

  const addFavoritedSlot = (item) => {
    const newFavoritedList = [...favorites, item];
    let uniqueList = [...new Set(newFavoritedList)];
    setFavorites(uniqueList);
    saveToLocalStorage(newFavoritedList);
  };

  const removeFavoritedSlot = (item) => {
    const newFavoritedList = favorites.filter((favorite) => {
      return favorite.id !== item.id;
    });

    setFavorites(newFavoritedList);
    saveToLocalStorage(newFavoritedList);
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
        <CasinoModal
          clearModalFilters={clearModalFilters}
          removeModalCategory={removeModalCategory}
          addModalCategory={addModalCategory}
          modalCategories={modalCategories}
          toggleActive={toggleActive}
          modalFilters={modalFilters}
          removeModalFilters={removeModalFilters}
          addModalFilters={addModalFilters}
          favPopUp={favPopUp}
          favorites={favorites}
          addFavoritedSlot={addFavoritedSlot}
          removeFavoritedSlot={removeFavoritedSlot}
          allGames={allGames}
          active={active}
          handleModalToggle={handleModalToggle}
          toggleModal={toggleModal}
          casinoData={casinoData}
          handleFav={handleFav}
          falseFav={falseFav}
        />
        <SimpleSlider sliders={sliders} />

        <FilterCasino
          falseFav={falseFav}
          handleFav={handleFav}
          toggleActive={toggleActive}
          active={active}
          casinoData={casinoData}
          handleModalToggle={handleModalToggle}
        />
        {active.id === 231 ? (
          <AllGames
            active={active}
            removeFavoritedSlot={removeFavoritedSlot}
            addFavoritedSlot={addFavoritedSlot}
            toggleActive={toggleActive}
            allGames={allGames}
            casinoData={casinoData}
            favorites={favorites}
          />
        ) : (
          <GamesWithActive
            toggleSortActive={toggleSortActive}
            sortActive={sortActive}
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
