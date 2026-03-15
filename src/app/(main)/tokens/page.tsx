"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Palette, 
  Search, 
  Download,
  Copy,
  Check,
  FileCode,
  Braces,
  Wind
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockTokens } from "@/lib/data/mock";
import type { TokenCategory } from "@/lib/types";

const categories: { value: TokenCategory | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'colors', label: '颜色' },
  { value: 'spacing', label: '间距' },
  { value: 'typography', label: '字体' },
  { value: 'border', label: '边框' },
  { value: 'shadow', label: '阴影' }
];

const typeLabels: Record<string, string> = {
  primitive: '基础',
  semantic: '语义',
  component: '组件'
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TokenCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTokens = useMemo(() => {
    let tokens = mockTokens;
    
    if (selectedCategory !== 'all') {
      tokens = tokens.filter(t => t.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      tokens = tokens.filter(t => 
        t.name.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query) ||
        t.value.toLowerCase().includes(query)
      );
    }
    
    return tokens;
  }, [selectedCategory, searchQuery]);

  const handleCopy = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate export formats
  const generateCSS = () => {
    const lines = filteredTokens.map(t => `  --${t.name}: ${t.value};`);
    return `:root {\n${lines.join('\n')}\n}`;
  };

  const generateJSON = () => {
    const obj: Record<string, string> = {};
    filteredTokens.forEach(t => {
      obj[t.name] = t.value;
    });
    return JSON.stringify(obj, null, 2);
  };

  const generateTailwind = () => {
    const lines = filteredTokens.map(t => `    '${t.name}': '${t.value}',`);
    return `theme: {\n  extend: {\n${lines.join('\n')}\n  }\n}`;
  };

  return (
    <div className="@container/main flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight flex items-center gap-2">
            <Palette className="size-6" />
            设计 Token
          </h1>
          <p className="text-muted-foreground">
            管理和导出设计 Token，统一设计系统的视觉语言
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Download className="mr-2 size-4" />
              导出
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>导出 Token</DialogTitle>
              <DialogDescription>
                选择导出格式，复制到项目中使用
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="css" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="css">
                  <FileCode className="mr-2 size-4" />
                  CSS
                </TabsTrigger>
                <TabsTrigger value="json">
                  <Braces className="mr-2 size-4" />
                  JSON
                </TabsTrigger>
                <TabsTrigger value="tailwind">
                  <Wind className="mr-2 size-4" />
                  Tailwind
                </TabsTrigger>
              </TabsList>

              <TabsContent value="css">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  {generateCSS()}
                </pre>
                <Button 
                  className="mt-4 w-full"
                  onClick={() => handleCopy('css', generateCSS())}
                >
                  {copiedId === 'css' ? (
                    <><Check className="mr-2 size-4" />已复制</>
                  ) : (
                    <><Copy className="mr-2 size-4" />复制 CSS</>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="json">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  {generateJSON()}
                </pre>
                <Button 
                  className="mt-4 w-full"
                  onClick={() => handleCopy('json', generateJSON())}
                >
                  {copiedId === 'json' ? (
                    <><Check className="mr-2 size-4" />已复制</>
                  ) : (
                    <><Copy className="mr-2 size-4" />复制 JSON</>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="tailwind">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  {generateTailwind()}
                </pre>
                <Button 
                  className="mt-4 w-full"
                  onClick={() => handleCopy('tailwind', generateTailwind())}
                >
                  {copiedId === 'tailwind' ? (
                    <><Check className="mr-2 size-4" />已复制</>
                  ) : (
                    <><Copy className="mr-2 size-4" />复制 Tailwind Config</>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="搜索 Token..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        共 {filteredTokens.length} 个 Token
      </p>

      {/* Token Grid */}
      <div className="grid @3xl/main:grid-cols-3 @xl/main:grid-cols-2 grid-cols-1 gap-4">
        {filteredTokens.map((token) => (
          <Card key={token.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base font-mono truncate">{token.name}</CardTitle>
                  {token.description && (
                    <CardDescription className="text-xs mt-1">
                      {token.description}
                    </CardDescription>
                  )}
                </div>
                <Badge variant="secondary" className="ml-2 shrink-0">
                  {typeLabels[token.type]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {token.category === 'colors' && (
                  <div 
                    className="w-10 h-10 rounded-lg border shrink-0"
                    style={{ backgroundColor: token.value }}
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm truncate">{token.value}</div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => handleCopy(token.id, token.value)}
                >
                  {copiedId === token.id ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTokens.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Palette className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">暂无 Token</h3>
          <p className="text-sm text-muted-foreground mt-1">
            尝试调整搜索条件
          </p>
        </div>
      )}
    </div>
  );
}
