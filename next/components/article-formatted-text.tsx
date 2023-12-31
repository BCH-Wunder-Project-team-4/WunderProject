import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import ExternalLinkIcon from "styles/icons/external.svg";

import { isRelative } from "@/lib/utils";

import { env } from "@/env";

const isElement = (domNode: DOMNode): domNode is Element =>
  domNode.type === "tag";

const options: HTMLReactParserOptions = {
  /*
   * If `undefined` is returned from this `replace` function, nothing is changed and the given DOMNode is rendered as usual.
   * But if anything else is returned, that value replaces the original value.
   * For example, return `null` to remove it, or some other component to replace it.
   */
  replace: (domNode) => {
    if (!isElement(domNode)) return;

    switch (domNode.name) {
      case "img": {
        const { src, alt, width = 100, height = 100 } = domNode.attribs;

        const numberWidth = Number(width);
        const numberHeight = Number(height);

        if (isRelative(src)) {
          return (
            <Image
              src={`${env.NEXT_PUBLIC_DRUPAL_BASE_URL}${src}`}
              width={numberWidth}
              height={numberHeight}
              alt={alt}
              className="max-w-full object-cover"
            />
          );
        }
        break;
      }

      case "a": {
        const { href } = domNode.attribs;

        if (href && isRelative(href)) {
          return (
            <Link href={href} className="hyperlink underline">
              {domToReact(domNode.children, options)}
            </Link>
          );
        }
        if (href && !isRelative(href)) {
          return (
            <Link
              href={href}
              target="_blank"
              className="underline text-primary-600 dark:text-fog"
              rel="noopener noreferrer"
            >
              {domToReact(domNode.children, options)}
              <ExternalLinkIcon className="ml-1 inline-block h-[1em] w-[1em] text-primary-600 dark:text-fog" />
            </Link>
          );
        }

        break;
      }

      case "p": {
        return <p className="mb-4">{domToReact(domNode.children, options)}</p>;
      }

      case "h2": {
        return (
          <h2 className="text-left text-primary-600 dark:text-fog text-heading-sm font-bold md:text-heading-md my-4">
            {domToReact(domNode.children, options)}
          </h2>
        );
      }

      case "h3": {
        return (
          <h3 className="text-left text-primary-600 dark:text-fog text-heading-xs font-bold md:text-heading-sm my-4">
            {domToReact(domNode.children, options)}
          </h3>
        );
      }

      case "input": {
        if (domNode.attribs.value === "") {
          delete domNode.attribs.value;
        }

        return domNode;
      }

      default: {
        return undefined;
      }
    }
  },
};

interface ArticleFormattedTextProps extends HTMLAttributes<HTMLDivElement> {
  html: string;
}

export function ArticleFormattedText({
  html,
  ...props
}: ArticleFormattedTextProps) {
  return <div {...props}>{parse(html, options)}</div>;
}
