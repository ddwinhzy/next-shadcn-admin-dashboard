/**
 * Mock Data for Design Asset Management Platform
 * 
 * 这个文件包含所有 Mock 数据，用于开发和演示
 */

import type { 
  Component, 
  Version, 
  Token, 
  Guideline, 
  BrandAsset, 
  User, 
  Activity,
  DashboardStats 
} from '../types'

// ============================================
// Mock Users
// ============================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: '王小明',
    email: 'xiaoming@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming',
    role: 'owner',
    joinedAt: '2026-01-15T08:00:00Z',
    lastActiveAt: '2026-03-16T10:30:00Z'
  },
  {
    id: 'user-2',
    name: '李小红',
    email: 'xiaohong@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaohong',
    role: 'admin',
    joinedAt: '2026-01-20T09:00:00Z',
    lastActiveAt: '2026-03-16T14:20:00Z'
  },
  {
    id: 'user-3',
    name: '张小强',
    email: 'xiaoqiang@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoqiang',
    role: 'editor',
    joinedAt: '2026-02-01T10:00:00Z',
    lastActiveAt: '2026-03-15T16:45:00Z'
  },
  {
    id: 'user-4',
    name: '刘小芳',
    email: 'xiaofang@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaofang',
    role: 'editor',
    joinedAt: '2026-02-10T11:00:00Z',
    lastActiveAt: '2026-03-16T09:15:00Z'
  },
  {
    id: 'user-5',
    name: '陈小军',
    email: 'xiaojun@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaojun',
    role: 'viewer',
    joinedAt: '2026-03-01T14:00:00Z',
    lastActiveAt: '2026-03-14T11:30:00Z'
  }
]

// ============================================
// Mock Versions
// ============================================

const createMockVersion = (
  componentId: string, 
  versionNumber: string, 
  changelog: string,
  createdBy: string,
  createdAt: string
): Version => ({
  id: `version-${componentId}-${versionNumber}`,
  componentId,
  versionNumber,
  changelog,
  status: 'published',
  assets: {
    previewImages: [
      `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(componentId)}+Preview`,
      `https://placehold.co/600x400/f1f5f9/64748b?text=${encodeURIComponent(componentId)}+States`
    ]
  },
  documentation: `# ${componentId} 组件\n\n## 概述\n\n这是一个示例组件文档。\n\n## 使用方法\n\n\`\`\`tsx\nimport { ${componentId} } from '@/components'\n\nexport default function Example() {\n  return <${componentId} />\n}\n\`\`\`\n\n## Props\n\n| 属性 | 类型 | 默认值 | 说明 |\n|------|------|--------|------|\n| variant | string | 'default' | 样式变体 |\n| size | string | 'md' | 尺寸大小 |\n| disabled | boolean | false | 是否禁用 |`,
  codeSnippets: {
    react: `export function ${componentId}(props) {\n  return <div>{props.children}</div>\n}`,
    html: `<div class="${componentId.toLowerCase()}"></div>`,
    vue: `<template>\n  <div class="${componentId.toLowerCase()}"></div>\n</template>`
  },
  tokens: ['token-primary-500', 'token-spacing-md'],
  createdBy,
  createdAt,
  isPublished: true
})

// ============================================
// Mock Components
// ============================================

