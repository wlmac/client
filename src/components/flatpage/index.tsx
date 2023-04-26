import * as React from "react";
import { useParams } from "react-router-dom";
import FlatPage from "../../util/core/interfaces/flatpage";
import Routes from "../../util/core/misc/routes";
import { Session, SessionContext } from "../../util/core/session";
import Markdown from "../markdown";
import { NotFound } from "../notfound";

export const Flatpage = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const [exists, setExists] = React.useState(false);
    const [flatpage, setFlatpage] = React.useState({} as FlatPage);
    const slug = encodeURIComponent(window.location.pathname + "/");

    React.useEffect((): void => {
        session.getAPI(`${Routes.OBJECT}/flatpage/retrieve/${slug}?lookup=url`, false).then((res: { data: FlatPage }) => {
            setFlatpage(res.data);
            setExists(true);

            document.title = `${res.data.title} | Metropolis`;
        }).catch((err) => {
            if (err.response.status !== 404) {
                session.refreshAuth();
            }
        })
    }, []);

    const goBack = (): void => {
        window.history.back();
    }

    return (
        exists ?
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
            :
            <NotFound />
    );
}