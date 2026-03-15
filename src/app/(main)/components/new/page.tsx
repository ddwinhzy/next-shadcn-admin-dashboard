"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  Code, 
  FileText, 
  Package,
  Check
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import type { ComponentCategory } from "@/lib/types";

const categories: { value: ComponentCategory; label: string }[] = [
  { value: 'foundation', label: '基础' },
  { value: 'layout', label: '布局' },
  { value: 'navigation', label: '导航' },
  { value: 'form', label: '表单' },
  { value: 'data-display', label: '数据展示' },
  { value: 'feedback', label: '反馈' },
  { value: 'media', label: '媒体' }
];

export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '' as ComponentCategory | '',
    description: '',
    tags: '',
    documentation: '',
    reactCode: '',
    cssCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Redirect after showing success
    setTimeout(() => {
      router.push('/components');
    }, 1500);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  if (showSuccess) {
    return (
      <div className="@container/main flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="size-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold">组件创建成功！</h1>
        <p className="text-muted-foreground">正在跳转到组件库...</p>
      </div>
    );
  }

  return (
    <div className="@container/main flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/components">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        
        <div>
          <h1 className="font-bold text-2xl tracking-tight flex items-center gap-2">
            <Plus className="size-6" />
            新建组件
          </h1>
          <p className="text-muted-foreground">
            创建一个新的设计组件并添加到组件库
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">
              <Package className="mr-2 size-4" />
              基本信息
            </TabsTrigger>
            <TabsTrigger value="documentation">
              <FileText className="mr-2 size-4" />
              文档
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="mr-2 size-4" />
              代码
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>
                  填写组件的基本信息，这些信息将显示在组件库列表中
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">组件名称 *</Label>
                  <Input
                    id="name"
                    placeholder="例如：Button、Card、Modal"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        name,
                        slug: generateSlug(name)
                      }));
                    }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL 标识符</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="将自动生成，也可手动修改"
                  />
                  <p className="text-xs text-muted-foreground">
                    用于 URL 访问，例如 /components/{formData.slug || 'button'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">分类 *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as ComponentCategory }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择组件分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">描述 *</Label>
                  <Textarea
                    id="description"
                    placeholder="简要描述这个组件的用途..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">标签</Label>
                  <Input
                    id="tags"
                    placeholder="form, button, action（用逗号分隔）"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    标签有助于搜索和分类，多个标签用逗号分隔
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>使用文档</CardTitle>
                <CardDescription>
                  编写组件的使用说明，支持 Markdown 格式
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="documentation">文档内容</Label>
                  <Textarea
                    id="documentation"
                    placeholder={`# ${formData.name || '组件名称'}

## 概述

简要介绍这个组件...

## 使用方法

\`\`\`tsx
import { ${formData.name || 'Component'} } from '@/components';

export default function Example() {
  return <${formData.name || 'Component'} />;
}
\`\`\`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | string | 'default' | 样式变体 |
| size | string | 'md' | 尺寸大小 |`}
                    value={formData.documentation}
                    onChange={(e) => setFormData(prev => ({ ...prev, documentation: e.target.value }))}
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">Markdown</Badge>
                  <span>支持代码块、表格、列表等格式</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>代码片段</CardTitle>
                <CardDescription>
                  提供组件的代码实现，方便开发者使用
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="reactCode">React 组件代码</Label>
                  <Textarea
                    id="reactCode"
                    placeholder={`export interface ${formData.name || 'Component'}Props {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ${formData.name || 'Component'}({
  variant = 'default',
  size = 'md',
  disabled = false,
  children
}: ${formData.name || 'Component'}Props) {
  return (
    <div className={\`\${variant} \${size} \${disabled ? 'disabled' : ''}\`}\>
      {children}
    </div>
  );
}`}
                    value={formData.reactCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, reactCode: e.target.value }))}
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="cssCode">CSS / Tailwind 代码</Label>
                  <Textarea
                    id="cssCode"
                    placeholder={`/* ${formData.name || 'Component'} 样式 */
.${formData.slug || 'component'} {
  /* 基础样式 */
}

.${formData.slug || 'component'}.primary {
  @apply bg-primary text-primary-foreground;
}

.${formData.slug || 'component'}.disabled {
  @apply opacity-50 cursor-not-allowed;
}`}
                    value={formData.cssCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, cssCode: e.target.value }))}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            * 为必填项
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" type="button" asChild>
              <Link href="/components">取消</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '创建中...' : '创建组件'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
