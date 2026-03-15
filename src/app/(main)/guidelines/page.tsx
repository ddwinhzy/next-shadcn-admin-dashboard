import Link from "next/link";
import { 
  FileText, 
  Palette, 
  Type, 
  LayoutGrid,
  ArrowRight
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const guidelineSections = [
  {
    title: '色彩系统',
    description: '品牌色板、语义颜色、使用规范',
    href: '/guidelines/colors',
    icon: Palette,
    color: 'bg-orange-500'
  },
  {
    title: '字体系统',
    description: '字体族、字号层级、字重规范',
    href: '/guidelines/typography',
    icon: Type,
    color: 'bg-blue-500'
  },
  {
    title: '布局系统',
    description: '栅格系统、间距规范、断点设置',
    href: '/guidelines/layout',
    icon: LayoutGrid,
    color: 'bg-green-500'
  }
];

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="size-6" />
          设计规范
        </h1>
        <p className="text-muted-foreground">
          设计系统规范文档，包含色彩、字体、布局等设计标准
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid @xl/main:grid-cols-3 grid-cols-1 gap-4">
        {guidelineSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center text-white mb-3`}>
                  <section.icon className="size-5" />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-primary">
                  查看详情 <ArrowRight className="ml-1 size-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle>最近更新</CardTitle>
          <CardDescription>规范的变更历史</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div className="flex-1">
                <div className="font-medium">色彩系统 v2.0</div>
                <div className="text-sm text-muted-foreground">更新主色调为橙色，添加更多语义 Token</div>
                <div className="text-xs text-muted-foreground mt-1">2026-03-10 · 王小明</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div className="flex-1">
                <div className="font-medium">字体系统 v1.5</div>
                <div className="text-sm text-muted-foreground">添加响应式字号，优化移动端体验</div>
                <div className="text-xs text-muted-foreground mt-1">2026-02-20 · 李小红</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-gray-500 mt-2" />
              <div className="flex-1">
                <div className="font-medium">布局系统 v1.0</div>
                <div className="text-sm text-muted-foreground">初始版本，定义栅格和间距系统</div>
                <div className="text-xs text-muted-foreground mt-1">2026-01-20 · 王小明</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
