import Link from "next/link";
import { ArrowLeft, Grid3X3, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const breakpoints = [
  { name: 'sm', width: '640px', description: '小屏手机' },
  { name: 'md', width: '768px', description: '平板竖屏' },
  { name: 'lg', width: '1024px', description: '平板横屏 / 小笔记本' },
  { name: 'xl', width: '1280px', description: '桌面显示器' },
  { name: '2xl', width: '1536px', description: '大屏显示器' }
];

const spacingScale = [
  { name: '0', value: '0px', usage: '无间距' },
  { name: '1', value: '4px', usage: '极小间距' },
  { name: '2', value: '8px', usage: '小间距' },
  { name: '3', value: '12px', usage: '紧凑间距' },
  { name: '4', value: '16px', usage: '标准间距' },
  { name: '5', value: '20px', usage: '中等间距' },
  { name: '6', value: '24px', usage: '大间距' },
  { name: '8', value: '32px', usage: '组件间距' },
  { name: '10', value: '40px', usage: '区块间距' },
  { name: '12', value: '48px', usage: '大区块间距' }
];

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/guidelines">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        
        <div>
          <h1 className="font-bold text-2xl tracking-tight">布局系统</h1>
          <p className="text-muted-foreground">
            栅格系统、间距规范、断点设置
          </p>
        </div>
      </div>

      {/* Grid System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="size-5" />
            栅格系统
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            采用 12 列栅格系统，配合间距工具类实现灵活的布局。
          </p>

          <div className="border rounded-lg p-6">
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-primary/20 rounded p-2 text-center text-xs">
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              12 列栅格示例
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">常用布局示例</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded p-3 text-center text-sm">两列（1:1）</div>
                <div className="bg-muted rounded p-3 text-center text-sm">两列（1:1）</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted rounded p-3 text-center text-sm">三列</div>
                <div className="bg-muted rounded p-3 text-center text-sm">三列</div>
                <div className="bg-muted rounded p-3 text-center text-sm">三列</div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-muted rounded p-3 text-center text-sm">四列</div>
                <div className="bg-muted rounded p-3 text-center text-sm">四列</div>
                <div className="bg-muted rounded p-3 text-center text-sm">四列</div>
                <div className="bg-muted rounded p-3 text-center text-sm">四列</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacing */}
      <Card>
        <CardHeader>
          <CardTitle>间距系统</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            基于 4px 的基础单位，构建一致的间距体系。
          </p>

          <div className="space-y-3">
            {spacingScale.map((space) => (
              <div key={space.name} className="flex items-center gap-4">
                <div className="w-16 text-sm font-mono">{space.name}</div>
                <div 
                  className="bg-primary h-4 rounded"
                  style={{ width: space.value }}
                />
                <div className="w-16 text-sm text-muted-foreground">{space.value}</div>
                <div className="text-sm text-muted-foreground">{space.usage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Breakpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="size-5" />
            <Smartphone className="size-5" />
            响应式断点
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            使用移动优先的响应式设计，默认样式针对小屏幕，逐步增强到大屏幕。
          </p>

          <div className="space-y-3">
            {breakpoints.map((bp) => (
              <div key={bp.name} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-20">
                  <span className="font-mono font-medium">{bp.name}</span>
                </div>
                <div className="w-24 font-mono text-sm">≥ {bp.width}</div>
                <div className="text-sm text-muted-foreground">{bp.description}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">使用示例</h3>
            <pre className="text-sm font-mono overflow-x-auto">
{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 移动端：1列，平板：2列，桌面：3列 */}
</div>`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Container */}
      <Card>
        <CardHeader>
          <CardTitle>容器宽度</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { name: 'sm', maxWidth: '640px' },
              { name: 'md', maxWidth: '768px' },
              { name: 'lg', maxWidth: '1024px' },
              { name: 'xl', maxWidth: '1280px' },
              { name: '2xl', maxWidth: '1536px' }
            ].map((container) => (
              <div key={container.name} className="flex items-center gap-4">
                <div className="w-20 text-sm font-mono">.container-{container.name}</div>
                <div className="flex-1 bg-muted rounded h-8 relative overflow-hidden">
                  <div 
                    className="bg-primary/30 h-full"
                    style={{ 
                      width: `${(parseInt(container.maxWidth) / 1536) * 100}%`,
                      maxWidth: '100%'
                    }}
                  />
                </div>
                <div className="w-24 text-sm text-muted-foreground">max-width: {container.maxWidth}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
