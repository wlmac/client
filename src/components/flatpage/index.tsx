import * as React from "react";
import FlatPage from "../../util/core/interfaces/flatpage";
import Markdown from "../markdown";

export const Flatpage = (): JSX.Element => {
    React.useEffect((): void => {
        document.title = "Resources | Metropolis";
    }, []);

    const goBack = (): void => {
        window.history.back();
    }

    const flatpage: FlatPage = {
        slug: "baf",
        content: "Hi! **This text is bold**, *This text is italics*, and ~~this text is crossed out~~. This is a link: https://google.ca"
    };

    return (
        <>
            <link rel="stylesheet" href="/static/css/flatpage.css" />
            <div className="resources-page">
                <a id="back" onClick={goBack}>
                    <i className="zmdi zmdi-arrow-left"></i>
                </a>

                <div className="container">
                    <div className="content">
                        <h1 className="title">Resources</h1>
                        <hr />
                        <div className="content-body">
                            <Markdown text={flatpage.content}></Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}