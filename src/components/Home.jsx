import React from "react";
import Slider from "react-slick";
import "./Home.scss";
import "./Header.scss";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
};
function SimpleSlider({ sliders }) {
  return (
    <Slider {...settings}>
      {sliders.map((item, id) => {
        return (
          <div key={id}>
            <img src={"https://content.playlogiq.com/" + item.image_url} alt={item.order} />
          </div>
        );
      })}
    </Slider>
  );
}
export default function Home({ sliders, miniBanners }) {
  return (
    <>
      <div className="home-page">
        {<SimpleSlider sliders={sliders} />}
        <div className="content-main">
          <div className="sport-tabs">
            <div className="sportTabs--item">
              <i className="fal fa-futbol"></i>
              <h3>
                SportBook
                <span>Come and make your bet</span>
              </h3>
            </div>
            <div className="sportTabs--item">
              <i className="fal fa-comments"></i>

              <h3>
                Live Chat
                <span>Chat with us</span>
              </h3>
            </div>
            <div className="sportTabs--item">
              <i className="fal fa-clock"></i>
              <h3>
                Bet Now
                <span>Place your bet</span>
              </h3>
            </div>
          </div>
          <div className="mini-banners">
            {miniBanners.map((item, id) => {
              return (
                <div key={id} className="mini-banner-item">
                  <div className="miniBanner--title">{item.title}</div>
                  <div
                    style={{ backgroundImage: `url(${"https://content.playlogiq.com" + item.image_url})` }}
                    className="miniBanner--box first"
                  >
                    <div className="miniBanner--box__text">{item.subtitle}</div>
                    <button type="button">{item.btn_text}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
