import FacebookIcon from "@/styles/icons/facebook.svg";
import IstagramIcon from "@/styles/icons/instagram.svg";
import LinkedInIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";
import YouTubeIcon from "@/styles/icons/youtube.svg";
import { useState } from "react";
import { useTranslation } from "next-i18next";

export function SocialLinks() {
  const [pageUrl, setPageUrl] = useState<string>("wunder.io");
  const { t } = useTranslation();



  interface socialMedia {
    id: number;
    location: string;
    url: string;
    icon: JSX.Element;
  }

  const data: socialMedia[] = [
    {
      id: 1,
      location: "Facebook",
      url: `https://www.facebook.com/${pageUrl}`,
      icon: <FacebookIcon className="block h-6 w-6 text-mischka" />,
    },
    {
      id: 2,
      location: "Twitter",
      url: `https://twitter.com/${pageUrl.replace(/\./g, '_')}`,
      icon: <TwitterIcon className="block h-6 w-6 text-mischka" />,
    },
    {
      id: 3,
      location: "LinkedIn",
      url: `https://www.linkedin.com/company/${pageUrl}`,
      icon: <LinkedInIcon className="block h-6 w-6 text-mischka" />,
    },
    {
      id: 4,
      location: "Instagram",
      url: `https://www.instagram.com/${pageUrl}`,
      icon: <IstagramIcon className="block h-6 w-6 text-mischka" />,
    },
    {
      id: 5,
      location: "Youtube",
      url: `https://www.youtube.com/@${pageUrl.replace(/\.io/g, '1585')}`,
      icon: <YouTubeIcon className="block h-6 w-6 text-mischka" />,
    },

  ];

  return (
    <div>
      <ul className="flex flex-wrap justify-center">
        {data?.map(({ id, url, icon, location }) => (
          <li className="m-4" key={id}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {icon}
              {location && (
                <span className="sr-only">
                  {t("share-to", {
                    location,
                  })}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
