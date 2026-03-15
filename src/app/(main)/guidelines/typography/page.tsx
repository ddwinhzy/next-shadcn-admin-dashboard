import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const typeScale = [
  { name: 'H1', size: '48px / 40px / 32px', lineHeight: '1.2', weight: '700', usage: '页面标题' },
  { name: 'H2', size: '36px / 32px / 28px', lineHeight: '1.3', weight: '600', usage: '区块标题' },
  { name: 'H3', size: '24px / 24px / 22px', lineHeight: '1.4', weight: '600', usage: '小节标题' },
  { name: 'H4', size: '20px / 20px / 18px', lineHeight: '1.4', weight: '500', usage: '卡片标题' },
  { name: 'Body', size: '16px', lineHeight: '1.6', weight: '400', usage: '正文' },
  { name: 'Small', size: '14px', lineHeight: '1.5', weight: '400', usage: '辅助文本' },
  { name: 'Caption', size: '12px', lineHeight: '1.5', weight: '400', usage: '说明文字' }
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
          <h1 className="text-2xl font-bold tracking-tight">字体系统</h1>
          <p className="text-muted-foreground">
            字体族、字号层级、字重规范
          </p>
        </div>
      </div>

      {/* Font Families */}
      <Card>
        <CardHeader>
          <CardTitle>字体族</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">主字体</h3>
            <code className="bg-muted px-2 py-1 rounded text-sm">
              Inter, system-ui, -apple-system, sans-serif
            </code>
            <p className="text-muted-foreground mt-2 text-sm">
              用于正文、标题和所有 UI 文字。Inter 是一款专门为屏幕阅读设计的无衬线字体。
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">等宽字体</h3>
            <code className="bg-muted px-2 py-1 rounded text-sm">
              JetBrains Mono, Consolas, monospace
            </code>
            <p className="text-muted-foreground mt-2 text-sm">
              用于代码片段、技术文档和需要等宽对齐的场景。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Type Scale */}
      <Card>
        <CardHeader>
          <CardTitle>字号层级</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            采用响应式字号设计，桌面端 / 平板 / 移动端 三种尺寸。
          </p>

          <div className="space-y-4">
            {typeScale.map((type) => (
              <div key={type.name} className="flex items-center gap-4 py-3 border-b last:border-0">
                <div className="w-20 shrink-0">
                  <span className="font-medium">{type.name}</span>
                </div>
                
                <div className="flex-1">
                  <div style={{ 
                    fontSize: type.size.split(' / ')[0], 
                    fontWeight: type.weight,
                    lineHeight: type.lineHeight
                  }}>
                    设计资产管理平台
                  </div>
                </div>

                <div className="text-sm text-muted-foreground w-32 shrink-0 hidden @xl/main:block">
                  {type.size}
                </div>

                <div className="text-sm text-muted-foreground w-24 shrink-0 hidden @2xl/main:block">
                  字重 {type.weight}
                </div>

                <div className="text-sm text-muted-foreground w-24 shrink-0 hidden @2xl/main:block">
                  {type.usage}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Weights */}
      <Card>
        <CardHeader>
          <CardTitle>字重</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { weight: '400', name: 'Normal', usage: '正文、段落' },
              { weight: '500', name: 'Medium', usage: '强调、标签' },
              { weight: '600', name: 'Semibold', usage: '按钮、小标题' },
              { weight: '700', name: 'Bold', usage: '大标题、重点' }
            ].map((item) => (
              <div key={item.weight} className="flex items-center gap-4">
                <div 
                  className="text-2xl w-32"
                  style={{ fontWeight: item.weight }}
                >
                  Aa
                </div>
                <div className="w-24">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground ml-2">({item.weight})</span>
                </div>
                <div className="text-muted-foreground">{item.usage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>使用规范</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h3>排版原则</h3>
          <ul>
            <li><strong>一致性</strong>: 同一层级的文字使用相同的字号和字重</li>
            <li><strong>对比度</strong>: 通过字号和字重创建视觉层次，引导用户阅读</li>
            <li><strong>呼吸感</strong>: 适当的行高（1.5-1.6）让文字更易读</li>
          </ul>

          <h3>避免事项</h3>
          <ul>
            <li>一个页面不要使用超过 3 种字号</li>
            <li>正文不要使用小于 14px 的字号</li>
            <li>避免使用 lighter (100, 200) 字重，可读性差</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
