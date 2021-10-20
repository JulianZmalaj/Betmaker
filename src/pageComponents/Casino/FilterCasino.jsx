import React from "react";
import "./Games.scss";

function FilterCasino({ toggleActive, active, casinoData, handleFav, falseFav, handleModalToggle }) {
  return (
    <div className="filters content-m">
      <div className="filters--categories">
        <div
          onClick={() => {
            handleFav();
            toggleActive({
              id: 233,
            });
          }}
          className={active.id === 233 ? "active" : null}
        >
          <i className="fa fa-heart"></i>
        </div>
        <span
          className={active.id === 231 ? "active" : null}
          onClick={() => {
            falseFav();
            toggleActive({
              id: 231,
            });
          }}
        >
          Tutti i giochi
        </span>
        {Object.values(casinoData?.result?.categories || {}).map((item, index) => {
          return (
            <span
              onClick={() => {
                falseFav();
                toggleActive(item);
              }}
              className={active.id === item.id ? "active" : null}
              key={item.id}
            >
              {item.name}
              <span className="FilterLabel">{item.label}</span>
            </span>
          );
        })}
      </div>
      <div
        onClick={() => {
          handleModalToggle();
        }}
        className="filters--search"
      >
        <>
          <div
            onClick={() => {
              falseFav();
            }}
          >
            <i className="fal fa-search"></i>
            <input type="text" placeholder="Search for a game" />
          </div>
          <button
            onClick={() => {
              falseFav();
            }}
          >
            Providers
            <i className="fa fa-line-columns"></i>
          </button>
        </>
      </div>
    </div>
  );
}

export default FilterCasino;
