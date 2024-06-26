import { default as axios } from 'axios';
import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { loggedIn, setRefresh } from '../../../util/core/AuthService';
import Routes from '../../../util/core/misc/routes';
import { Session, SessionContext } from "../../../util/core/session";
import { useQuery } from '../../../util/query';

export const Login = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    const session = React.useContext(SessionContext);

    const query: URLSearchParams = useQuery();
    const next: string | null = query.get("next");

    const [csrf, setCsrf] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [logging, setLogging] = React.useState(false);
    const [err, setErr] = React.useState("");

    React.useEffect((): void => {
        if (loggedIn()) {
            nav(next ? next : "/");
        }
        removePlaceholder("id_login");
        removePlaceholder("id_password");
        removePlaceholder("id_remember");
        document.title = "Login | Metropolis";
    }, []);

    const goBack = (): void => {
        window.history.back();
    }

    const removePlaceholder = (elmID: string): void => {
        document.getElementById(elmID)!.removeAttribute("placeholder");
    }

    const login = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        setLogging(true);
        axios.post(Routes.AUTH.LOGIN, {
            username: username,
            password: pwd
        }, {
            // headers: {
            //     "csrftoken": csrf
            // }
        }).then((res) => {
            if (res.data.access) {
                session.updateToken(res.data.access);
                setRefresh(res.data.refresh);
                setLogging(false);
                session.notify("Successfully logged in!", "success");
                nav(next ? next : "/");
            }
            else {
                setErr(res.data.error);
                setLogging(false);
                // getCsrf();
            }
        }).catch(err => {
            setErr(err.response.data.detail);
            setLogging(false);
            // getCsrf();
        });
    }

    return (
        <div className="login-page">
            <a id="back" onClick={goBack}>
                <i className="zmdi zmdi-arrow-left"></i>
            </a>

            <div className="container">
                <div className="row wrapper">
                    <div className="col m12 l6 hide-on-med-and-down">
                        <img className="responsive-img account-art" src="/resources/static/img/log-in.png?w=800&fmt=webp" />
                    </div>
                    <div className="col m12 l6">
                        <div className="form-wrapper">
                            <div className="tab-wrapper row">
                                <div className="col s6">
                                    <Link to="/account/login/">
                                        <div className="tab current">Log In</div>
                                    </Link>
                                </div>
                                <div className="col s6">
                                    <Link to="/account/signup/">
                                        <div className="tab">Sign Up</div>
                                    </Link>
                                </div>
                            </div>
                            <form className="login" onSubmit={login}>
                                <input type="hidden" name="csrfmiddlewaretoken" value="CSRFSECRET123" />
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_login" className="active">Login:</label>
                                        <input type="text" name="login" autoComplete="off" required={true} id="id_login" onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_password" className="active">Password:</label>
                                        <input type="password" name="password" autoComplete="off" required={true} id="id_password" onChange={(e) => {
                                            setPwd(e.target.value);
                                        }} />
                                    </div>
                                </div><div className="row">
                                    <div className="col s12">
                                        <label htmlFor="id_remember" className="valign-wrapper">
                                            <input className="filled-in checkbox-blue" type="checkbox" name="remember" id="id_remember" />
                                            <span>Remember Me</span>
                                        </label>
                                    </div>
                                </div>

                                {
                                    !!err &&
                                    <ul className="errorlist nonfield"><li>The username and/or password you specified are not correct.</li></ul>
                                }

                                <div>
                                    <button className="btn login-btn" type="submit">Sign In</button>
                                </div>
                                <p>Forgot your password? Click <Link className="link" to="/accounts/password/reset/">here</Link> to reset.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}