export const mockComponents: Component[] = [
  // Foundation 基础组件
  {
    id: 'comp-1',
    name: 'Button',
    slug: 'button',
    category: 'foundation',
    description: '按钮组件，支持多种变体和尺寸，用于触发操作或导航',
    status: 'published',
    authorId: 'user-1',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-1-v2.0',
    usageCount: 128,
    tags: ['form', 'action', 'interactive'],
    thumbnail: 'https://placehold.co/400x300/e2e8f0/64748b?text=Button',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-03-10T14:30:00Z'
  },
  {
    id: 'comp-2',
    name: 'Card',
    slug: 'card',
    category: 'layout',
    description: '卡片容器，用于展示 grouped 内容，支持头部、内容和底部区域',
    status: 'published',
    authorId: 'user-2',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-2-v1.5',
    usageCount: 95,
    tags: ['container', 'layout', 'content'],
    thumbnail: 'https://placehold.co/400x300/f1f5f9/64748b?text=Card',
    createdAt: '2026-01-20T09:00:00Z',
    updatedAt: '2026-03-08T11:20:00Z'
  },
  {
    id: 'comp-3',
    name: 'Input',
    slug: 'input',
    category: 'form',
    description: '输入框组件，支持文本、密码、数字等多种类型',
    status: 'published',
    authorId: 'user-3',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-3-v2.1',
    usageCount: 156,
    tags: ['form', 'input', 'field'],
    thumbnail: 'https://placehold.co/400x300/e2e8f0/64748b?text=Input',
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-03-12T16:45:00Z'
  },
  {
    id: 'comp-4',
    name: 'Modal',
    slug: 'modal',
    category: 'feedback',
    description: '模态对话框，用于重要信息提示或需要用户确认的操作',
    status: 'published',
    authorId: 'user-1',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-4-v1.8',
    usageCount: 67,
    tags: ['overlay', 'dialog', 'popup'],
    thumbnail: 'https://placehold.co/400x300/f1f5f9/64748b?text=Modal',
    createdAt: '2026-02-01T11:00:00Z',
    updatedAt: '2026-03-05T09:30:00Z'
  },
  {
    id: 'comp-5',
    name: 'Select',
    slug: 'select',
    category: 'form',
    description: '下拉选择器，支持单选和多选，可搜索',
    status: 'published',
    authorId: 'user-2',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-5-v1.2',
    usageCount: 82,
    tags: ['form', 'select', 'dropdown'],
    thumbnail: 'https://placehold.co/400x300/e2e8f0/64748b?text=Select',
    createdAt: '2026-02-05T13:00:00Z',
    updatedAt: '2026-03-01T15:20:00Z'
  },
  {
    id: 'comp-6',
    name: 'Table',
    slug: 'table',
    category: 'data-display',
    description: '表格组件，支持排序、筛选、分页等功能',
    status: 'published',
    authorId: 'user-4',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-6-v2.0',
    usageCount: 73,
    tags: ['data', 'table', 'list'],
    thumbnail: 'https://placehold.co/400x300/f1f5f9/64748b?text=Table',
    createdAt: '2026-02-10T14:00:00Z',
    updatedAt: '2026-03-14T10:10:00Z'
  },
  {
    id: 'comp-7',
    name: 'Tabs',
    slug: 'tabs',
    category: 'navigation',
    description: '标签页组件，用于内容分组和切换',
    status: 'published',
    authorId: 'user-3',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-7-v1.0',
    usageCount: 54,
    tags: ['navigation', 'tabs', 'switcher'],
    thumbnail: 'https://placehold.co/400x300/e2e8f0/64748b?text=Tabs',
    createdAt: '2026-02-15T09:30:00Z',
    updatedAt: '2026-02-28T11:45:00Z'
  },
  {
    id: 'comp-8',
    name: 'Avatar',
    slug: 'avatar',
    category: 'data-display',
    description: '头像组件，支持图片、文字和图标三种形式',
    status: 'published',
    authorId: 'user-2',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-8-v1.3',
    usageCount: 112,
    tags: ['display', 'avatar', 'profile'],
    thumbnail: 'https://placehold.co/400x300/f1f5f9/64748b?text=Avatar',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-03-10T14:20:00Z'
  },
  {
    id: 'comp-9',
    name: 'Toast',
    slug: 'toast',
    category: 'feedback',
    description: '轻量级消息提示，自动消失，用于操作反馈',
    status: 'published',
    authorId: 'user-1',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-9-v1.0',
    usageCount: 89,
    tags: ['feedback', 'notification', 'message'],
    thumbnail: 'https://placehold.co/400x300/e2e8f0/64748b?text=Toast',
    createdAt: '2026-03-01T11:00:00Z',
    updatedAt: '2026-03-15T09:00:00Z'
  },
  {
    id: 'comp-10',
    name: 'Checkbox',
    slug: 'checkbox',
    category: 'form',
    description: '复选框组件，支持单个和组选',
    status: 'review',
    authorId: 'user-4',
    projectId: 'proj-1',
    currentVersionId: 'version-comp-10-v0.9',
    usageCount: 45,
    tags: ['form', 'checkbox', 'input'],
    thumbnail: 'https://placehold.co/400x300/f1f5f9/64748b?text=Checkbox',
    createdAt: '2026-03-05T14:00:00Z',
    updatedAt: '2026-03-16T10:00:00Z'
  }
]

