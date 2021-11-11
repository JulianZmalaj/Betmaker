import React from "react";
import "./Footer.scss";
import images from "../images";
function Footer() {
  return (
    <footer>
      <div className="wrapper content-m">
        <div className="links-wrapper">
          <div className="list-container">
            <h2>BetBuQ</h2>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Work with us</li>
            </ul>
          </div>
          <div className="list-container">
            <h2>Products</h2>
            <ul>
              <li>Casino</li>
              <li>Live Casino</li>
              <li>Sportbook</li>
            </ul>
          </div>
          <div className="list-container">
            <h2>Terms and Regulations</h2>
            <ul>
              <li>Terms &amp; Conditions</li>
              <li>Privacy Policy</li>
              <li>Responsible Gaming</li>
            </ul>
          </div>
        </div>
        <div className="divider-line"></div>
        <div className="footer-down">
          <div className="row-container footer-logo">
            <a href="/">
              <img src={images["logo"]} alt="Footer Logo" />
            </a>
          </div>
          <div className="row-container footer-socials">
            <a href="https://www.facebook.com/betbuq/" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="https://www.instagram.com/betbuqofficial/" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram-square"></i>
            </a>
          </div>
          <div className="row-container footer-menu">
            <ul>
              <li>Affiliates</li>
              <li>Complaints</li>
              <li>Deposit and Withdrawals</li>
            </ul>
          </div>
          <p className="row-container cookies-text">
            By accessing, continuing to use or browse through this site, you agree that we use certain browser cookies
            to improve your experience with us. We only use Cookies that will improve your experience with us and will
            not interfere with your privacy.
            <br />
            See our <a href="/">Cookies Policy</a> for more information about our use of cookies and how you can disable
            or manage their use if he wants it.
          </p>
          <div className="row-container payment-methods">
            <ul>
              <li>
                <img src={images.ecopays} alt="AstroPay" />
              </li>
              <li>
                <img src={images.ecopays} alt="bitcoin" />
              </li>
              <li>
                <img src={images.ecopays} alt="boleto_bancario" />
              </li>
              <li>
                <img src={images.ecopays} alt="carda_di_credito" />
              </li>
              <li>
                <img src={images.ecopays} alt="ecopayz" />
              </li>
              <li>
                <img src={images.ecopays} alt="bank_transfer" />
              </li>
            </ul>
          </div>
          <div className="row-container powered-by">
            <p>Powered By</p>
            <img src={images.feed} alt="Playlogiq Logo" />
          </div>
          <div className="row-container license">
            <p>
              Temkingz Limited ,with the trading name GGbet360 is licensed by the Oyo State gaming board to operate
              sport betting activities under the license number: OYSGB/SPB/21008
            </p>
            <p>Copyright 2021, GGbet360. All right reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
