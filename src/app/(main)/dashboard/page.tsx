import Link from "next/link";
import { 
  Package, 
  FileText, 
  Palette, 
  Users, 
  Plus,
  ArrowRight,
  Clock
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardStats, mockActivities, mockUsers } from "@/lib/data/mock";

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return '刚刚';
  if (diffInHours < 24) return `${diffInHours}小时前`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}天前`;
  return date.toLocaleDateString('zh-CN');
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'component_created':
    case 'component_updated':
      return <Package className="size-4" />;
    case 'guideline_published':
      return <FileText className="size-4" />;
    case 'token_exported':
      return <Palette className="size-4" />;
    case 'asset_downloaded':
      return <Package className="size-4" />;
    default:
      return <Clock className="size-4" />;
  }
}

export default function Page() {
  const stats = mockDashboardStats;

  return (
    <div className="@container/main flex flex-col gap-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">仪表盘</h1>
          <p className="text-muted-foreground">
            欢迎来到设计资产管理平台，以下是您的团队概览
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/components/new">
              <Plus className="mr-2 size-4" />
              上传组件
            </Link>
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              组件库总数
            </CardTitle>
            <Package className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComponents}</div>
            <p className="text-xs text-muted-foreground">
              已发布 {stats.publishedComponents} 个
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              设计规范
            </CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGuidelines}</div>
            <p className="text-xs text-muted-foreground">
              色彩、字体、布局规范
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              设计 Token
            </CardTitle>
            <Palette className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTokens}</div>
            <p className="text-xs text-muted-foreground">
              颜色、间距、字体 Token
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              活跃成员
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMembers}</div>
            <p className="text-xs text-muted-foreground">
              过去 7 天内有活动
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 快捷操作 */}
      <div className="grid @xl/main:grid-cols-3 grid-cols-1 gap-4">
        <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
          <Link href="/components">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="size-5" />
                浏览组件库
              </CardTitle>
              <CardDescription>
                查看所有设计组件，支持搜索和筛选
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-primary">
                进入组件库 <ArrowRight className="ml-1 size-4" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
          <Link href="/guidelines">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                查看设计规范
              </CardTitle>
              <CardDescription>
                了解色彩、字体、布局等设计规范
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-primary">
                进入规范文档 <ArrowRight className="ml-1 size-4" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
          <Link href="/tokens">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="size-5" />
                管理设计 Token
              </CardTitle>
              <CardDescription>
                查看和导出设计 Token，支持多种格式
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-primary">
                进入 Token 管理 <ArrowRight className="ml-1 size-4" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* 最近动态 */}
      <Card>
        <CardHeader>
          <CardTitle>最近动态</CardTitle>
          <CardDescription>
            团队成员的最新活动
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivities.map((activity) => {
              const user = mockUsers.find(u => u.id === activity.userId);
              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{user?.name || '未知用户'}</span>
                      {' '}
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.createdAt)}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.targetType === 'component' && '组件'}
                    {activity.targetType === 'guideline' && '规范'}
                    {activity.targetType === 'token' && 'Token'}
                    {activity.targetType === 'asset' && '资产'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