// Mock versions for components
export const mockVersions: Version[] = [
  createMockVersion('comp-1', 'v2.0', '添加 loading 状态和图标支持', 'user-1', '2026-03-10T14:30:00Z'),
  createMockVersion('comp-1', 'v1.9', '修复 disabled 状态下的 hover 效果', 'user-2', '2026-03-01T10:00:00Z'),
  createMockVersion('comp-2', 'v1.5', '添加 footer 区域支持', 'user-2', '2026-03-08T11:20:00Z'),
  createMockVersion('comp-3', 'v2.1', '优化键盘导航和可访问性', 'user-3', '2026-03-12T16:45:00Z'),
  createMockVersion('comp-4', 'v1.8', '添加全屏模式和动画效果', 'user-1', '2026-03-05T09:30:00Z')
]

// ============================================
// Mock Tokens
// ============================================

export const mockTokens: Token[] = [
  // Colors - Primitive
  { id: 'token-white', name: 'color-white', value: '#FFFFFF', category: 'colors', type: 'primitive', description: '纯白色', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-black', name: 'color-black', value: '#000000', category: 'colors', type: 'primitive', description: '纯黑色', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  
  // Colors - Semantic
  { id: 'token-primary-50', name: 'color-primary-50', value: '#FFF7ED', category: 'colors', type: 'semantic', description: '主色调 50', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-primary-100', name: 'color-primary-100', value: '#FFEDD5', category: 'colors', type: 'semantic', description: '主色调 100', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-primary-500', name: 'color-primary-500', value: '#F97316', category: 'colors', type: 'semantic', description: '主色调 500', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-primary-600', name: 'color-primary-600', value: '#EA580C', category: 'colors', type: 'semantic', description: '主色调 600', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-primary-900', name: 'color-primary-900', value: '#7C2D12', category: 'colors', type: 'semantic', description: '主色调 900', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  
  // Spacing
  { id: 'token-spacing-0', name: 'spacing-0', value: '0px', category: 'spacing', type: 'primitive', description: '无间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-1', name: 'spacing-1', value: '4px', category: 'spacing', type: 'primitive', description: '极小间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-2', name: 'spacing-2', value: '8px', category: 'spacing', type: 'primitive', description: '小间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-3', name: 'spacing-3', value: '12px', category: 'spacing', type: 'primitive', description: '中间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-4', name: 'spacing-4', value: '16px', category: 'spacing', type: 'primitive', description: '中间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-5', name: 'spacing-5', value: '20px', category: 'spacing', type: 'primitive', description: '中间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-6', name: 'spacing-6', value: '24px', category: 'spacing', type: 'primitive', description: '大间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-8', name: 'spacing-8', value: '32px', category: 'spacing', type: 'primitive', description: '大间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-10', name: 'spacing-10', value: '40px', category: 'spacing', type: 'primitive', description: '特大间距', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'token-spacing-md', name: 'spacing-md', value: '16px', category: 'spacing', type: 'semantic', description: '中等间距 Token', workspaceId: 'ws-1', createdAt: '2026-01-01', updatedAt: '2026-01-01' }
]

// ============================================
// Mock Guidelines
// ============================================

export const mockGuidelines: Guideline[] = [
  {
    id: 'guide-colors',
    workspaceId: 'ws-1',
    category: 'colors',
    title: '色彩系统',
    content: `# 色彩系统

## 概述

我们的色彩系统分为三个层级：
- **基础色 (Primitive)**: 原始色值
- **语义色 (Semantic)**: 有特定含义的颜色
- **组件色 (Component)**: 组件专用颜色

## 主色调

主色调使用橙色，传递活力和创新：

| Token | 值 | 用途 |
|-------|-----|------|
| color-primary-50 | #FFF7ED | 浅色背景 |
| color-primary-500 | #F97316 | 主按钮、链接 |
| color-primary-600 | #EA580C | Hover 状态 |

## 中性色

用于文本、边框和背景：

- **白色**: #FFFFFF - 主背景
- **黑色**: #000000 - 主文本
- **灰色系**: 从 slate-50 到 slate-900
`,
    version: 'v2.0',
    changelog: [
      { version: 'v2.0', date: '2026-03-10', changes: ['更新主色调为橙色', '添加更多语义 Token'], authorId: 'user-1' },
      { version: 'v1.0', date: '2026-01-15', changes: ['初始版本'], authorId: 'user-1' }
    ],
    status: 'published',
    editors: ['user-1', 'user-2'],
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-03-10T14:30:00Z'
  },
  {
    id: 'guide-typography',
    workspaceId: 'ws-1',
    category: 'typography',
    title: '字体系统',
    content: `# 字体系统

## 字体族

- **主字体**: Inter, system-ui, sans-serif
- **等宽字体**: JetBrains Mono, monospace

## 字号层级

| 层级 | 桌面端 | 平板 | 移动端 | 用途 |
|------|--------|------|--------|------|
| H1 | 48px | 40px | 32px | 页面标题 |
| H2 | 36px | 32px | 28px | 区块标题 |
| H3 | 24px | 24px | 22px | 小节标题 |
| Body | 16px | 16px | 16px | 正文 |
| Small | 14px | 14px | 14px | 辅助文本 |

## 字重

- **Normal (400)**: 正文
- **Medium (500)**: 强调
- **Semibold (600)**: 按钮、标签
- **Bold (700)**: 标题
`,
    version: 'v1.5',
    changelog: [
      { version: 'v1.5', date: '2026-02-20', changes: ['添加响应式字号', '优化移动端体验'], authorId: 'user-2' }
    ],
    status: 'published',
    editors: ['user-2'],
    createdAt: '2026-01-20T09:00:00Z',
    updatedAt: '2026-02-20T16:00:00Z'
  }
]

// ============================================
// Mock Activities
// ============================================

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'component_updated',
    userId: 'user-1',
    targetId: 'comp-1',
    targetType: 'component',
    targetName: 'Button',
    description: '更新了 Button 组件到 v2.0',
    createdAt: '2026-03-16T10:30:00Z'
  },
  {
    id: 'act-2',
    type: 'guideline_published',
    userId: 'user-2',
    targetId: 'guide-colors',
    targetType: 'guideline',
    targetName: '色彩系统',
    description: '发布了色彩系统规范 v2.0',
    createdAt: '2026-03-15T14:20:00Z'
  },
  {
    id: 'act-3',
    type: 'component_created',
    userId: 'user-4',
    targetId: 'comp-10',
    targetType: 'component',
    targetName: 'Checkbox',
    description: '创建了新的 Checkbox 组件',
    createdAt: '2026-03-14T09:15:00Z'
  },
  {
    id: 'act-4',
    type: 'token_exported',
    userId: 'user-3',
    targetId: 'token-primary-500',
    targetType: 'token',
    targetName: 'color-primary-500',
    description: '导出了 CSS Variables 格式的 Token',
    createdAt: '2026-03-13T16:45:00Z'
  },
  {
    id: 'act-5',
    type: 'asset_downloaded',
    userId: 'user-5',
    targetId: 'asset-logo-main',
    targetType: 'asset',
    targetName: '主 Logo',
    description: '下载了 SVG 格式的主 Logo',
    createdAt: '2026-03-12T11:30:00Z'
  }
]

// ============================================
// Mock Dashboard Stats
// ============================================

export const mockDashboardStats: DashboardStats = {
  totalComponents: mockComponents.length,
  publishedComponents: mockComponents.filter(c => c.status === 'published').length,
  totalGuidelines: mockGuidelines.length,
  totalTokens: mockTokens.length,
  activeMembers: 4,
  recentActivities: mockActivities.slice(0, 5)
}

// ============================================
// Helper Functions
// ============================================

export function getComponentById(id: string): Component | undefined {
  return mockComponents.find(c => c.id === id)
}

export function getComponentsByCategory(category: string): Component[] {
  return mockComponents.filter(c => c.category === category)
}

export function getVersionsByComponentId(componentId: string): Version[] {
  return mockVersions.filter(v => v.componentId === componentId)
}

export function getTokensByCategory(category: string): Token[] {
  return mockTokens.filter(t => t.category === category)
}

export function searchComponents(query: string): Component[] {
  const lowerQuery = query.toLowerCase()
  return mockComponents.filter(c => 
    c.name.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
