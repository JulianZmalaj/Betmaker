import React, { Component } from "react";
import "./Games.scss";

export default class CasinoModal extends Component {
  render() {
    if (this.props.toggleModal) {
      return (
        <div className="casinoSearch">
          <div
            className={
              this.props.toggleModal
                ? "wrapper animate__animated animate__zoomInRight"
                : "wrapper animate__animated animate__zoomOutLeft"
            }
          >
            <div className="casinoSearch--top">
              <i className="fal fa-search"></i>
              <input type="text" placeholder="Search for a game" value=""></input>
              <button className="filters__btn">
                Filters
                <i className="fas fa-bars"></i>
              </button>
              <div className="count">0</div>
              <i
                onClick={() => {
                  this.props.handleModalToggle();
                }}
                className="fa fa-times close"
              ></i>
            </div>
            <div className="casinoSearch--inner">
              <div className="left">
                <div className="filterResults">
                  <div className="topCat">
                    <span className="active">Search Result</span>
                    <span className="">Recently Played(0)</span>
                    <span className="">Preferiti(0)</span>
                  </div>
                </div>

                {this.props.allGames
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
                              this.props.addFavoritedSlot(item);
                            }}
                            className={this.props.favorites.includes(item) ? "active fal fa-heart" : "fal fa-heart"}
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
              <div className="right"></div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
