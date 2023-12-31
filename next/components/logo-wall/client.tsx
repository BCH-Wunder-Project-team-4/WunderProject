import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Client } from "@/lib/zod/client";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { DrupalNode } from "next-drupal";

interface ClientProps {
  client: Client;
}

export function Client({ client }: ClientProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Link
      href={client.field_link.uri}
      key={client.id}
      target="_blank"
      rel="noopener noreferrer"
      data-aos="fade">
      <div className="p-5">
        <Image
          src={absoluteUrl(client.field_logo.uri.url)}
          width={150}
          height={150}
          alt={client.field_logo.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      </div>
    </Link>
  );
}
