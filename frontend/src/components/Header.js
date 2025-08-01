import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <section id="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
                    <div className="container-fluid p-0 bg-dark">
                        <p className="navbar-brand d-flex align-items-center px-3 py-3 bg-warning" href="#">
                            <img src="images/logo.jpeg" alt="image not found" className="d-inline-block align-text-top" />
                            <span className='ps-3 fs-3 text-dark'>KGN ELECTRODES</span>
                        </p>
                        <button className="navbar-toggler m-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse pe-2" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About Us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/testi">Testimonials</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/career">Career</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        </>
    );
}

export default Header;