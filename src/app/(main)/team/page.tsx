import Link from "next/link";
import { 
  Users, 
  Activity,
  ArrowLeft,
  UserPlus,
  Crown,
  Shield,
  Pencil,
  Eye
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers, mockActivities } from "@/lib/data/mock";
import type { MemberRole } from "@/lib/types";

const roleConfig: Record<MemberRole, { label: string; icon: typeof Crown; color: string }> = {
  owner: { label: '拥有者', icon: Crown, color: 'bg-yellow-500' },
  admin: { label: '管理员', icon: Shield, color: 'bg-blue-500' },
  editor: { label: '编辑者', icon: Pencil, color: 'bg-green-500' },
  viewer: { label: '查看者', icon: Eye, color: 'bg-gray-500' }
};

const activityTypeLabels: Record<string, string> = {
  component_created: '创建组件',
  component_updated: '更新组件',
  guideline_published: '发布规范',
  token_exported: '导出 Token',
  asset_downloaded: '下载资产'
};

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

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight flex items-center gap-2">
            <Users className="size-6" />
            团队管理
          </h1>
          <p className="text-muted-foreground">
            管理团队成员和查看团队活动
          </p>
        </div>

        <Button variant="outline">
          <UserPlus className="mr-2 size-4" />
          邀请成员
        </Button>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">
            <Users className="mr-2 size-4" /
            成员列表
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="mr-2 size-4" /
            活动日志
          </TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>团队成员</CardTitle>
              <CardDescription>
                共 {mockUsers.length} 名成员
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockUsers.map((user) => {
                const role = roleConfig[user.role];
                const RoleIcon = role.icon;
                
                return (
                  <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="size-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.name}</span>
                        <Badge 
                          variant="secondary" 
                          className={`${role.color} text-white text-xs`}
                        >
                          <RoleIcon className="mr-1 size-3" />
                          {role.label}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        加入于 {new Date(user.joinedAt).toLocaleDateString('zh-CN')} · 
                        最近活跃 {formatTimeAgo(user.lastActiveAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Role Legend */}
          <Card>
            <CardHeader>
              <CardTitle>权限说明</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid @xl/main:grid-cols-2 grid-cols-1 gap-4">
                {Object.entries(roleConfig).map(([key, config]) => {
                  const RoleIcon = config.icon;
                  return (
                    <div key={key} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded ${config.color} flex items-center justify-center text-white shrink-0`}>
                        <RoleIcon className="size-4" />
                      </div>
                      <div>
                        <div className="font-medium">{config.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {key === 'owner' && '拥有所有权限，可管理团队和删除工作空间'}
                          {key === 'admin' && '可管理团队、发布资产、审批变更'}
                          {key === 'editor' && '可创建和编辑组件、规范'}
                          {key === 'viewer' && '仅可查看和下载资产'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>活动日志</CardTitle>
              <CardDescription>
                团队成员的最新活动记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map((activity) => {
                  const user = mockUsers.find(u => u.id === activity.userId);
                  
                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Avatar className="size-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name?.[0] || '?'}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user?.name || '未知用户'}</span>
                          <Badge variant="outline" className="text-xs">
                            {activityTypeLabels[activity.type] || activity.type}
                          </Badge>
                        </div>
                        <div className="text-sm mt-1">
                          {activity.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {formatTimeAgo(activity.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
