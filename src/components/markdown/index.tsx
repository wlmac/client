import * as React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

const Markdown = ({ text }: { text: string }): JSX.Element => { //takes markdown text as prop and returns element with parsed markdown
    return (
        <ReactMarkdown children={
            //honest to god I have no idea why tf its like this but wtv it needs exactly 2 spaces before the \n
            text ? text.replace(/\r\n/g, '  \n') : ''
        } remarkPlugins={[remarkGfm]} components={{
            img: el => {
                // console.log("Embed element:", el);
                return safeEmbed(el.src!) ? (
                    <iframe className="markdown-embed" allowFullScreen frameBorder={0} src={el.src} />
                ) : (
                    <img src={el.src} alt={el.alt} />
                )
            },
            iframe: el => {
                console.log("Embed element:", el);
                return safeEmbed(el.src!) ? (
                    <iframe className="markdown-embed" frameBorder={0} src={el.src} />
                ) : (
                    <></>
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


/**
 * Parsing Markdown into Plaintext
 * @param markdownString The original Markdown body string
 * @returns Plaintext string version of input string without Markdown annotations
 */

import { marked } from "marked"

export function markdownToPlainText(markdownString: string): string {
    if (!markdownString) return "";
    const html = marked(markdownString);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const plainText = doc.body.innerText.trim();
    return plainText;
}