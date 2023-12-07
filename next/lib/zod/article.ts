import { DrupalNode } from "next-drupal";
import { ImageShape } from "@/lib/zod/paragraph";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { z } from "zod";

export const ArticleBaseSchema = z.object({
  type: z.literal("node--article"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  title: z.string(),
  field_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
});

const ArticleSchema = ArticleBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  body: z.object({
    processed: z.string(),
  }),
});

export function validateAndCleanupArticle(article: DrupalNode): Article | null {
  try {
    return ArticleSchema.parse(article);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, article }, null, 2));
    return null;
  }
}

export type Article = z.infer<typeof ArticleSchema>;
