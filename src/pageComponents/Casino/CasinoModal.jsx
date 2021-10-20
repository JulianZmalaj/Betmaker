import React, { Component } from "react";
import "./Games.scss";

export default class CasinoModal extends Component {
  render() {
    const Providers = Object.values(this.props.casinoData?.result?.providers || {});
    const Categories = Object.values(this.props.casinoData?.result?.categories || {});

    if (this.props.toggleModal) {
      return (
        <div className="casinoSearch">
          <div className="wrapper animate__animated animate__zoomInRight">
            <div className="casinoSearch--top">
              <i className="fal fa-search"></i>
              <input type="text" placeholder="Search for a game" onChange={() => {}}></input>
              <button className="filters__btn">
                Filters
                <i className="fas fa-bars"></i>
              </button>
              <div className="count">0</div>
              <i
                onClick={() => {
                  this.props.handleModalToggle();
                  this.props.falseFav();
                }}
                className="fa fa-times close"
              ></i>
            </div>
            <div className="casinoSearch--inner">
              <div className="left">
                <div className="filterResults">
                  <div className="topCat">
                    <span
                      onClick={() => {
                        this.props.falseFav();
                      }}
                      className={!this.props.favPopUp ? "active" : ""}
                    >
                      Search Result
                    </span>
                    <span
                      className={this.props.favPopUp ? "active" : ""}
                      onClick={() => {
                        this.props.handleFav();
                      }}
                    >
                      Preferiti({this.props.favorites.length})
                    </span>
                  </div>
                </div>
                {!this.props.favPopUp
                  ? this.props.allGames
                      .flat()
                      .filter((slot) => Object.keys(slot.categories || {}).includes("24"))
                      .slice(0, 31)
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
                              <span>{item.name}</span>
                              <i
                                onClick={() => {
                                  this.props.favorites.includes(item)
                                    ? this.props.removeFavoritedSlot(item)
                                    : this.props.addFavoritedSlot(item);
                                }}
                                className={
                                  this.props.favorites.includes(item)
                                    ? "active fal fa-heart animate__animated animate__tada"
                                    : "fal fa-heart"
                                }
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        );
                      })
                  : this.props.favorites.map((item) => {
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
                                this.props.removeFavoritedSlot(item);
                              }}
                              className={
                                this.props.favorites.includes(item)
                                  ? "active fal fa-heart animate__animated animate__tada"
                                  : "fal fa-heart"
                              }
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      );
                    })}

                {/* {numberOfGames.length > this.props.splice ? (
                      <button className="loadMore" onClick={}>
                        <i className="fal fa-sync-alt"></i>
                        <span>Load More</span>
                      </button>
                    ) : null}  */}
              </div>
              <div className="right">
                <h2>Providers</h2>
                <div className="providersWrapper">
                  {Providers.map((item) => {
                    return <span>{item.name}</span>;
                  })}
                </div>
                <h2>Categories</h2>
                <div className="providersWrapper">
                  {Categories.map((item) => {
                    return <span>{item.name}</span>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
