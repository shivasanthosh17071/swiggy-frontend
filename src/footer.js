import React from "react";
import "./App.css";
import { NavLink, useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="cta-text">
                    <h4>
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="https://maps.app.goo.gl/m5XpTShfkjEC62hC7"
                        target="/"
                      >
                        Find us
                      </a>
                    </h4>
                    <span>
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="https://maps.app.goo.gl/m5XpTShfkjEC62hC7"
                        target="/"
                      >
                        Lb Nagar , Hyderabad
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone"></i>
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="tel:919182868227"
                      >
                        +91 9182868227
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open"></i>
                  <div className="cta-text">
                    <h4>
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="mailto: shivasanthosh1707@gmail.com"
                        target="/"
                      >
                        Mail us
                      </a>
                    </h4>
                    <span>
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="mailto: shivasanthosh1707@gmail.com"
                        target="/"
                      >
                        shivasanthosh1707@gmail.com
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <h2 style={{ color: "whitesmoke" }}>
                      Shiva Santhosh Reddy
                    </h2>
                    {/* <a href="index.html"><img src="https://i.ibb.co/QDy827D/ak-logo.png" className="img-fluid" alt="logo"/></a> */}
                  </div>
                  <div className="footer-text">
                    <p>
                      MERN STACK DEVELOPER <br />I am dedicated to continuously
                      learning and improving my skills to stay current with
                      emerging technologies and trends in the industry.
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Follow Me</span>
                    <a
                      href="https://www.linkedin.com/in/shiva-santhosh-reddy-352319293/"
                      target="/"
                    >
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="https://wa.me/919182868227" target="/">
                      <i className="bi bi-whatsapp"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/santhosh.dev_/"
                      target="/"
                    >
                      <i className="bi bi-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a
                        href="https://shivasanthosh-portfolio.netlify.app/"
                        target="/"
                      >
                        portfolio
                      </a>
                    </li>
                    <li>
                      <a href="tel:919182868227" target="/">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="https://wa.me/919182868227" target="/">
                        Our Services
                      </a>
                    </li>
                    <li>
                      <a href="tel:919182868227" target="/">
                        Call Me
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://shivasanthosh-portfolio.netlify.app/"
                        target="/"
                      >
                        Latest Projects
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>HIRE ME</h3>
                  </div>
                  <div className="footer-text mb-25">
                    {/* <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p> */}
                  </div>
                  <div className="subscribe-form">
                    <form action=" https://wa.me/919182868227" target="/">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i className="fab fa-telegram-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className=" ">
                <div className="copyright-text">
                  <p>
                    Copyright &copy; 2024, Open | Developed with
                    <i
                      style={{ color: "red", margin: "0px 5px" }}
                      className="bi bi-suit-heart"
                    ></i>{" "}
                    by{" "}
                    <a
                      href="https://shivasanthosh-portfolio.netlify.app/"
                      target="/"
                    >
                      Shiva Santhosh Reddy
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
