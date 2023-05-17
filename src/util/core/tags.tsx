import * as React from "react";
import Tag from "./interfaces/tag";
import Routes from "./misc/routes";
import { Session, SessionContext } from "./session";

export const getTags = (tags: Array<Tag>, callback: Function): JSX.Element[] => {
    const session: Session = React.useContext(SessionContext);
    return session.allTags.map((tag: Tag): JSX.Element => {
        return <TagElement tag={tag} />;
    });
}

export const TagElement = (props: { tag: Tag }): JSX.Element => {
    return (
        <p className="tag" style={{ backgroundColor: props.tag.color }}>{props.tag.name}</p>
    );
}
