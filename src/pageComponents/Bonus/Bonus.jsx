import React, { useState, useEffect } from "react";

function Bonus() {
  const [bonusData, setBonusData] = useState({});
  const url = "https://backoffice.playlogiq.com/JektissBet/promotions?lang=en";

  const [bonusTree, setBonusTree] = useState({});

  const toggleTree = () => {
    setBonusTree(!bonusTree);
  };

  const fetchApi = async () => {
    try {
      const response = await fetch(url);
      const bonusData = await response.json();
      setBonusData(bonusData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const Promotions = bonusData?.promotions || [];
  console.log("boonusssat", Promotions);

  return (
    <>
      <div className="content-m">
        <div className="sub-navigation">
          <div>
            <a href="#/prematch/home">Sport Home</a>
            <a href="#/prematch/daily">Daily Events</a>
            <a href="#/prematch/all">All Events</a>
            <a href="#/live">In Play Calendar</a>
          </div>
          <div>
            <i className="glyphicons glyphicons-circle-question-mark " aria-hidden="true"></i>
            <span>Help</span>
          </div>
        </div>
        <div className="pages-main-content">
          <div className="pages-left-menu">
            {Promotions.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    toggleTree();
                  }}
                  className="promotions-categories"
                >
                  <div className="dot-style"></div>
                  <h3>{item.name}</h3>
                  {bonusTree ? (
                    <div className="promotions-subcategories subSportNavEnter">
                      <h4>
                        {item.posts.length > 0
                          ? item.posts.map((postItem) => {
                              return (
                                <div className="promotions-subcategories subSportNavEnter">
                                  <div className="dot-style"></div>
                                  <h4>{postItem.title}</h4>
                                </div>
                              );
                            })
                          : null}
                      </h4>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="pages-right">
            <div className="promo-page-single-content">
              <p>
                <img
                  src="https://content.playlogiq.com/storage/posts/September2020/1zbDT4B3WKTnChpUFvqg.jpg"
                  alt="Bonus"
                />
              </p>
              <div className="promo-banner-content">
                <h2>Crazy Hour Bonus</h2>
                <h4>17:30 - 18: 30</h4>
                <a href="/">Read More</a>
              </div>
              <h1>Crazy Hour Bonus</h1>
            </div>
            <div className="promo-page-single-content">
              <p>
                <img
                  src="https://content.playlogiq.com/storage/posts/September2020/1zbDT4B3WKTnChpUFvqg.jpg"
                  alt="Bonus"
                />
              </p>
              <div className="promo-banner-content">
                <h2>Dive into Summer </h2>
                <h4>3,000 EUR Prize Pool!</h4>
                <a href="/">Read More</a>
              </div>
              <h1>Dive into Summer </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bonus;
