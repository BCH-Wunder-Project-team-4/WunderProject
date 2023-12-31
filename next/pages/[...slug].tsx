import {
  Article as ArticleType,
  validateAndCleanupArticle,
} from "@/lib/zod/article";
import { Case as CaseType, validateAndCleanupCase } from "@/lib/zod/case";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { DrupalNode, DrupalTranslatedPath } from "next-drupal";
import { Event as EventType, validateAndCleanupEvent } from "@/lib/zod/events";
import { ExpertTalk as ExpertTalkType, validateAndCleanupExpertTalk } from "@/lib/zod/expertTalk";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Job as JobType,
  validateAndCleanupJob,
} from "@/lib/zod/job";
import {
  LanguageLinks,
  createLanguageLinks,
} from "@/lib/contexts/language-links-context";
import { Page as PageType, validateAndCleanupPage } from "@/lib/zod/page";
import { Service as ServiceType, validateAndCleanupService } from "@/lib/zod/service";
import { AboutWunderSubpage as AboutWunderSubpageType, validateAndCleanupAboutWunderSubpage } from "@/lib/zod/about-wunder-subpage";

import { Article } from "@/components/article";
import { Case } from "@/components/cases/case";
import { ExpertTalk } from "@/components/expertTalk/expertTalk";
import { Job } from "@/components/careers/job";
import { Meta } from "@/components/meta";
import { Page } from "@/components/page";
import { ResourceType } from "@/lib/drupal/get-node-page-json-api-params";
import { Service } from "@/components/offering/service";
import { AboutWunderSubpage } from "@/components/about-wunder-subpage";
import { SingleEventPath } from "@/components/events/singleEventPath";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";

const RESOURCE_TYPES = ["node--article", "node--page", "node--job", "node--case", "node--events", "node--service", "node--expert_talks", "node--about_wunder_subpage"];

export default function CustomPage({
  resource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!resource) return null;

  return (
    <>
      <Meta title={resource.title} metatags={resource.metatag} />
      {resource.type === "node--article" && <Article article={resource} />}
      {resource.type === "node--job" && <Job job={resource} />}
      {resource.type === "node--page" && <Page page={resource} />}
      {resource.type === "node--case" && <Case caseNode={resource} />}
      {resource.type === "node--events" && <SingleEventPath event={resource} />}
      {resource.type === "node--expert_talks" && <ExpertTalk expertTalk={resource} />}
      {resource.type === "node--service" && <Service service={resource} />}
      {resource.type === "node--about_wunder_subpage" && <AboutWunderSubpage about_wunder_subpage={resource} />}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context);
  return {
    paths: paths,
    fallback: "blocking",
  };
};

interface PageProps extends CommonPageProps {
  resource: PageType | ArticleType | JobType | CaseType | EventType | ServiceType | ExpertTalkType | AboutWunderSubpageType;
  languageLinks: LanguageLinks;
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const path: DrupalTranslatedPath =
    await drupal.translatePathFromContext(context);

  if (!path) {
    return {
      notFound: true,
    };
  }

  if (path.redirect?.length) {
    const [redirect] = path.redirect;
    return {
      redirect: {
        destination: redirect.to,
        permanent: false,
      },
    };
  }

  const type = path.jsonapi.resourceName as ResourceType;

  // If we are looking at the path of a frontpage node,
  // redirect the user to the homepage for that language:

  if (type === "node--frontpage") {
    return {
      redirect: {
        destination: "/" + context.locale,
        permanent: false,
      },
    };
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params: getNodePageJsonApiParams(type).getQueryObject(),
    },
  );

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }

  // Add information about possible other language versions of this node.
  const nodeTranslations = await getNodeTranslatedVersions(
    resource,
    context,
    drupal,
  );
  const languageLinks = createLanguageLinks(nodeTranslations);

  const validatedResource =
    type === "node--article"
      ? validateAndCleanupArticle(resource)
      : type === "node--page"
        ? validateAndCleanupPage(resource)
        : type === "node--job"
          ? validateAndCleanupJob(resource)
          : type === "node--expert_talks"
            ? validateAndCleanupExpertTalk(resource)
            : type === "node--case"
              ? validateAndCleanupCase(resource)
              : type === "node--events"
                ? validateAndCleanupEvent(resource)
                : type === "node--service"
                  ? validateAndCleanupService(resource)
                  : type === "node--about_wunder_subpage"
                    ? validateAndCleanupAboutWunderSubpage(resource)
                    : null;



  return {
    props: {
      ...(await getCommonPageProps(context)),
      resource: validatedResource,
      languageLinks,
    },
    revalidate: 60,
  };
};
