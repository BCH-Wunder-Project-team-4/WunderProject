import {
  AccordionSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  FrameSchema,
  HeroSchema,
  ImageSchema,
  ImageShape,
  LinksSchema,
  ScrollingNumbersSchema,
  SimpleQuoteSchema,
  VideoSchema
} from "@/lib/zod/paragraph";

import { DrupalNode } from "next-drupal";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { z } from "zod";

const CaseElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  FileAttachmentsSchema,
  FrameSchema,
  SimpleQuoteSchema,
  ScrollingNumbersSchema,

]);


export const CaseSchema = z.object({
  type: z.literal("node--case"),
  id: z.string(),
  title: z.string(),
  field_excerpt: z.string().optional().nullable(),
  field_image: ImageShape.nullable().default(null),
  field_date: z.string(),
  field_industry: z.array(z.object({
    name: z.string(),
  })),
  field_solution: z.array(z.object({
    name: z.string(),
  })),
  field_technology: z.array(z.object({
    name: z.string(),
  })),
  field_content_elements: z.array(CaseElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupCase(caseNode: DrupalNode): Case | null {
  try {
    // Validate the top level fields first.
    const topLevelCaseData = CaseSchema.omit({
      field_content_elements: true,
    }).parse(caseNode);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the case contents.
    const validatedParagraphs = caseNode.field_content_elements
      .map((paragraph: any) => {
        const result = CaseElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating case paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelCaseData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, caseNode }, null, 2));
    return null;
  }
}

export type Case = z.infer<typeof CaseSchema>;
