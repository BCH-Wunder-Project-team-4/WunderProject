import { FormattedText } from "../formatted-text";
import { HeadingParagraph } from "../heading--paragraph";
import clsx from "clsx";

export function Invoice({ paragraph }) {
  return (
    <div className="p-10 flex flex-col md:flex-row lg:flex-row">
      <div className="w-1/2" data-aos="fade">
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2">
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className={clsx(
            "text-left text-md/xl dark:text-graysuit text-scapaflow sm:text-lg",
            paragraph.field_heading && "mt-4",
          )}
          data-aos="fade"
        />
      </div>
    </div>
  )
}