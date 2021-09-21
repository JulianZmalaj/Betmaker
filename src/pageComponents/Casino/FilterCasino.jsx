import React from 'react'
import './Games.scss'

function FilterCasino({ toggleActive, active, casinoData }) {
    return (
        <div className="filters content-m">
            <div className="filters--categories">
                <div onClick={() => {
                    toggleActive('233');
                }} className={active === '233' ? "active" : null}>
                    <i className="fa fa-heart"></i>
                </div>
                <span className={active === '231' ? "active" : null} onClick={() => {
                    toggleActive('231');
                }}>Tutti i giochi</span>
                {
                    Object.values(casinoData?.result?.categories || {}).map((item, index) => {

                        return (
                            <span onClick={() => {
                                toggleActive(item.id);
                            }} className={active === item.id ? "active" : null} key={item.id}>{item.name}</span>
                        )
                    })
                }

            </div>
            <div className="filters--search">
                <div>
                    <i className="fal fa-search"></i>
                    <input type="text" placeholder="Search for a game" />
                </div>
                <button>
                    Providers
                    <i className="fa fa-line-columns"></i>
                </button>
            </div>
        </div>
    )
}

export default FilterCasino
