"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Package, 
  Search, 
  Grid3X3, 
  List, 
  Plus,
  Filter
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  mockComponents, 
  searchComponents, 
  getComponentsByCategory 
} from "@/lib/data/mock";
import type { Component, ComponentCategory } from "@/lib/types";

const categories: { value: ComponentCategory | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'foundation', label: '基础' },
  { value: 'layout', label: '布局' },
  { value: 'navigation', label: '导航' },
  { value: 'form', label: '表单' },
  { value: 'data-display', label: '数据展示' },
  { value: 'feedback', label: '反馈' },
  { value: 'media', label: '媒体' }
];

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

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter components
  let filteredComponents = mockComponents;
  
  if (selectedCategory !== 'all') {
    filteredComponents = getComponentsByCategory(selectedCategory);
  }
  
  if (searchQuery) {
    filteredComponents = searchComponents(searchQuery).filter(
      c => selectedCategory === 'all' || c.category === selectedCategory
    );
  }

  return (
    <div className="@container/main flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Package className="size-6" />
            组件库
          </h1>
          <p className="text-muted-foreground">
            管理和浏览所有设计组件
          </p>
        </div>
        <Button asChild>
          <Link href="/components/new">
            <Plus className="mr-2 size-4" />
            上传组件
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="搜索组件..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}
          >
            <ToggleGroupItem value="grid" aria-label="网格视图">
              <Grid3X3 className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="列表视图">
              <List className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
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
        共 {filteredComponents.length} 个组件
      </p>

      {/* Components Grid */}
      {viewMode === 'grid' ? (
        <div className="grid @4xl/main:grid-cols-4 @2xl/main:grid-cols-3 @xl/main:grid-cols-2 grid-cols-1 gap-4">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredComponents.map((component) => (
            <ComponentListItem key={component.id} component={component} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredComponents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">暂无组件</h3>
          <p className="text-sm text-muted-foreground mt-1">
            尝试调整搜索条件或上传新组件
          </p>
        </div>
      )}
    </div>
  );
}

function ComponentCard({ component }: { component: Component }) {
  return (
    <Link href={`/components/${component.slug}`}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base truncate">{component.name}</CardTitle>
              <CardDescription className="text-xs mt-1 line-clamp-2">
                {component.description}
              </CardDescription>
            </div>
            <Badge 
              variant="secondary" 
              className={`${statusColors[component.status]} text-white ml-2 shrink-0`}
            >
              {statusLabels[component.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            className="aspect-video bg-muted rounded-md mb-3 overflow-hidden"
            style={{
              backgroundImage: component.thumbnail ? `url(${component.thumbnail})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!component.thumbnail && (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Package className="size-8" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>v{component.currentVersionId?.split('-').pop() || '1.0'}</span>
            <span>{component.usageCount} 次使用</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {component.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ComponentListItem({ component }: { component: Component }) {
  return (
    <Link href={`/components/${component.slug}`}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardContent className="flex items-center gap-4 py-4">
          <div 
            className="w-16 h-16 bg-muted rounded-md shrink-0 overflow-hidden"
            style={{
              backgroundImage: component.thumbnail ? `url(${component.thumbnail})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!component.thumbnail && (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Package className="size-6" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium truncate">{component.name}</h3>
              <Badge 
                variant="secondary" 
                className={`${statusColors[component.status]} text-white text-xs`}
              >
                {statusLabels[component.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate mt-1">
              {component.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {component.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-right shrink-0 text-sm text-muted-foreground">
            <div>v{component.currentVersionId?.split('-').pop() || '1.0'}</div>
            <div>{component.usageCount} 次使用</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
