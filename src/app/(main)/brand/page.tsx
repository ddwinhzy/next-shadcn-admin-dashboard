import Link from "next/link";
import { 
  Palette, 
  Image, 
  Type, 
  Download,
  ArrowRight
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const brandSections = [
  {
    title: 'Logo 库',
    description: '下载品牌 Logo，支持多种格式和尺寸',
    href: '/brand/logos',
    icon: Image,
    color: 'bg-blue-500',
    formats: ['PNG', 'SVG', 'PDF'],
    comingSoon: true
  },
  {
    title: '配色方案',
    description: '品牌色板、辅助色、渐变色',
    href: '/brand/palettes',
    icon: Palette,
    color: 'bg-orange-500',
    formats: ['HEX', 'RGB', 'HSL'],
    comingSoon: true
  },
  {
    title: '字体资源',
    description: '品牌字体下载和 @font-face 代码',
    href: '/brand/fonts',
    icon: Type,
    color: 'bg-purple-500',
    formats: ['TTF', 'WOFF', 'WOFF2'],
    comingSoon: true
  }
];

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl tracking-tight flex items-center gap-2">
          <Palette className="size-6" />
          品牌资产
        </h1>
        <p className="text-muted-foreground">
          管理和下载品牌相关的所有资产和素材
        </p>
      </div>

      {/* Info Card */}
      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Download className="size-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                品牌资产库提供 Logo、配色、字体等资源的下载。
                所有资源都遵循品牌规范，确保对外展示的一致性。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Grid */}
      <div className="grid @xl/main:grid-cols-3 grid-cols-1 gap-4">
        {brandSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className={`hover:bg-accent/50 transition-colors cursor-pointer h-full ${section.comingSoon ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center text-white`}>
                    <section.icon className="size-5" />
                  </div>
                  {section.comingSoon && (
                    <Badge variant="secondary">即将上线</Badge>
                  )}
                </div>
                
                <CardTitle className="mt-3">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {section.formats.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                  {!section.comingSoon && (
                    <div className="flex items-center text-sm text-primary">
                      进入 <ArrowRight className="ml-1 size-4" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Brand Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>品牌使用规范</CardTitle>
          <CardDescription>使用品牌资产时需要遵循的基本原则</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h3>Logo 使用规范</h3>
          <ul>
            <li>不要拉伸、压缩或旋转 Logo</li>
            <li>保持 Logo 的安全空间（周围留白）</li>
            <li>在浅色背景使用深色 Logo，在深色背景使用浅色 Logo</li>
            <li>不要改变 Logo 的颜色或添加效果</li>
          </ul>

          <h3>配色使用规范</h3>
          <ul>
            <li>主色调用于按钮、链接和重点强调</li>
            <li>辅助色用于图表、标签和装饰元素</li>
            <li>中性色用于文本、边框和背景</li>
            <li>确保颜色对比度符合可访问性标准</li>
          </ul>

          <h3>字体使用规范</h3>
          <ul>
            <li>标题使用品牌主字体</li>
            <li>正文使用系统字体栈作为回退</li>
            <li>保持字号层级一致性</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
