import * as React from "react";
import { useLocation, useParams } from "react-router-dom";
import FlatPage from "../../util/core/interfaces/flatpage";
import Routes from "../../util/core/misc/routes";
import { Session, SessionContext } from "../../util/core/session";
import Markdown from "../markdown";
import { NotFound } from "../notfound";

enum FlatPageFetchStatus {
    NOT_FETCHED, EXISTS, NOT_EXISTS
}

export const Flatpage = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const location = useLocation();

    const [status, setStatus] = React.useState<FlatPageFetchStatus>(FlatPageFetchStatus.NOT_FETCHED);
    const [flatpage, setFlatpage] = React.useState({} as FlatPage);
    const slug = encodeURIComponent(window.location.pathname + "/");

    React.useEffect((): void => {
        session.request('get', `${Routes.OBJECT}/flatpage/retrieve/${slug}?lookup=url`, false).then((res: { data: FlatPage }) => {
            if (res) {
                setFlatpage(res.data);
                setStatus(FlatPageFetchStatus.EXISTS);

                document.title = `${res.data.title} | Metropolis`;
            }
            else {
                setStatus(FlatPageFetchStatus.NOT_EXISTS);
            }
        })
    }, [location]);

    const goBack = (): void => {
        window.history.back();
    }

    return (
        status === FlatPageFetchStatus.NOT_FETCHED ?
            <>Loading...</>
            :
            status === FlatPageFetchStatus.EXISTS ?
                <>
                    <link rel="stylesheet" href="/resources/static/css/flatpage.css" />
                    <div className="resources-page">
                        <a id="back" onClick={goBack}>
                            <i className="zmdi zmdi-arrow-left"></i>
                        </a>

                        <div className="container">
                            <div className="content">
                                <h1 className="title">{flatpage.title}</h1>
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