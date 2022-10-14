import * as React from "react";
import Tag from "./interfaces/tag";

export const getTags = (tags: Array<Tag>): Array<JSX.Element> => {
    return tags.map((tag: Tag): JSX.Element => {
        return <TagElement tag={tag} />;
    });
}

export const TagElement = (props: { tag: Tag }): JSX.Element => {
    return (
        <p className="tag" style={{ backgroundColor: props.tag.color.value }}>{props.tag.name}</p>
    );
}
