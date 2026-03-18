"use client";

import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export function IncomeReliability() {
  const t = useTranslations("finance.income");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="space-y-0.5">
          <p className="font-medium text-xl">{t("highReliability")}</p>
          <p className="text-muted-foreground text-xs">{t("basedOn")}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="font-medium text-lg">{t("fixedIncome")}</p>
            <p className="text-muted-foreground text-xs">{t("fixedDesc")}</p>
          </div>
          <p className="font-medium text-lg">{formatCurrency(90000, { noDecimals: true })}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="font-medium text-lg">{t("variableIncome")}</p>
            <p className="text-muted-foreground text-xs">{t("variableDesc")}</p>
          </div>
          <p className="font-medium text-lg">{formatCurrency(46500, { noDecimals: true })}</p>
        </div>
        <Separator />
        <p className="text-muted-foreground text-xs">
          {t("consistencyTrend")} <span className="font-medium text-primary">{t("stable")}</span>
        </p>
      </CardContent>
    </Card>
  );
}
