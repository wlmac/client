import * as React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

const Markdown = ({ text }: { text: string }): JSX.Element => { //takes markdown text as prop and returns element with parsed markdown
    return (
        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} components={{
            img: el => {
                return safeEmbed(el.src!) ? (
                    <iframe className="markdown-embed" frameBorder={0} src={el.src} />
                ) : (
                    <img src={el.src} alt={el.alt} />
                )
            }
        }} />
    );
}

/*
Added special syntax for iframe embeds: 

Markdown images with valid "safe" embed URLs are placed into iframe
*/

export default Markdown

function safeEmbed(url: string) {
    let list = [
        "https://forms.gle",
        "https://docs.google.com",
        "https://www.youtube.com/embed",
        "https://open.spotify.com/embed"
    ]
    for (let i = 0; i < list.length; i++) {
        if (url.startsWith(list[i])) {
            return true;
        }
    }
    return false;
}