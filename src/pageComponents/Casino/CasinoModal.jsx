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
  resetSplice = () => {
    this.setState({
      splice: 30,
    });
  };

  handleShowFilters = () => {
    this.setState({
      showFilters: !this.state.showFilters,
    });
  };

  render() {
    const numberOfGamesCategory = this.props.allGames
      .flat()
      .filter((slot) =>
        Object.keys(slot.categories || {}).includes(this.props.modalCategories.map((item) => item.id).toString()),
      );

    const FilteredGames = Object.values(this.props.modalFilters || {})
      .map((item) => item.slots)
      .flat();
    const Providers = Object.values(this.props.casinoData?.result?.providers || {});
    const Categories = Object.values(this.props.casinoData?.result?.categories || {});
    const numberOfGames = this.props.allGames
      .flat()
      .filter((slot) => Object.keys(slot.categories || {}))
      .filter((val) => {
        if (this.state.searchFilter === "") {
          return val;
        } else if (val.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())) {
          return val;
        } else return val;
      })
      .slice(0, this.state.splice);

    if (this.props.toggleModal) {
      return (
        <div
          onClick={() => {
            this.props.handleModalToggle();
            this.props.falseFav();
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
                  {this.props.modalFilters.length > 0 || this.props.modalCategories.length > 0 ? (
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
                      {this.props.modalCategories.map((item, index) => {
                        return (
                          <span
                            onClick={() => {
                              this.props.removeModalCategory(item);
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
                {!this.props.favPopUp &&
                this.props.modalFilters.length === 0 &&
                this.props.modalCategories?.length === 0 ? (
                  <>
                    {this.props.allGames
                      .flat()
                      .filter((slot) => Object.keys(slot.categories || {}))
                      .filter((val) => {
                        if (this.state.searchFilter === "") {
                          return val;
                        } else if (val.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())) {
                          return val;
                        } else return val;
                      })
                      .slice(0, this.state.splice)
                      .map((item, index) => {
                        return (
                          <>
                            <div className="gameContainer animate__animated animate__fadeIn" key={index}>
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
                ) : this.props.favPopUp ? (
                  this.props.favorites
                    .filter((val) => {
                      if (this.state.searchFilter === "") {
                        return val;
                      } else if (val.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())) {
                        return val;
                      } else return val;
                    })
                    .map((item, index) => {
                      return (
                        <>
                          <div className="gameContainer animate__animated animate__fadeIn" key={index}>
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
                        </>
                      );
                    })
                ) : this.props.modalFilters.length > 0 ? (
                  <>
                    {FilteredGames.splice(0, this.state.splice)
                      .filter((val) => {
                        if (this.state.searchFilter === "") {
                          return val;
                        } else if (val.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())) {
                          return val;
                        } else return val;
                      })
                      .map((item, index) => {
                        return (
                          <>
                            <div className="gameContainer animate__animated animate__fadeIn" key={index}>
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

                    {FilteredGames.length < 30 ? null : (
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
                  <>
                    {this.props.allGames
                      .flat()
                      .filter((slot) =>
                        Object.keys(slot.categories || {}).includes(
                          this.props.modalCategories.map((item) => item.id).toString(),
                        ),
                      )
                      .splice(0, this.state.splice)
                      .filter((val) => {
                        if (this.state.searchFilter === "") {
                          return val;
                        } else if (val.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())) {
                          return val;
                        } else return val;
                      })
                      .map((item, index) => {
                        return (
                          <>
                            <div className="gameContainer animate__animated animate__fadeIn" key={index}>
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
                    {numberOfGamesCategory.length < 30 ? null : (
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
                )}
              </div>
              {this.state.showFilters ? (
                <div className="right animate__animated animate__backInRight">
                  <h2>
                    Providers
                    {this.props.modalFilters.length > 0 || this.props.modalCategories.length > 0 ? (
                      <button
                        onClick={() => {
                          this.props.clearModalFilters();
                        }}
                      >
                        Clear Filters!
                      </button>
                    ) : null}
                  </h2>
                  <div className="providersWrapper">
                    {Providers.map((item, index) => {
                      return (
                        <span
                          className={this.props.modalFilters.includes(item) ? "active" : null}
                          key={index}
                          onClick={() => {
                            this.resetSplice();
                            this.props.modalFilters.includes(item)
                              ? this.props.removeModalFilters(item)
                              : this.props.addModalFilters(item);
                          }}
                        >
                          {item.name}
                        </span>
                      );
                    })}
                  </div>
                  <h2>Categories</h2>
                  <div className="providersWrapper">
                    {Categories.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className={this.props.modalCategories.includes(item) ? "active" : null}
                          // onClick={() => {
                          //   this.props.toggleActive(item);
                          // }}

                          onClick={() => {
                            this.props.modalCategories.includes(item)
                              ? this.props.removeModalCategory(item)
                              : this.props.addModalCategory(item);
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
