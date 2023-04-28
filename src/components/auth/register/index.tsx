import * as React from "react";
import { default as axios } from 'axios';
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../../../util/core/session";
import { RouterLink } from "../../app/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterInputs } from "../../../util/models";
import { User } from "../../../util/core/session";

import Routes from "../../../util/core/misc/routes";
import { loggedIn } from "../../../util/core/AuthService";

interface RegisterUser {
    first_name: string,
    last_name: string,
    graduating_year: number,
    email: string,
    username: string,
    password: string
}

export const Register = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInputs>();
    const [error, setError] = React.useState("");

    React.useEffect((): void => {
        document.title = "Sign Up | Metropolis";
    }, []);

    React.useEffect((): void => {
        if (loggedIn()) {
            nav("/");
        }
    });

    const goBack = (): void => {
        window.history.back();
    }

    const onRegister = (data: RegisterInputs): void => {
        console.log("Submitted data:", data);
        if (data.password !== data.confirm_password) {
            setError("Passwords do not match");
            return;
        }
        const new_user: RegisterUser = {
            first_name: data.first_name,
            last_name: data.last_name,
            graduating_year: data.graduating_year,
            email: data.email,
            username: data.username,
            password: data.password
        }
        axios.post(`${Routes.USER}/new`, new_user).then((res) => {
            console.log("Successfully registered user");
            nav("/accounts/login");
        }).catch((err) => {
            console.log("Failed to register user");
            setError("An internal error occurred. Please contact an admin to get it fixed.")
        });
    }

    return (
        <div className="register-page">
            <a id="back" onClick={goBack}>
                <i className="zmdi zmdi-arrow-left"></i>
            </a>

            <div className="container">
                <div className="row wrapper">
                    <div className="graphic col m12 l6 hide-on-med-and-down account-art" style={{ backgroundImage: "url('/static/img/sign-up.png')" }}>
                    </div>
                    <div className="col m12 l6">
                        <div className="form-wrapper">
                            <div className="tab-wrapper row">
                                <div className="col s6">
                                    <RouterLink href="/accounts/login/">
                                        <div className="tab">Log In</div>
                                    </RouterLink>
                                </div>
                                <div className="col s6">
                                    <RouterLink href="/accounts/signup/">
                                        <div className="tab current">Sign Up</div>
                                    </RouterLink>
                                </div>
                            </div>

                            <form className="signup" onSubmit={handleSubmit(onRegister)}>
                                <input {...register("CSRF_TOKEN")} type="hidden" name="csrfmiddlewaretoken" value="CSRFSECRET" />
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_email" className="active">TDSB Email:</label>
                                        <input {...register("email")} type="email" name="email" autoComplete="email" required={true} id="id_email" />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_username" className="active">Username:</label>
                                        <input {...register("username")} type="text" name="username" autoComplete="username" minLength={1} maxLength={150} required={true} id="id_username" />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_first_name" className="active">First Name:</label>
                                        <input {...register("first_name")} type="text" name="first_name" autoComplete="given-name" maxLength={30} required={true} id="id_first_name" />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_last_name" className="active">Last Name:</label>
                                        <input {...register("last_name")} type="text" name="last_name" autoComplete="family-name" maxLength={30} required={true} id="id_last_name" />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <span className="grad-year">Graduating Year:</span>
                                        <select {...register("graduating_year")} className="browser-default">
                                            <option value="">Does not apply</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                        </select>
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_password1" className="active">Password:</label>
                                        <input {...register("password")} type="password" required={true} />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_password2" className="active">Password (again):</label>
                                        <input {...register("confirm_password")} type="password" required={true} />
                                    </div>
                                </div>
                                <p>By clicking this button, you agree to our <Link to="/terms/">terms</Link> and <Link className="link" to="/privacy/">privacy policy</Link>.</p>
                                {error &&
                                    <span className="form-error">
                                        <div className="form-errors">
                                            <i className="material-icons">warning</i>
                                            <>{error}</>
                                        </div>
                                    </span>}
                                <button type="submit" className="btn login-btn">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}