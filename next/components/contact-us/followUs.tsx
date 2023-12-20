import FacebookIcon from "@/styles/icons/facebook.svg";
import IstagramIcon from "@/styles/icons/instagram.svg";
import Link from "next/link";
import LinkedInIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";
import YouTubeIcon from "@/styles/icons/youtube.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function FollowUs() {
    const { t } = useTranslation();
    const [pageUrl, setPageUrl] = useState<string>("wunder.io");
    return (
        <div className="py-10">
            <div>
                <h1 className="text-center text-primary-500 font-bold text-2xl">{t("Follow Us")}</h1>
            </div>
            <div>
                <p className="text-center text-sm pb-2 font-semibold">{t("Connect with various social media platforms")}</p>
            </div>
            <div className="flex items-center justify-around">
                <div>

                    <Link href={`https://www.facebook.com/${pageUrl}`} target="_blank" className="hover:scale-110">
                        <div className="rounded-full p-5 bg-white hover:scale-110">
                            <FacebookIcon className="block h-6 w-6 text-primary-500" />
                        </div>
                    </Link>

                </div>
                <div>
                    <Link href={`https://www.linkedin.com/company/${pageUrl}`} target="_blank" className="hover:scale-110">
                        <div className="rounded-full p-5 bg-white hover:scale-110">
                            <LinkedInIcon className="block h-6 w-6 text-primary-500 " />
                        </div>
                    </Link>

                </div>
                <div>
                    <Link href={`https://www.instagram.com/${pageUrl}`} target="_blank" className="hover:scale-110">
                        <div className="rounded-full p-5 bg-white hover:scale-110">
                            <IstagramIcon className="block h-6 w-6 text-primary-500" />
                        </div>
                    </Link>

                </div>
                <div>
                    <Link href={`https://www.twitter.com/${pageUrl.replace(/\./g, '_')}`} target="_blank" className="hover:scale-110">
                        <div className="rounded-full p-5 bg-white hover:scale-110">
                            <TwitterIcon className="block h-6 w-6 text-primary-500" />
                        </div>
                    </Link>

                </div>
                <div>
                    <Link href={`https://www.youtube.com/@${pageUrl.replace(/\.io/g, '1585')}`} target="_blank" className="hover:scale-110">
                        <div className="rounded-full p-5 bg-white hover:scale-110">
                            <YouTubeIcon className="block h-6 w-6 text-primary-500" />
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}