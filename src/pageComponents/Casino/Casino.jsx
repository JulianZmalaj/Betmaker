import React, { useState, useEffect } from 'react'
import './Casino.scss'
import Slider from "react-slick";
import '../../components/Header.scss'
import FilterCasino from './FilterCasino.jsx'
import Games from './Games.jsx'
import LoadingCasino from '../../components/Loading.jsx'



const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
}



function SimpleSlider({ sliders }) {


    return <Slider {...settings} >


        {(sliders || []).map((item, id) => {
            return (
                <div key={id}>
                    <img src={"https://content.playlogiq.com/" + item.image_url} alt={item.order} />
                </div>
            )

        })}
    </Slider>



}


function Casino({ sliders }) {

    const [casinoData, setCasinoData] = useState({})
    const [active, setActive] = useState("231");
    const [loadingCasino, setLoadingCasino] = useState(true)

    const toggleActive = (item) => {
        setActive(item);
    }


    const url = 'https://testoffice.playlogiq.com/betbuq/get_slots/casino?platform=web&img=safari'

    const fetchApi = async () => {
        try {
            const response = await fetch(url)
            const casinoData = await response.json()
            setCasinoData(casinoData)
            setLoadingCasino(false)

        } catch (error) {
            setLoadingCasino(false)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchApi()
    }, [])


    if (loadingCasino) {
        return (
            <main>
                <LoadingCasino />
            </main>
        )

    } else {
        return (
            <div className="casino">
                <div className="slider">
                    <SimpleSlider sliders={sliders} />
                </div>
                <FilterCasino toggleActive={toggleActive} active={active} casinoData={casinoData} />
                <Games casinoData={casinoData} />

            </div >
        )
    }


}

export default Casino



