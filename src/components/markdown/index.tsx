import * as React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

const Markdown = ({ text }: { text: string }): JSX.Element => { //takes markdown text as prop and returns element with parsed markdown
    return (
        <ReactMarkdown children={
            text ? text
            .replace(/\r\n/g, '  \n') //honest to god I have no idea why tf its like this but wtv it needs exactly 2 spaces before the \n
            .replace(/(?<!\\){(.+?)(?<!\\)}/g, '![]($1)') : '' 
            /*
            the above regex: 
            (?<!\\) negative lookbehind (asserts that there is no escape char \)
            { asserts existence of {
            (.+?) capture group #1 which is the juicy meat we want (. matches any character, + is 1 or more occurences, and ? is lazy mode)
            (?<!\\)} negative lookbehind part 2 looking for unescaped closing }

            the $1 in the replacement string references capture group #1
            */
        } remarkPlugins={[remarkGfm]} components={{
            img: el => {
                // console.log("Embed element:", el);
                return safeEmbed(el.src!) ? (
                    <iframe className="markdown-embed" allowFullScreen frameBorder={0} src={el.src} />
                ) : (
                    <img src={el.src+"?w=800&h=&fmt=webp"} alt={el.alt} />
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
    const html = marked(markdownString, {
        headerIds: false,
        mangle: false
    });
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const plainText = doc.body.innerText.trim();
    return plainText;
}