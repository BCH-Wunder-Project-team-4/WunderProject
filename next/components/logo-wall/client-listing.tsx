import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";

import { Client } from "@/components/logo-wall/client";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Client as ClientType } from "@/lib/zod/client";

export function ClientsListing({
  listingId,
}: {
  listingId: string;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`clients-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(
        `/api/clients-listing/${router.locale}`,
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
      {isLoading && <LoadingSpinner />}
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {!isLoading &&
          data?.map((client: ClientType) => (
            <li key={client.id}>
              <Client client={client} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}
