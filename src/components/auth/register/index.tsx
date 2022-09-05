import * as React from "react";
import { RouterLink } from "../../app/navigation";

export const Register = (): JSX.Element => {
    React.useEffect((): void => {
        document.title = "Sign Up | Metropolis";
    }, []);

    const goBack = (): void => {
        window.history.back();
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

                            <form className="signup" method="POST" action="/accounts/signup/">
                                <input type="hidden" name="csrfmiddlewaretoken" value="CSRFSECRET" />
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_email" className="active">TDSB Email:</label>
                                        <input type="email" name="email" autoComplete="email" required={true} id="id_email" style={{ backgroundImage: "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;" }} />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">

                                        <label htmlFor="id_username" className="active">Username:</label>



                                        <input type="text" name="username" autoComplete="username" minLength={1} maxLength={150} required={true} id="id_username" />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">

                                        <label htmlFor="id_first_name" className="active">First Name:</label>



                                        <input type="text" name="first_name" autoComplete="given-name" maxLength={30} required={true} id="id_first_name" />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">

                                        <label htmlFor="id_last_name" className="active">Last Name:</label>



                                        <input type="text" name="last_name" autoComplete="family-name" maxLength={30} required={true} id="id_last_name" />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">

                                        <span className="grad-year">Graduating Year:</span>



                                        <select name="graduating_year" id="id_graduating_year">
                                            <option value="" selected={true}>Does not apply</option>

                                            <option value="2022">2022</option>

                                            <option value="2023">2023</option>

                                            <option value="2024">2024</option>

                                            <option value="2025">2025</option>

                                        </select>
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_password1" className="active">Password:</label>
                                        <input type="password" name="password1" autoComplete="new-password" required={true} id="id_password1" style={{ backgroundImage: "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIUlEQVQ4EX2TOYhTURSG87IMihDsjGghBhFBmHFDHLWwSqcikk4RRKJgk0KL7C8bMpWpZtIqNkEUl1ZCgs0wOo0SxiLMDApWlgOPrH7/5b2QkYwX7jvn/uc//zl3edZ4PPbNGvF4fC4ajR5VrNvt/mo0Gr1ZPOtfgWw2e9Lv9+chX7cs64CS4Oxg3o9GI7tUKv0Q5o1dAiTfCgQCLwnOkfQOu+oSLyJ2A783HA7vIPLGxX0TgVwud4HKn0nc7Pf7N6vV6oZHkkX8FPG3uMfgXC0Wi2vCg/poUKGGcagQI3k7k8mcp5slcGswGDwpl8tfwGJg3xB6Dvey8vz6oH4C3iXcFYjbwiDeo1KafafkC3NjK7iL5ESFGQEUF7Sg+ifZdDp9GnMF/KGmfBdT2HCwZ7TwtrBPC7rQaav6Iv48rqZwg+F+p8hOMBj0IbxfMdMBrW5pAVGV/ztINByENkU0t5BIJEKRSOQ3Aj+Z57iFs1R5NK3EQS6HQqF1zmQdzpFWq3W42WwOTAf1er1PF2USFlC+qxMvFAr3HcexWX+QX6lUvsKpkTyPSEXJkw6MQ4S38Ljdbi8rmM/nY+CvgNcQqdH6U/xrYK9t244jZv6ByUOSiDdIfgBZ12U6dHEHu9TpdIr8F0OP692CtzaW/a6y3y0Wx5kbFHvGuXzkgf0xhKnPzA4UTyaTB8Ph8AvcHi3fnsrZ7Wore02YViqVOrRXXPhfqP8j6MYlawoAAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;" }} />
                                    </div>
                                </div><div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="id_password2" className="active">Password (again):</label>
                                        <input type="password" name="password2" required={true} id="id_password2" style={{ backgroundImage: "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIUlEQVQ4EX2TOYhTURSG87IMihDsjGghBhFBmHFDHLWwSqcikk4RRKJgk0KL7C8bMpWpZtIqNkEUl1ZCgs0wOo0SxiLMDApWlgOPrH7/5b2QkYwX7jvn/uc//zl3edZ4PPbNGvF4fC4ajR5VrNvt/mo0Gr1ZPOtfgWw2e9Lv9+chX7cs64CS4Oxg3o9GI7tUKv0Q5o1dAiTfCgQCLwnOkfQOu+oSLyJ2A783HA7vIPLGxX0TgVwud4HKn0nc7Pf7N6vV6oZHkkX8FPG3uMfgXC0Wi2vCg/poUKGGcagQI3k7k8mcp5slcGswGDwpl8tfwGJg3xB6Dvey8vz6oH4C3iXcFYjbwiDeo1KafafkC3NjK7iL5ESFGQEUF7Sg+ifZdDp9GnMF/KGmfBdT2HCwZ7TwtrBPC7rQaav6Iv48rqZwg+F+p8hOMBj0IbxfMdMBrW5pAVGV/ztINByENkU0t5BIJEKRSOQ3Aj+Z57iFs1R5NK3EQS6HQqF1zmQdzpFWq3W42WwOTAf1er1PF2USFlC+qxMvFAr3HcexWX+QX6lUvsKpkTyPSEXJkw6MQ4S38Ljdbi8rmM/nY+CvgNcQqdH6U/xrYK9t244jZv6ByUOSiDdIfgBZ12U6dHEHu9TpdIr8F0OP692CtzaW/a6y3y0Wx5kbFHvGuXzkgf0xhKnPzA4UTyaTB8Ph8AvcHi3fnsrZ7Wore02YViqVOrRXXPhfqP8j6MYlawoAAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;" }} />
                                    </div>
                                </div>
                                <p>By clicking this button, you agree to our <RouterLink className="link" href="/terms/">terms</RouterLink> and <RouterLink className="link" href="/privacy/">privacy policy</RouterLink>.</p>
                                <button type="submit" className="btn login-btn ">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}