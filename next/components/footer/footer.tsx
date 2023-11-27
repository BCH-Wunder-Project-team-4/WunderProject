import { FooterLinks } from "./footerLinks";
import { NewsletterForm } from "./newsletterForm";
import { SocialShare } from "@/components/footer/social-share";

export function Footer() {


  return (
    <footer className="bg-primary-600 text-white" >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:justify-between border-b-finnishwinter border-b-2 py-8">
        <NewsletterForm />
        <FooterLinks />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center py-5 sm:flex-row sm:justify-between">
          <p className="relative w-fit [font-family:'Overpass-Regular',Helvetica] font-normal text-text-mischka text-[14px] tracking-[0] leading-[normal]">
            © 2023 Wunder. All Rights Reserved.
          </p>
          <SocialShare />
        </div>
      </div>
    </footer >
  );
}

