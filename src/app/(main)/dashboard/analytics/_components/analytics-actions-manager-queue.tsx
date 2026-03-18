import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const NEXT_INTERVENTIONS = [
  {
    dealId: "OPP-489",
    priority: "上报",
    owner: "Leila Zhang",
    risk: 81,
    recommendation: "参加下次客户电话并重置关单计划。",
  },
  {
    dealId: "OPP-475",
    priority: "辅导",
    owner: "Omar Ali",
    risk: 76,
    recommendation: "审查商机策略并解除阶段推进阻碍。",
  },
  {
    dealId: "OPP-447",
    priority: "辅导",
    owner: "Sofia Bautista",
    risk: 75,
    recommendation: "审查商机策略并解除阶段推进阻碍。",
  },
] as const;

export function ActionsManagerQueue() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle>经理行动队列</CardTitle>
        <CardDescription>提交预测前完成上报、辅导与重新预测</CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex h-full flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <StatCard label="可行动商机" value="7" />
            <StatCard label="在途收入" value={formatCurrency(811000, { noDecimals: true })} mono />
            <StatCard label="涉及负责人" value="3" />
            <StatCard label="中位风险" value="72" mono />
          </div>

          <div className="space-y-2 rounded-md border bg-muted/20 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-xs">干预组合</p>
              <Badge variant="outline" className="h-5 px-2 text-[11px] tabular-nums">
                上报 {formatCurrency(174000, { noDecimals: true })}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">上报</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  1 个 · 14% · {formatCurrency(174000, { noDecimals: true })}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">辅导</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  4 个 · 57% · {formatCurrency(478000, { noDecimals: true })}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">重新预测</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  2 个 · 29% · {formatCurrency(159000, { noDecimals: true })}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-md border bg-muted/20 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-xs">经理关注点</p>
              <span className="text-muted-foreground text-xs tabular-nums">本预测周期</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>辅导队列</span>
                <span className="text-muted-foreground tabular-nums">
                  4 个 · {formatCurrency(478000, { noDecimals: true })}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>主要负责人</span>
                <span className="text-muted-foreground tabular-nums">Leila Zhang · 3 个</span>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>停滞管道</span>
                <span className="text-muted-foreground tabular-nums">
                  8 个 · {formatCurrency(1151000, { noDecimals: true })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-muted-foreground text-xs">下一步干预</p>

            {NEXT_INTERVENTIONS.map((item) => (
              <div key={`${item.priority}-${item.dealId}`} className="space-y-1 rounded-md border px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm">{item.dealId}</span>
                  <Badge variant="outline" className="h-5 px-2 text-[11px]">
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs">
                  {item.owner} · 风险 {item.risk}
                </p>
                <p className="text-xs">{item.recommendation}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/20 px-3 py-2">
            <span className="text-muted-foreground text-xs">无需干预监控</span>
            <span className="font-medium text-xs tabular-nums">3 个</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-md border bg-muted/20 px-2.5 py-2">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className={mono ? "font-semibold text-base tabular-nums" : "font-semibold text-base"}>{value}</p>
    </div>
  );
}
