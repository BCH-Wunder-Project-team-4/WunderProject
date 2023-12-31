import {
  AccordionSchema,
  AnchorSchema,
  BannerSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  FullWidthParagraphSchema,
  HeroSchema,
  ImageSchema,
  LinksSchema,
  ListingArticlesSchema,
  ListingEventsSchema,
  ListingExpertTalksSchema,
  LogoWallSchema,
  ParagraphWunderpediaSchema,
  ScrollingNumbersSchema,
  SectionbgSchema,
  ServicesSchema,
  SimpleQuoteSchema,
  SubheadingSchema,
  TrilogySnapshotSchema,
  VideoSchema,
  FrameSchema,
  TextAndImageSchema,
  StoryBlockSchema,
} from "@/lib/zod/paragraph";

import { DrupalNode } from "next-drupal";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { z } from "zod";

const PageElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  ListingExpertTalksSchema,
  ListingEventsSchema,
  FileAttachmentsSchema,
  BannerSchema,
  ScrollingNumbersSchema,
  ServicesSchema,
  SubheadingSchema,
  SectionbgSchema,
  FullWidthParagraphSchema,
  ParagraphWunderpediaSchema,
  SimpleQuoteSchema,
  LogoWallSchema,
  TrilogySnapshotSchema,
  AnchorSchema,
  FrameSchema,
  TextAndImageSchema,
  StoryBlockSchema,
]);

export const PageSchema = z.object({
  type: z.literal("node--page"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(PageElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupPage(page: DrupalNode): Page | null {
  try {
    // Validate the top level fields first.
    const topLevelPageData = PageSchema.omit({
      field_content_elements: true,
    }).parse(page);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the page contents.
    const validatedParagraphs = page.field_content_elements
      .map((paragraph: any) => {
        const result = PageElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating page paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelPageData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, page }, null, 2));
    return null;
  }
}

export type Page = z.infer<typeof PageSchema>;
