import React, { Component } from "react";
import "./Games.scss";

export default class CasinoModal extends Component {
  state = {
    showFilters: true,
    splice: 30,
    searchFilter: "",
    providerActive: [],
  };

  raiseSplice = () => {
    this.setState({
      splice: this.state.splice + 20,
    });
  };

  handleShowFilters = () => {
    this.setState({
      showFilters: !this.state.showFilters,
    });
  };

  render() {
    const Providers = Object.values(this.props.casinoData?.result?.providers || {});
    const Categories = Object.values(this.props.casinoData?.result?.categories || {});
    const numberOfGames = this.props.allGames
      .flat()
      .filter((slot) => Object.keys(slot.categories || {}))
      .filter((val) => {
        if (this.state.searchFilter == "") {
          return val;
        } else if (val.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())) {
          return val;
        }
      })
      .slice(0, this.state.splice);

    console.log(numberOfGames.length);

    if (this.props.toggleModal) {
      return (
        <div
          onClick={() => {
            this.props.handleModalToggle();
          }}
          className="casinoSearch"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="wrapper animate__animated animate__zoomInRight"
          >
            <div className="casinoSearch--top">
              <i className="fal fa-search"></i>
              <input
                type="text"
                placeholder="Search for a game"
                onChange={(e) => {
                  this.setState({
                    searchFilter: e.target.value,
                  });
                }}
              ></input>
              <button
                onClick={() => {
                  this.handleShowFilters();
                }}
                className="filters__btn"
              >
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
                  {this.props.modalFilters.length > 0 ? (
                    <div className="bottCat">
                      {this.props.modalFilters.map((item, index) => {
                        return (
                          <span
                            onClick={() => {
                              this.props.removeModalFilters(item);
                            }}
                            key={index}
                            className="animate__animated animate__fadeInUp"
                          >
                            {item.name}
                            <i className="fal fa-times-circle"></i>
                          </span>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
                {!this.props.favPopUp ? (
                  <>
                    {this.props.allGames
                      .flat()
                      .filter((slot) => Object.keys(slot.categories || {}))
                      .filter((val) => {
                        if (this.state.searchFilter == "") {
                          return val;
                        } else if (val.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())) {
                          return val;
                        }
                      })
                      .slice(0, this.state.splice)
                      .map((item, index) => {
                        return (
                          <>
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
                          </>
                        );
                      })}
                    {numberOfGames.length < 30 ? null : (
                      <button
                        onClick={() => {
                          this.raiseSplice();
                        }}
                        className="loadMore"
                      >
                        <i className="fal fa-sync-alt"></i>
                        <span>Load More</span>
                      </button>
                    )}
                  </>
                ) : (
                  this.props.favorites.map((item) => {
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
                  })
                )}
              </div>
              {this.state.showFilters ? (
                <div className="right animate__animated animate__backInRight">
                  <h2>Providers</h2>
                  <div className="providersWrapper">
                    {Providers.map((item, index) => {
                      return (
                        <span
                          className={this.state.providerActive.includes(item) ? "active" : null}
                          key={index}
                          onClick={() => {
                            this.props.addModalFilters(item);
                          }}
                        >
                          {item.name}
                        </span>
                      );
                    })}
                  </div>
                  <h2>Categories</h2>
                  <div className="providersWrapper">
                    {Categories.map((item) => {
                      return (
                        <span
                          className={this.state.providerActive.includes(item) ? "active" : null}
                          onClick={() => {
                            this.setState({
                              providerActive: item,
                            });
                            this.props.addModalFilters(item);
                          }}
                        >
                          {item.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
