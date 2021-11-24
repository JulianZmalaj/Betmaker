import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../components/Header.scss";
import images from "../images";

class Header extends Component {
  state = {
    click: false,
    english: true,
    seconds: new Date().getSeconds(),
  };

  handleClick = () => {
    this.setState({
      click: !this.state.click,
    });
  };

  closeDropDown = () => {
    this.setState({
      click: false,
    });
  };
  makeEnglish = () => {
    this.setState({
      english: true,
    });
  };
  makeItalian = () => {
    this.setState({
      english: false,
    });
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        seconds: new Date().getSeconds(),
      });
    }, 1000);
  }

  render() {
    const { click, english, seconds } = this.state;

    return (
      <header>
        <div className="top-header">
          <div className="content-main">
            <div className="top-header--left">
              <form className="form-navbar" action="#">
                <div className="form-div">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <input type="text" placeholder={english ? "Username" : "Usernome"} />
                </div>
                <div className="form-div">
                  <i className="fa fa-key" aria-hidden="true"></i>
                  <input type="text" placeholder="Password" />
                </div>
                <span>?</span>
                <button type="submit">Login </button>
                <button type="button">{english ? "Register" : "Registra"}</button>
              </form>
            </div>
            <div className="top-header--right">
              <div className="support">
                <i className="fas fa-comments"></i>
                <p>{english ? "Support" : "Supporto"}</p>
              </div>
              <div className="socials">
                <a href="facebook.com">
                  <img src={images["facebook"]} alt="" />
                </a>
                <a href="instagram.com">
                  <img src={images["instagram"]} alt="" />
                </a>
              </div>
              <div className="language">
                <div>
                  <img src={english ? images["england"] : images["italy"]} alt="" />
                  <span>{english ? "EN" : "IT"}</span>

                  <i onClick={this.handleClick} className={click ? "fal fa-chevron-down" : "fal fa-chevron-up"}></i>
                </div>
                {click && (
                  <div className="dropDown">
                    <div
                      onClick={() => {
                        this.closeDropDown();
                        this.makeEnglish();
                      }}
                      className="dropDown-item"
                    >
                      <img src={images["england"]} alt="" />
                      English
                    </div>
                    <div
                      onClick={() => {
                        this.closeDropDown();
                        this.makeItalian();
                      }}
                      className="dropDown-item"
                    >
                      <img src={images["italy"]} alt="" />
                      Italiano
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <img src={images['img1']} alt="" /> */}
        <div className="bottom-header">
          <div className="content-main">
            <div className="logo">
              <Link to="/">
                <img src={images["logo"]} alt="" />
              </Link>
            </div>
            <div className="crazyHour">
              <img src={english ? images["crazyHour"] : images["oraBonus"]} alt="" />
              <div className="playtime">
                <span>{english ? "Play time starts in:" : "Il tempo di gioco inizia tra:"}</span>
                <div className="clock">
                  <div className="clock--h">
                    <span>H</span>
                    <span className="newSec">{new Date().getHours()}</span>
                  </div>
                  <div className="clock--m">
                    <span>M</span>
                    <span className="newSec">{new Date().getMinutes()}</span>
                  </div>
                  <div className="clock--s">
                    <span>S</span>
                    <span className="newSec">{seconds < 10 ? "0" + seconds : seconds}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="logo"></div>
            <nav>
              <p className="nav-item" to="/sport">
                Sport <span>{english ? "Coming Soon" : "Presto Online"}</span>
              </p>
              <p className="nav-item" to="/live">
                Livebetting <span>{english ? "Coming Soon" : "Presto Online"}</span>
              </p>
              <Link className="nav-item" to="/casino">
                Casino <span></span>
              </Link>
              <Link className="nav-item" to="/casino-live">
                {english ? "Casino live " : "Casinò dal vivo"}
              </Link>
              <Link className="nav-item" to="/virtual">
                Virutal games
              </Link>
              <Link className="nav-item" to="/bonus">
                Bonus <span>{english ? "New" : "Nuovo"}</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
