import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home.jsx";
import Footer from "./components/Footer.jsx";
import Sport from "./pageComponents/Prematch/Sport.jsx";
import Casino from "./pageComponents/Casino/Casino.jsx";
import CasinoLive from "./pageComponents/Casino-Live/CasinoLive.jsx";
import Virtual from "./pageComponents/Virtual/Virtual.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./animate.css";
function App() {
  const [banners, setBanners] = useState({});

  const url = "https://content.betbuq.com/get_sliders/";

  const fetchApi = async () => {
    try {
      const response = await fetch(url);
      const banners = await response.json();
      setBanners(banners);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home
            sliders={banners?.result?.landing_page?.center || []}
            miniBanners={banners?.result?.landing_page?.mini || []}
          />
        </Route>
        <Route path="/sport">
          <Sport />
        </Route>
        <Route path="/casino">
          <Casino sliders={banners?.result?.casino?.center} />
        </Route>
        <Route path="/casino-live">
          <CasinoLive sliders={banners?.result?.casino_live?.center} />
        </Route>
        <Route path="/virtual">
          <Virtual sliders={banners?.result?.virtual?.center} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
