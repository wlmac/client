import * as React from "react";
import { useNavigate } from "react-router-dom";
import { RouterLink } from "../../app/navigation";

export const Login = () => {
    function goBack(): void {
        window.history.back();
    }

    function removePlaceholder(elmID: string): void {
        document.getElementById(elmID)!.removeAttribute("placeholder");
        console.log(document.getElementById(elmID));
    }

    React.useEffect(() => {
        removePlaceholder("id_login");
        removePlaceholder("id_password");
        removePlaceholder("id_remember");
    }, []);

    return (
        <div className="login-page">
            <a id="back" onClick={goBack}>
                <i className="zmdi zmdi-arrow-left"></i>
            </a>

            <div className="container">

                <div className="row wrapper">
                    <div className="col m12 l6 hide-on-med-and-down">
                        <img className="responsive-img account-art" src="/static/img/log-in.png" />
                    </div>
                    <div className="col m12 l6">
                        <div className="form-wrapper">
                            <div className="tab-wrapper row">
                                <div className="col s6">
                                    <RouterLink href="/accounts/login/">
                                        <div className="tab current">Log In</div>
                                    </RouterLink>
                                </div>
                                <div className="col s6">
                                    <RouterLink href="/accounts/signup/">
                                        <div className="tab">Sign Up</div>
                                    </RouterLink>
                                </div>
                            </div>
                            <form className="login" method="POST" action="/accounts/login/">
                                <input type="hidden" name="csrfmiddlewaretoken" value="CSRFSECRET123" />
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_login" className="active">Login:</label>
                                        <input type="text" name="login" autoComplete="off" required={true} id="id_login" style={{ backgroundImage: "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=&quot;);" }} />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_password" className="active">Password:</label>
                                        <input type="password" name="password" autoComplete="off" required={true} id="id_password" style={{ backgroundImage: "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=&quot;);" }} />
                                    </div>
                                </div><div className="row">


                                    <div className="col s12">
                                        <label htmlFor="id_remember" className="valign-wrapper">
                                            <input className="filled-in checkbox-blue" type="checkbox" name="remember" id="id_remember" />
                                            <span>Remember Me</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="btn login-btn ">Sign In</button>
                                </div>
                                <p>Forgot your password? Click <a className="link" href="https://maclyonsden.com/accounts/password/reset/">here</a> to reset.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}