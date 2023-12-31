import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { MainMenu, MenuToggle } from "@/components/main-menu/main-menu";
import { Menu } from "@/lib/zod/menu";
import SearchIcon from "@/styles/icons/search.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

import { MainMenuFull } from "../main-menu/main-menu-full";
import { LanguageSwitcher } from "./language-switcher";
import ThemeButton from "../dark-mode-button";

interface HeaderProps {
  menu: Menu;
}

export function Header({ menu }: HeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  return (
    <header className="z-50 flex-shrink-0 bg-primary-600 text-white md:sticky md:top-0">
      <nav className="mx-auto flex max-w-6xl flex-row items-center justify-between px-6 py-4">
        <HomeLink />
        <div className="flex flex-row items-center justify-end gap-6 sm:gap-8">
          <div className="hidden lg:block">
            <MainMenuFull menu={menu} />
          </div>
          <ThemeButton />
          <LanguageSwitcher />
          <SearchLink />
          <div className="lg:hidden">
            <MenuToggle isOpen={isMainMenuOpen} setIsOpen={setIsMainMenuOpen} />
          </div>
        </div>
      </nav>
      <MainMenu
        menu={menu}
        isOpen={isMainMenuOpen}
        setIsOpen={setIsMainMenuOpen}
      />
    </header>
  );
}

function HomeLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/" locale={locale} className="inline">
      <WunderIcon className="w-32" />
      <span className="sr-only">{t("homepage-link")}</span>
    </Link>
  );
}

function SearchLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/search" locale={locale} className="hover:underline">
      <span className="sr-only">{t("search")}</span>
      <SearchIcon className="inline-block h-6 w-6" aria-hidden="true" />
    </Link>
  );
}
