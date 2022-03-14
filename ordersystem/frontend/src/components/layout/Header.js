import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";

export class Header extends Component{
    static propTypes ={
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    }

    render() {
        const { isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav me-2 me-lg-0">
                <span className="navbar-text me-2 align-middle">
                    <strong>
                        {user ? `Welcome ${user.username}`: ""}
                    </strong>
                </span>
                <li className="nav-item                                                                                                                                                                   ">
                    <Link to="cart" className="nav-link">Cart</Link>
                </li>
                <li className="nav-item">
                    <button onClick={this.props.logout } className="btn nav-link btn-primary btn-sm text-light align-middle">Logout</button>
                </li>
            </ul>
    )
        const guestLinks = (
            <ul className="navbar-nav me-2 me-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        )

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                            <div className="collapse navbar-collapse" id="navbarColor03">
                                <a className="navbar-brand" href="#">Order System</a>


                            </div>
                            {isAuthenticated ? authLinks: guestLinks}
                </div>
            </nav>
        )
    }
}
const mapStateToProps = state =>({
    auth: state.auth
})


export default connect(mapStateToProps, {logout})(Header);