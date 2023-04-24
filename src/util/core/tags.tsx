import * as React from "react";
import Tag from "./interfaces/tag";
import Routes from "./misc/routes";
import { Session, SessionContext } from "./session";

export const getTags = (tags: Array<Tag>, callback: Function): void => {
    const session: Session = React.useContext(SessionContext);
    session.getAPI(`${Routes.OBJECT}/tag`).then((res) => {
        const tags = res.data.results;
        callback(tags.map((tag: Tag): JSX.Element => {
            return <TagElement tag={tag} />;
        }));
    });
}

export const TagElement = (props: { tag: Tag }): JSX.Element => {
    return (
        <p className="tag" style={{ backgroundColor: props.tag.color }}>{props.tag.name}</p>
    );
}

export const DeletableTagElement = (props: { tag: Tag, onClick: any }): JSX.Element => {
  return (
      <p className="tag" style={{ backgroundColor: props.tag.color }}>
        {props.tag.name}
        <button className="tag-delete" onClick={() => props.onClick(props.tag)}>✖</button>
      </p>
  );
}
