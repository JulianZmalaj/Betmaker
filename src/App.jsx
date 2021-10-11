import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home.jsx";
import Footer from "./components/Footer.jsx";
import Sport from "./pageComponents/Prematch/Sport.jsx";
import Casino from "./pageComponents/Casino/Casino.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
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
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
