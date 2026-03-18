import Link from "next/link";

import { Lock } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("unauthorized");
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <Lock className="mx-auto size-12 text-primary" />
        <h1 className="mt-4 font-bold text-3xl tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
        <div className="mt-6">
          <Link
            href="dashboard"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-xs transition-colors hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
