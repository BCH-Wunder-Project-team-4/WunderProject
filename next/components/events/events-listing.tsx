import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { EventTeaserComponent } from "@/components/events/event";
import { EventTeaser as EventTeaserType } from "@/lib/zod/events-teaser";
import Link from "next/link";
import { LoadingSpinner } from "@/components/loading-spinner";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export function EventsListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`events-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(
        `/api/events-listing/${router.locale}?limit=${limit}`,
        {
          headers: {
            "accept-language": router.locale,
          },
        },
      );

      return await response.json();
    },
  );

  return (
    <>
      <div>
        {isLoading && <LoadingSpinner />}
        <ul className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {!isLoading &&
            data?.map((event: EventTeaserType) => (
              <li key={event.id} className="flex flex-row justify-center my-8" data-aos="fade">
                <EventTeaserComponent event={event} />
              </li>
            ))}
        </ul>
        {!data?.length && !isLoading && (
          <p className="py-4">{t("no-content-found")}</p>
        )}
        <Link
          href={`/all-events/`}
          className={clsx(
            buttonVariants({ variant: "secondary" }),
            "text-base mr-4 inline-flex px-5 py-3 mb-6",
          )}
          data-aos="fade"
        >
          {t("View all events")}
          <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
        </Link>
      </div>
    </>
  );
}
