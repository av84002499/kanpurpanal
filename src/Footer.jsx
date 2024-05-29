import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-shape">
          <svg className="shape-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fff" fillOpacity="1" d="M0,192L48,165.3C96,139,192,85,288,85.3C384,85,480,139,576,144C672,149,768,107,864,96C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
            </path>
          </svg>
        </div>
        <div className="main-footer">
          <div className="container">
            <div className="row">
              <div className="footer-box col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div className="footer-logo">
                  <img className="img-fluid" src="./images/logo-white.png" alt="" />
                </div>
                <div className="footer-box about-box">
                  <h5 className="box-title">About</h5>
                  <div className="box-content">
                    <div className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                    <ul className="social-icon-two">
                      <li><a href="/#"><i  className="bi bi-twitter"></i></a></li>
                      <li><a href="/#"><i  className="bi bi-facebook"></i></a></li>
                      <li><a href="/#"><i  className="bi bi-instagram"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-box col-xl-2 col-lg-2 col-md-6 col-sm-12">
                <div className="box links-box">
                  <h6 className="box-title">Dummy Text</h6>
                  <div className="box-content">
                    <ul className="user-links">
                      <li><a href="index.html">Home</a></li>
                      <li><a href="menu.html">Menu</a></li>
                      <li><a href="/#">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-box col-xl-2 col-lg-2 col-md-6 col-sm-12">
                <div className="box links-box">
                  <h6 className="box-title">Dummy Text</h6>
                  <div className="box-content">
                    <ul className="user-links">
                      <li><a href="index.html">Home</a></li>
                      <li><a href="menu.html">Menu</a></li>
                      <li><a href="/#">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-box col-xl-2 col-lg-2 col-md-6 col-sm-12">
                <div className="box links-box">
                  <h6 className="box-title">Dummy Text</h6>
                  <div className="box-content">
                    <ul className="user-links">
                      <li><a href="index.html">Home</a></li>
                      <li><a href="menu.html">Menu</a></li>
                      <li><a href="/#">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-box col-xl-3 col-lg-3 col-md-3 col-sm-12">
                <div className="box newsletter-box">
                  <h6 className="box-title">Newsletter</h6>
                  <div className="box-content">
                    <div className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                    <div className="subscribe-form">
                      <form method="post" action="#">
                        <div className="form-group">
                          <input type="email" name="email" className="email" placeholder="Email Address" required />
                          <button type="button" className="theme-btn"><i  className="bi bi-send-check-fill"></i></button>
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center text-center">
              <div className="col-lg-12 col-md-12">
                <p className="copyright-text">© 2024 by emenu.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer