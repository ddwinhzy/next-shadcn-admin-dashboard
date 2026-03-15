import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Package, 
  ArrowLeft,
  Edit,
  Share,
  Download,
  Check,
  Copy,
  FileCode,
  Palette,
  Clock,
  Tag
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MarkdownRenderer } from "@/components/asset/MarkdownRenderer";
import { CodeBlock } from "@/components/asset/CodeBlock";
import { mockComponents, mockVersions, mockUsers, mockTokens } from "@/lib/data/mock";

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

const statusColors: Record<string, string> = {
  draft: 'bg-yellow-500',
  review: 'bg-blue-500',
  published: 'bg-green-500',
  deprecated: 'bg-gray-500'
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const component = mockComponents.find(c => c.slug === slug);

  if (!component) {
    notFound();
  }

  // Get full version data
  const version = mockVersions.find(v => v.id === component.currentVersionId);
  const author = mockUsers.find(u => u.id === component.authorId);
  
  // Get related tokens
  const relatedTokens = mockTokens.filter(t => 
    version?.tokens?.includes(t.id)
  );

  // Get all versions for this component
  const componentVersions = mockVersions
    .filter(v => v.componentId === component.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
              <h1 className="font-bold text-2xl tracking-tight">{component.name}</h1>
              <Badge 
                variant={component.status === 'published' ? 'default' : 'secondary'}
                className={`${statusColors[component.status]} text-white`}
              >
                {statusLabels[component.status]}
              </Badge>
            </div>
            <p className="text-muted-foreground">{component.description}</p>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Package className="size-3" />
                版本 {version?.versionNumber || 'v1.0'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                更新于 {new Date(component.updatedAt).toLocaleDateString('zh-CN')}
              </span>
              {author && (
                <span className="flex items-center gap-1">
                  作者: {author.name}
                </span>
              )}
            </div>
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

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {component.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            <Tag className="mr-1 size-3" />
            {tag}
          </Badge>
        ))}
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

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">组件预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-8 min-h-[300px] flex items-center justify-center bg-muted/30">
                <ComponentPreview name={component.name} />
              </div>
            </CardContent>
          </Card>

          <div className="grid @xl/main:grid-cols-3 grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">默认状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 flex items-center justify-center bg-muted/30">
                  <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                    {component.name}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Hover 状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 flex items-center justify-center bg-muted/30">
                  <div className="px-4 py-2 bg-primary/90 text-primary-foreground rounded-md text-sm">
                    {component.name}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">禁用状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 flex items-center justify-center bg-muted/30">
                  <div className="px-4 py-2 bg-muted text-muted-foreground rounded-md text-sm cursor-not-allowed">
                    {component.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">使用文档</CardTitle>
            </CardHeader>
            <CardContent>
              {version?.documentation ? (
                <MarkdownRenderer content={version.documentation} />
              ) : (
                <div className="text-muted-foreground">暂无文档</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Developer Tab */}
        <TabsContent value="developer" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <FileCode className="size-4" />
                React 组件
              </h3>
            </div>
            
            {version?.codeSnippets?.react ? (
              <CodeBlock 
                code={version.codeSnippets.react} 
                language="tsx" 
                filename={`${component.name}.tsx`}
              />
            ) : (
              <CodeBlock 
                code={`export function ${component.name}(props: ${component.name}Props) {
  return (
    <div className="${component.slug}">
      {props.children}
    </div>
  );
}`}
                language="tsx"
                filename={`${component.name}.tsx`}
              />
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Palette className="size-4" />
                {"CSS Variables"}
              </h3>
            </div>
            
            <CodeBlock 
              code={`/* ${component.name} 相关 Token */
:root {
${relatedTokens.map(t => `  --${t.name}: ${t.value};`).join('\n') || '  --color-primary: #F97316;\n  --spacing-md: 16px;'}
}`}
              language="css"
              filename="tokens.css"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">相关 Token</h3>
            </div>
            
            <div className="grid @xl/main:grid-cols-2 grid-cols-1 gap-3">
              {relatedTokens.length > 0 ? (
                relatedTokens.map((token) => (
                  <Card key={token.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-mono text-sm">{token.name}</div>
                        <div className="text-xs text-muted-foreground">{token.description}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {token.category === 'colors' && (
                          <div 
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: token.value }}
                          />
                        )}
                        <span className="font-mono text-sm">{token.value}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-muted-foreground text-sm">
                  该组件暂未关联 Token
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">其他框架</h3>
            </div>
            
            <div className="space-y-3">
              {version?.codeSnippets?.vue && (
                <CodeBlock 
                  code={version.codeSnippets.vue} 
                  language="vue" 
                  filename={`${component.name}.vue`}
                />
              )}
              
              {version?.codeSnippets?.html && (
                <CodeBlock 
                  code={version.codeSnippets.html} 
                  language="html" 
                  filename={`${component.name}.html`}
                />
              )}
            </div>
          </div>
        </TabsContent>

        {/* Versions Tab */}
        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">版本历史</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {componentVersions.length > 0 ? (
                componentVersions.map((ver, index) => {
                  const versionAuthor = mockUsers.find(u => u.id === ver.createdBy);
                  const isCurrent = ver.id === component.currentVersionId;
                  
                  return (
                    <div 
                      key={ver.id} 
                      className={`border rounded-lg p-4 ${isCurrent ? 'border-primary bg-primary/5' : 'opacity-80'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{ver.versionNumber}</span>
                            {isCurrent && (
                              <Badge variant="default" className="text-xs">当前</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {ver.changelog}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{versionAuthor?.name || '未知作者'}</span>
                            <span>{new Date(ver.createdAt).toLocaleDateString('zh-CN')}</span>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          查看
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-muted-foreground">暂无版本记录</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Related Tab */}
        <TabsContent value="related" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">相关组件</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                相关组件推荐功能将在后续版本实现
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Component Preview Placeholder
function ComponentPreview({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          {name}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        交互式预览将在后续版本支持
      </p>
    </div>
  );
}
