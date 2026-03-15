import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTokens } from "@/lib/data/mock";

const colorTokens = mockTokens.filter(t => t.category === 'colors');

const primaryColors = colorTokens.filter(t => t.name.includes('primary'));
const neutralColors = [
  { name: 'color-white', value: '#FFFFFF' },
  { name: 'color-black', value: '#000000' },
  { name: 'color-gray-100', value: '#F1F5F9' },
  { name: 'color-gray-500', value: '#64748B' },
  { name: 'color-gray-900', value: '#0F172A' }
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
          <h1 className="text-2xl font-bold tracking-tight">色彩系统</h1>
          <p className="text-muted-foreground">
            品牌色板、语义颜色和使用规范
          </p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>概述</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            我们的色彩系统分为三个层级：
          </p>
          <ul>
            <li><strong>基础色 (Primitive)</strong>: 原始色值，如纯黑、纯白</li>
            <li><strong>语义色 (Semantic)</strong>: 有特定含义的颜色，如主色调、错误色</li>
            <li><strong>组件色 (Component)</strong>: 组件专用颜色，如按钮背景、输入框边框</li>
          </ul>
        </CardContent>
      </Card>

      {/* Primary Colors */}
      <Card>
        <CardHeader>
          <CardTitle>主色调</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            主色调使用橙色，传递活力和创新。用于按钮、链接、重点强调等。
          </p>
          
          <div className="grid @2xl/main:grid-cols-2 grid-cols-1 gap-4">
            {primaryColors.map((color) => (
              <ColorCard key={color.name} token={color} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Neutral Colors */}
      <Card>
        <CardHeader>
          <CardTitle>中性色</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            用于文本、边框和背景。从白色到黑色的完整灰度色板。
          </p>
          
          <div className="grid @2xl/main:grid-cols-2 grid-cols-1 gap-4">
            {neutralColors.map((color) => (
              <ColorCard key={color.name} token={color} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>使用规范</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h3>主色调使用场景</h3>
          <ul>
            <li>主要按钮（Primary Button）</li>
            <li>链接文字</li>
            <li>重点高亮</li>
            <li>选中状态</li>
          </ul>

          <h3>中性色使用场景</h3>
          <ul>
            <li>文本颜色（标题、正文、辅助文字）</li>
            <li>边框和分割线</li>
            <li>背景色（页面、卡片、悬浮状态）</li>
            <li>禁用状态</li>
          </ul>

          <h3>可访问性要求</h3>
          <ul>
            <li>文字与背景对比度至少 4.5:1（AA 级）</li>
            <li>大号文字（18px+ 或 14px+ 粗体）对比度至少 3:1</li>
            <li>避免仅用颜色传达信息，需配合图标或文字</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function ColorCard({ token }: { token: { name: string; value: string } }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        className="h-20 w-full"
        style={{ backgroundColor: token.value }}
      />
      <div className="p-3">
        <div className="font-medium text-sm">{token.name}</div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground font-mono">{token.value}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-6"
            onClick={() => navigator.clipboard.writeText(token.value)}
          >
            <Copy className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
