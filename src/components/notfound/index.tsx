import * as React from "react";
import { Link } from "react-router-dom";

export const NotFound = (): JSX.Element => {
    const [comic, setComic] = React.useState(-1);

    React.useEffect((): void => {
        document.title = "404 Page Not Found | Metropolis";
        setComic(Math.floor(Math.random() * 3));
    }, []);

    return (
        <>
            <link rel="stylesheet" href="/resources/static/css/404.css" />
            <div className="main-container card">
                <h2 className="center-align message">404: Page Not Found</h2>
                <img className="comic-img" style={{ maxWidth: "100%" }} src={`/resources/static/img/404-comics/404-${comic}.png`} />

                <div className="display-metropolis valign-wrapper">
                    <img className="inline-logo" src="/resources/static/img/themes/logos/dark-transparent.png" />
                </div>

                <div className="game-container" hidden={true}>
                    <input type="button" className="control-button" id="up-button" value="W" /><br />
                    <div className="row valign-wrapper game-mid">
                        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <input type="button" className="col control-button" id="left-button" value="A" />
                            <div className="game-content col">
                                <canvas id="game-canvas" style={{ backgroundColor: "black" }}></canvas>
                                <div className="result-container valign-wrapper">
                                    <div className="result-display valign-wrapper" hidden={true}>
                                        <div className="result-display-text">
                                            <span className="result-display-message">Start Game</span><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="button" className="col control-button" id="right-button" value="D" /><br />
                        </div>
                    </div>
                    <input type="button" className="control-button" id="down-button" value="S" />
                </div>

                <p className="center-align">
                    <Link to="/">Return Home</Link>
                    {/* <!-- No one is out of Elastigirl's reach, but unfortunately, even this page is out of her reach too. (It doesn't exist!) :( --> */}
                </p>
            </div>
        </>
    );
}