import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { env } from "@/env";

export type ResourceType =
  | "node--frontpage"
  | "node--contact_us"
  | "node--frontpage"
  | "node--page"
  | "node--article"
  | "node--job"
  | "node--case"
  | "node--employee"
  | "node--office"
  | "node--client"
  | "node--events"
  | "node--service"
  | "node--expert_talks"
  | "node--about_wunder_subpage";

export function getNodePageJsonApiParams(resourceType: ResourceType) {
  const apiParams = new DrupalJsonApiParams().addFilter(
    "field_site.meta.drupal_internal__target_id",
    env.DRUPAL_SITE_ID,
  );
  // The page content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--page") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
        "field_content_elements.field_accordion_items.field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_images.field_media_image",
        "field_content_elements.field_scrolling_numbers_items",
        "field_content_elements.field_dark_image.field_media_image",
        "field_content_elements.field_trilogy_images.field_media_image",
        "field_content_elements.field_story_items",
      ])
      .addFields("node--page", [
        "title",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }

  // The frontpage content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--frontpage") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      // Only published frontpages:
      .addFilter("status", "1")
      .addFields("node--frontpage", [
        "title",
        "field_content_elements",
        "metatag",
      ]);
  }
  if (resourceType === "node--contact_us") {
    apiParams
      .addInclude([
        "field_contact_content_elements",
        "field_contact_content_elements.field_employees_content_elements",
        "field_contact_content_elements.field_offices_content_elements",
        "field_contact_content_elements.field_image.field_media_image",
        "field_contact_content_elements.field_employees_content_elements.field_image.field_media_image",
        "field_contact_invoicing"
      ])
      // Only published frontpages:
      .addFilter("status", "1")
      .addFields("node--contact_us", [
        "title",
        "field_contact_content_elements",
        "field_contact_invoicing",
        "metatag",
      ]);
  }

  // The article content type has an image field, and author information:
  if (resourceType === "node--article") {
    apiParams.addInclude([
      "field_image",
      "uid",
      "uid.field_profile_picture",
      "field_content_elements",
      "field_content_elements.field_image.field_media_image",
      "field_content_elements.field_video",
      "field_content_elements.field_file_attachments.field_media_document",
      "field_content_elements.field_accordion_items",
      "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
      "field_content_elements.field_accordion_items.field_content_elements.field_video",
    ]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "field_profile_picture",
      "created",
      "field_image",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
      "field_content_elements",
    ]);
  }
  if (resourceType === "node--expert_talks") {
    apiParams.addInclude(["field_image", "uid", "field_experts_photo"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_image",
      "field_experts_photo",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
      "field_name",
      "field_expert_job_title",
    ]);
  }
  if (resourceType === "node--job") {
    apiParams.addInclude([
      "field_image",
      "uid",
      "field_country",
      "field_office",
      "field_content_elements",
      "field_content_elements.field_image.field_media_image",
      "field_content_elements.field_video",
      "field_content_elements.field_file_attachments.field_media_document",
      "field_content_elements.field_accordion_items",
      "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
      "field_content_elements.field_accordion_items.field_content_elements.field_video",
    ]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_image",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
      "field_content_elements",
      "field_country",
      "field_office",
    ]);
  }

  if (resourceType === "node--case") {
    apiParams
      .addInclude([
        "field_image",
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
        "field_content_elements.field_scrolling_numbers_items",
        "field_industry",
        "field_solution",
        "field_technology",
      ])
      .addFields("node--case", [
        "title",
        "field_excerpt",
        "field_industry",
        "field_solution",
        "field_technology",
        "field_date",
        "field_image",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }
  if (resourceType === "node--employee") {
    apiParams.addInclude(["field_employee_image", "uid"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_name",
      "field_employee_image",
      "field_employee_email",
      "field_employee_phone",
      "field_employee_position",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]);
  }
  if (resourceType === "node--office") {
    apiParams.addInclude(["uid"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_office_address_one",
      "field_office_address_two",
      "field_office_email",
      "field_office_city",
      "field_office_country",
      "field_office_geocode_latitude",
      "field_office_geocode_longitude",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]);
  }
  if (resourceType === "node--client") {
    apiParams.addInclude(["uid", "field_logo"]);
    apiParams.addFields(resourceType, ["field_logo", "field_link"]);
  }
  if (resourceType === "node--events") {
    apiParams.addInclude([
      "uid",
      "field_event_image",
      "field_event_speakers",
      "field_event_speakers.field_event_speakers_image",
    ]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_name",
      "field_event_image",
      "field_event_date",
      "field_event_location",
      "field_event_address",
      "field_event_description",
      "field_event_geocode_latitude",
      "field_event_geocode_longitude",
      "field_event_duration",
      "field_event_speakers",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]);
  }
  if (resourceType === "node--service") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      .addFields("node--service", [
        "title",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }

  if (resourceType === "node--about_wunder_subpage") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
        "field_content_elements.field_accordion_items.field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_scrolling_numbers_items",
        "field_content_elements.field_trilogy_images.field_media_image",
        "field_content_elements.field_contact_data",
        "field_content_elements.field_contact_data.field_image.field_media_image",
        "field_content_elements.field_office_info_items",
      ])
      .addFields("node--about_wunder_subpage", [
        "title",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }

  return apiParams;
}
