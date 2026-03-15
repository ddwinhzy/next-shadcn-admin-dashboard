/**
 * Design Asset Management Platform - Type Definitions
 * 
 * 这个文件包含所有核心数据类型的 TypeScript 定义
 */

// ============================================
// 基础枚举类型
// ============================================

export type ComponentStatus = 'draft' | 'review' | 'published' | 'deprecated'

export type ComponentCategory = 
  | 'foundation' 
  | 'layout' 
  | 'navigation' 
  | 'form' 
  | 'data-display' 
  | 'feedback' 
  | 'media'

export type TokenCategory = 
  | 'colors' 
  | 'spacing' 
  | 'typography' 
  | 'border' 
  | 'shadow'

export type TokenType = 'primitive' | 'semantic' | 'component'

export type MemberRole = 'owner' | 'admin' | 'editor' | 'viewer'

export type ViewMode = 'grid' | 'list'

// ============================================
// 用户和团队相关
// ============================================

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: MemberRole
  joinedAt: string
  lastActiveAt: string
}

export interface Member {
  id: string
  userId: string
  workspaceId: string
  role: MemberRole
  joinedAt: string
  lastActiveAt: string
  user?: User
}

// ============================================
// 组件相关
// ============================================

export interface Component {
  id: string
  name: string
  slug: string
  category: ComponentCategory
  description: string
  status: ComponentStatus
  authorId: string
  projectId: string
  currentVersionId: string
  usageCount: number
  tags: string[]
  thumbnail?: string
  createdAt: string
  updatedAt: string
  author?: User
  currentVersion?: Version
}

export interface Version {
  id: string
  componentId: string
  versionNumber: string
  changelog: string
  status: ComponentStatus
  assets: {
    figmaUrl?: string
    previewImages: string[]
    attachments?: Attachment[]
  }
  documentation: string
  codeSnippets: {
    react?: string
    vue?: string
    html?: string
  }
  tokens: string[] // Token IDs
  createdBy: string
  createdAt: string
  isPublished: boolean
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: string
  size: number
}

// ============================================
// Token 相关
// ============================================

export interface Token {
  id: string
  name: string
  value: string
  category: TokenCategory
  type: TokenType
  description?: string
  usageExample?: string
  workspaceId: string
  reference?: string // 引用的其他 token (for semantic tokens)
  createdAt: string
  updatedAt: string
}

// ============================================
// 规范相关
// ============================================

export interface Guideline {
  id: string
  workspaceId: string
  category: 'colors' | 'typography' | 'layout' | 'icons'
  title: string
  content: string
  version: string
  changelog: ChangelogEntry[]
  status: 'draft' | 'published'
  editors: string[] // User IDs
  createdAt: string
  updatedAt: string
}

export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
  authorId: string
}

// ============================================
// 品牌资产相关
// ============================================

export type AssetFormat = 'png' | 'svg' | 'pdf'
export type AssetVariant = 'light' | 'dark' | 'monochrome'

export interface BrandAsset {
  id: string
  name: string
  category: 'logos' | 'palettes' | 'fonts' | 'imagery'
  description?: string
  variants: AssetVariant[]
  formats: AssetFormat[]
  sizes?: number[] // 对于图片资产
  files: AssetFile[]
  workspaceId: string
  createdAt: string
  updatedAt: string
}

export interface AssetFile {
  id: string
  format: AssetFormat
  variant: AssetVariant
  size?: number
  url: string
  width?: number
  height?: number
}

// ============================================
// 活动和统计相关
// ============================================

export interface Activity {
  id: string
  type: 'component_created' | 'component_updated' | 'guideline_published' | 'token_exported' | 'asset_downloaded'
  userId: string
  user?: User
  targetId: string
  targetType: 'component' | 'guideline' | 'token' | 'asset'
  targetName: string
  description: string
  createdAt: string
}

export interface DashboardStats {
  totalComponents: number
  publishedComponents: number
  totalGuidelines: number
  totalTokens: number
  activeMembers: number
  recentActivities: Activity[]
}

// ============================================
// 筛选和搜索相关
// ============================================

export interface ComponentFilters {
  category?: ComponentCategory
  status?: ComponentStatus
  tags?: string[]
  authorId?: string
  searchQuery?: string
}

export interface SortOption {
  field: 'name' | 'updatedAt' | 'usageCount' | 'createdAt'
  direction: 'asc' | 'desc'
}

// ============================================
// 导航相关
// ============================================

export interface NavItem {
  title: string
  href: string
  icon?: string
  children?: NavItem[]
  badge?: number
}
