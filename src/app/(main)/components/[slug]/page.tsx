import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Package, 
  ArrowLeft,
  Edit,
  Share,
  Download
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockComponents } from "@/lib/data/mock";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const statusLabels: Record<string, string> = {
  draft: '草稿',
  review: '审核中',
  published: '已发布',
  deprecated: '已弃用'
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const component = mockComponents.find(c => c.slug === slug);

  if (!component) {
    notFound();
  }

  return (
    <div className="@container/main flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/components">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{component.name}</h1>
              <Badge 
                variant={component.status === 'published' ? 'default' : 'secondary'}
              >
                {statusLabels[component.status]}
              </Badge>
            </div>
            <p className="text-muted-foreground">{component.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share className="mr-2 size-4" />
            分享
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 size-4" />
            编辑
          </Button>
          <Button size="sm">
            <Download className="mr-2 size-4" />
            导出
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="preview">预览</TabsTrigger>
          <TabsTrigger value="documentation">文档</TabsTrigger>
          <TabsTrigger value="developer">开发者</TabsTrigger>
          <TabsTrigger value="versions">版本历史</TabsTrigger>
          <TabsTrigger value="related">相关组件</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <div className="border rounded-lg p-8 min-h-[400px] flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <Package className="size-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">{component.name} 预览</h3>
              <p className="text-muted-foreground mt-2">
                这里将展示组件的交互式预览
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <div className="prose max-w-none">
            <h2>使用说明</h2>
            <p>
              {component.name} 是一个{component.description}
            </p>
            
            <h3>基础用法</h3>
            <pre>
              <code>
{`import { ${component.name} } from '@/components'

export default function Example() {
  return <${component.name} />
}`}
              </code>
            </pre>
            
            <h3>Props</h3>
            <table>
              <thead>
                <tr>
                  <th>属性</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>variant</td>
                  <td>string</td>
                  <td>'default'</td>
                  <td>样式变体</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>string</td>
                  <td>'md'</td>
                  <td>尺寸大小</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>是否禁用</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="developer" className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">React</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>
{`export function ${component.name}(props) {
  return <div>{props.children}</div>
}`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">CSS Variables</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>
{`:root {
  --color-primary: #F97316;
  --spacing-md: 16px;
  --radius-md: 8px;
}`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Tailwind</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>
{`<div className="bg-primary-500 px-4 py-2 rounded-md">
  ${component.name}
</div>`}
                </code>
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">v2.0 (当前)</div>
                  <div className="text-sm text-muted-foreground">添加 loading 状态和图标支持</div>
                </div>
                <div className="text-sm text-muted-foreground">2026-03-10</div>
              </div>
            </div>

            <div className="border rounded-lg p-4 opacity-60">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">v1.9</div>
                  <div className="text-sm text-muted-foreground">修复 disabled 状态下的 hover 效果</div>
                </div>
                <div className="text-sm text-muted-foreground">2026-03-01</div>
              </div>
            </div>

            <div className="border rounded-lg p-4 opacity-60">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">v1.0</div>
                  <div className="text-sm text-muted-foreground">初始版本</div>
                </div>
                <div className="text-sm text-muted-foreground">2026-01-15</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="related" className="space-y-4">
          <div className="text-muted-foreground">
            相关组件功能将在后续版本实现
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
