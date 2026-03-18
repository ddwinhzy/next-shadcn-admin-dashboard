"use client";
"use no memo";

import { useSortable } from "@dnd-kit/sortable";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { CircleCheckIcon, EllipsisVerticalIcon, GripVerticalIcon, LoaderIcon, TrendingUpIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

import type { ProposalSectionsRow } from "./schema";

const STATUS_LABELS: Record<string, string> = {
  Done: "完成",
  "In Progress": "进行中",
  "Not Started": "未开始",
};

const TYPE_LABELS: Record<string, string> = {
  "Table of Contents": "目录",
  "Executive Summary": "执行摘要",
  "Technical Approach": "技术方案",
  Design: "设计",
  Capabilities: "能力",
  "Focus Documents": "重点文件",
  Narrative: "叙述",
  "Cover Page": "封面",
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon />
      <span className="sr-only">拖动排序</span>
    </Button>
  );
}

function ProposalSectionDetailViewer({ item }: { item: ProposalSectionsRow }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>显示过去 6 个月的访客总数</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 font-medium leading-none">
                  本月上涨 5.2% <TrendingUpIcon />
                </div>
                <div className="text-muted-foreground">过去 6 个月访客总数。</div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">标题</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">类型</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Table of Contents">目录</SelectItem>
                      <SelectItem value="Executive Summary">执行摘要</SelectItem>
                      <SelectItem value="Technical Approach">技术方案</SelectItem>
                      <SelectItem value="Design">设计</SelectItem>
                      <SelectItem value="Capabilities">能力</SelectItem>
                      <SelectItem value="Focus Documents">重点文件</SelectItem>
                      <SelectItem value="Narrative">叙述</SelectItem>
                      <SelectItem value="Cover Page">封面</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">状态</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Done">完成</SelectItem>
                      <SelectItem value="In Progress">进行中</SelectItem>
                      <SelectItem value="Not Started">未开始</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">目标</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">上限</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">审阅人</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="选择审阅人" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                    <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                    <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>提交</Button>
          <DrawerClose asChild>
            <Button variant="outline">完成</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function createInlineSaveHandler(header: string) {
  return (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: `正在保存 ${header}`,
      success: "已保存",
      error: "保存失败",
    });
  };
}

export const proposalSectionsColumns: ColumnDef<ProposalSectionsRow>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="全选"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="选择行"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: "标题",
    cell: ({ row }) => <ProposalSectionDetailViewer item={row.original} />,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "模块类型",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {TYPE_LABELS[row.original.type] ?? row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.status === "Done" ? (
          <CircleCheckIcon className="fill-green-500 stroke-primary-foreground dark:fill-green-600" />
        ) : (
          <LoaderIcon />
        )}
        {STATUS_LABELS[row.original.status] ?? row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "target",
    header: () => <div className="w-full text-right">目标</div>,
    cell: ({ row }) => (
      <form onSubmit={createInlineSaveHandler(row.original.header)}>
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          目标
        </Label>
        <Input
          id={`${row.original.id}-target`}
          defaultValue={row.original.target}
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:focus-visible:bg-input/30 dark:hover:bg-input/30"
        />
      </form>
    ),
  },
  {
    accessorKey: "limit",
    header: () => <div className="w-full text-right">上限</div>,
    cell: ({ row }) => (
      <form onSubmit={createInlineSaveHandler(row.original.header)}>
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          上限
        </Label>
        <Input
          id={`${row.original.id}-limit`}
          defaultValue={row.original.limit}
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:focus-visible:bg-input/30 dark:hover:bg-input/30"
        />
      </form>
    ),
  },
  {
    accessorKey: "reviewer",
    header: "审阅人",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            审阅人
          </Label>
          <Select>
            <SelectTrigger
              id={`${row.original.id}-reviewer`}
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
            >
              <SelectValue placeholder="指定审阅人" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
            <EllipsisVerticalIcon />
            <span className="sr-only">打开菜单</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>编辑</DropdownMenuItem>
          <DropdownMenuItem>复制</DropdownMenuItem>
          <DropdownMenuItem>收藏</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">删除</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export function DraggableProposalSectionsRow({ row }: { row: Row<ProposalSectionsRow> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  );
}
