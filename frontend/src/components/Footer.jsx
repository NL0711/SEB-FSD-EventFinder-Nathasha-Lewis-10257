import { Container, Row, Col } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate();

  const handleQuickLink = (path) => {
    navigate(path);
  };

  return (
    <footer>
      <div className="bg-primary text-white py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <h5 className="mb-4 border-bottom pb-2">ABOUT EVENTFINDER</h5>
              <p>
                EventFinder is a comprehensive event management platform that helps users discover, track, and
                participate in various events. Our mission is to connect people with experiences that matter to them.
              </p>
              <div className="mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <i className="fa-brands fa-facebook-f fa-lg"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <i className="fa-brands fa-twitter fa-lg"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <i className="fa-brands fa-instagram fa-lg"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <i className="fa-brands fa-linkedin-in fa-lg"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white">
                  <i className="fa-brands fa-youtube fa-lg"></i>
                </a>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <h5 className="mb-4 border-bottom pb-2">QUICK LINKS</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none" onClick={() => handleQuickLink("/")}>
                    <i className="fa-solid fa-angle-right me-2"></i>Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none" onClick={() => handleQuickLink("/all-events")}>
                    <i className="fa-solid fa-angle-right me-2"></i>All Events
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none" onClick={() => handleQuickLink("/about")}>
                    <i className="fa-solid fa-angle-right me-2"></i>About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none" onClick={() => handleQuickLink("/contact")}>
                    <i className="fa-solid fa-angle-right me-2"></i>Contact Us
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h5 className="mb-4 border-bottom pb-2">CONTACT US</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  123 Event Street, City, Country
                </li>
                <li className="mb-2">
                  <i className="fa-solid fa-phone me-2"></i>
                  +1 234 567 8900
                </li>
                <li className="mb-2">
                  <i className="fa-solid fa-envelope me-2"></i>
                  info@eventfinder.com
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bg-dark text-white py-3">
        <Container>
          <p className="mb-0 text-center">
            © {new Date().getFullYear()} EventFinder. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
