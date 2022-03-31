import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
    import {login} from "../../actions/auth";

export class Login extends Component {
    state = {
        username: '',
        password: '',
    }
    static propTypes ={
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e =>{
        e.preventDefault();
        this.props.login(this.state.username, this.state.password)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value});


    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }

        const { username, password} = this.state;
        return (
            <div className="">
            <div className=" m-auto shadow col-md-6">
                <div className="card card-body mt-2 border-primary">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>

                        <div className="form-group ">
                            <button type="submit" className="btn btn-primary mt-2">
                                Login
                            </button>
                        </div>
                        <p className="mt-2">
                            Don't Have An Account?  <Link to="/Register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        <div className=" m-auto shadow col-md-4">
                <div className="card  mt-2 text-center border-warning">
                    <h5 className="card-header ">Sample Logins:</h5>
                        <div className=" card-body ">

                            <div className="card card-body ">
                            <label className="fw-bold ">Admin Account</label>
                            <label>Username: admin</label>
                            <label>Password: admin</label>
                            </div>
                            <div className="card card-body mt-2">
                            <label className="fw-bold">User Account</label>
                            <label>Username: user</label>
                            <label>Password: user</label>
                            </div>
                            <h6 className="fw-bold mt-2">Feel free to make your own account !</h6>


                    </div>
                </div>
        </div>
</div>
        );
    }
}

const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated

    })

export default connect(mapStateToProps, {login})(Login);