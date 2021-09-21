import React, { useRef } from 'react'
import './Games.scss'
import Slider from "react-slick";

function SimpleSlider({ slideref, allGames }) {


    const settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        arrows: false,
        variableWidth: true,


    };

    return (

        <Slider {...settings} ref={slideref}>
            {
                allGames.flat().filter((slot) => Object.keys(slot.categories || {}).includes('55')).map((item, index) => {
                    return <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                        <div className="imageContainer">
                            <img src={item.logo} alt="" />
                            <div className="hover">
                                <i className="fas fa-play-circle fa-3x"></i>
                            </div>
                        </div>
                        <div>
                            <span>{item.name}</span>
                            <i className="fal fa-heart" aria-hidden="true"></i>
                        </div>
                    </div>
                })
            }
        </Slider>

    );
}



function Games({ casinoData }) {

    const slideref = useRef({})
    const allGames = Object.values(casinoData?.result?.providers || {}).map((provider) => provider.slots)

    console.log('allgames', allGames.flat());
    return (
        <>
            <div className=" popular content-m ">
                <div className="popular-title">
                    <span>Popular</span>
                    <button>
                        Show all
                    <i className="fal fa-chevron-right"></i>
                    </button>
                </div >
                <div className="popular--games">
                    {
                        (allGames.flat() || []).filter((slot) => {

                            return Object.keys(slot.categories || {}).includes('41') ? true : false
                        }).map((item) => {



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
                                        <i className="fal fa-heart" aria-hidden="true"></i>
                                    </div>

                                </div>


                            )
                        })

                    }
                </div >
            </div >
            <div className="waveWrapper content-m">
                <svg width="100%" viewBox="0 0 1440 260"><path className="wave-bg" fillOpacity="1" d="M0,128L80,112C160,96,320,64,480,74.7C640,85,800,139,960,149.3C1120,160,1280,128,1360,112L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            </div>
            <div className="gameSlider tournaments content-m">
                <div className="gameSlider--title">
                    <i className="fal fa-fire"></i>
                    <span>Tournaments</span>
                    <div>
                        <i onClick={slideref.current.slickPrev} className="far fa-chevron-left"></i>
                        <i onClick={slideref.current.slickNext} className="far fa-chevron-right"></i>
                    </div>
                </div>
                <div className="gameSlider--games">
                    <SimpleSlider allGames={allGames} slideref={slideref} ></SimpleSlider>
                </div>
            </div>

            <div className="category content-m">
                <div className="category-title">
                    <span>New Entry</span>
                    <button>Show All</button>
                </div>
                <div className="category-games">
                    {
                        allGames.flat().filter((slot) => Object.keys(slot.categories || {}).includes('50')).map((item, index) => {
                            return <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                                <div className="imageContainer">
                                    <img src={item.logo} alt="" />
                                    <div className="hover">
                                        <i className="fas fa-play-circle fa-3x"></i>
                                    </div>
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                    <i className="fal fa-heart" aria-hidden="true"></i>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="category content-m">
                <div className="category-title">
                    <span>Hot Games</span>
                    <button>Show All</button>
                </div>
                <div className="category-games">
                    {
                        allGames.flat().filter((slot) => Object.keys(slot.categories || {}).includes('8')).map((item, index) => {
                            return <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                                <div className="imageContainer">
                                    <img src={item.logo} alt="" />
                                    <div className="hover">
                                        <i className="fas fa-play-circle fa-3x"></i>
                                    </div>
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                    <i className="fal fa-heart" aria-hidden="true"></i>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="category content-m">
                <div className="category-title">
                    <span>Megaways</span>
                    <button>Show All</button>
                </div>
                <div className="category-games">
                    {
                        allGames.flat().filter((slot) => Object.keys(slot.categories || {}).includes('40')).splice(0, 12).map((item, index) => {
                            return <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                                <div className="imageContainer">
                                    <img src={item.logo} alt="" />
                                    <div className="hover">
                                        <i className="fas fa-play-circle fa-3x"></i>
                                    </div>
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                    <i className="fal fa-heart" aria-hidden="true"></i>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="category content-m">
                <div className="category-title">
                    <span>Instant Games</span>
                    <button>Show All</button>
                </div>
                <div className="category-games">
                    {
                        allGames.flat().filter((slot) => Object.keys(slot.categories || {}).includes('63')).map((item, index) => {
                            return <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                                <div className="imageContainer">
                                    <img src={item.logo} alt="" />
                                    <div className="hover">
                                        <i className="fas fa-play-circle fa-3x"></i>
                                    </div>
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                    <i className="fal fa-heart" aria-hidden="true"></i>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="category content-m">
                <div className="category-title">
                    <span>Live Casino</span>
                    <button>Show All</button>
                </div>
                <div className="category-games">
                    {
                        allGames.flat().filter((slot) => Object.keys(slot.categories || {}).includes('9')).map((item, index) => {
                            return <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                                <div className="imageContainer">
                                    <img src={item.logo} alt="" />
                                    <div className="hover">
                                        <i className="fas fa-play-circle fa-3x"></i>
                                    </div>
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                    <i className="fal fa-heart" aria-hidden="true"></i>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="category content-m">
                <div className="category-title">
                    <span>Table Games</span>
                    <button>Show All</button>
                </div>
                <div className="category-games">
                    {
                        allGames.flat().filter((slot) => Object.keys(slot.categories || {}).includes('28')).map((item, index) => {
                            return <div className="gameContainer animate__animated animate__fadeIn" key={item.id}>
                                <div className="imageContainer">
                                    <img src={item.logo} alt="" />
                                    <div className="hover">
                                        <i className="fas fa-play-circle fa-3x"></i>
                                    </div>
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                    <i className="fal fa-heart" aria-hidden="true"></i>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>

    )
}

export default Games
