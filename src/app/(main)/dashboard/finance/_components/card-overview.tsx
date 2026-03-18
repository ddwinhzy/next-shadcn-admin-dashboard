"use client";

import { addDays, format } from "date-fns";
import { Home, Receipt, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { siApple, siMastercard } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

const now = new Date();

const upcomingPayments = [
  {
    id: 1,
    icon: Home,
    title: "公寓租金",
    amount: 1200,
    date: `应付于 ${format(addDays(now, 2), "do MMMM yyyy")}`,
  },
  {
    id: 2,
    icon: Zap,
    title: "电费",
    amount: 75,
    date: `应付于 ${format(addDays(now, 2), "do MMMM yyyy")}`,
  },
  {
    id: 3,
    icon: Sparkles,
    title: "ChatGPT Plus",
    amount: 20,
    date: `应付于 ${format(addDays(now, 7), "do MMMM yyyy")}`,
  },
  {
    id: 4,
    icon: Receipt,
    title: "信用卡还款",
    amount: 420,
    date: `应付于 ${format(addDays(now, 9), "do MMMM yyyy")}`,
  },
];

export function CardOverview() {
  const t = useTranslations("finance.card");
  return (
    <Card className="shadow-xs">
      <CardHeader className="items-center">
        <CardTitle>{t("myCard")}</CardTitle>
        <CardDescription>{t("cardSubtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full place-items-center">
            <div className="relative flex aspect-8/5 w-full max-w-100 flex-col justify-between overflow-hidden rounded-xl bg-primary p-6">
              <div className="flex items-start justify-between">
                <SimpleIcon icon={siApple} className="size-5 fill-primary-foreground sm:size-8" />
              </div>

              <div className="space-y-1">
                <p className="font-mono text-primary-foreground/90 text-sm tracking-[0.15em] sm:text-lg">
                  •••• •••• •••• 2301
                </p>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <p className="font-medium font-mono text-primary-foreground text-sm uppercase tracking-wide">
                    Arham Khan
                  </p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] text-primary-foreground/80 uppercase tracking-wider">
                        {t("validThru")}
                      </p>
                      <p className="font-mono text-primary-foreground/80 text-xs">06/30</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-foreground/80 uppercase tracking-wider">{t("cvv")}</p>
                      <p className="font-mono text-primary-foreground/80 text-xs">•••</p>
                    </div>
                  </div>
                </div>
                <SimpleIcon icon={siMastercard} className="size-7 fill-primary-foreground/80 sm:size-10" />
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("cardType")}</span>
              <span className="font-medium tabular-nums">{t("virtual")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("billingCycle")}</span>
              <span className="font-medium tabular-nums">{t("billingCycleValue")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("cardLimit")}</span>
              <span className="font-medium tabular-nums">$62,000.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("availableBalance")}</span>
              <span className="font-medium tabular-nums">$13,100.06</span>
            </div>
          </div>

          <div className="space-y-1">
            <Button className="w-full" size="sm">
              {t("manageCard")}
            </Button>

            <Button className="w-full" variant="outline" size="sm">
              {t("addCard")}
            </Button>
          </div>
          <Separator />

          <div className="space-y-4">
            <h6 className="text-muted-foreground text-sm uppercase">{t("upcomingPayments")}</h6>

            <div className="space-y-4">
              {upcomingPayments.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-2">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <transaction.icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex w-full items-end justify-between">
                    <div>
                      <p className="font-medium text-sm">{transaction.title}</p>
                      <p className="text-muted-foreground text-xs">{transaction.date}</p>
                    </div>
                    <div>
                      <span className="font-medium text-destructive text-sm tabular-nums leading-none">
                        {formatCurrency(transaction.amount, {
                          noDecimals: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full" size="sm" variant="outline">
              {t("viewAllPayments")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
