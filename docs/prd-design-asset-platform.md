# Design Asset Management Platform - 产品需求文档 (PRD)

> **文档版本**: v1.0  
> **最后更新**: 2026-03-16  
> **产品负责人**: AI PM  
> **状态**: 草案 (Draft)

---

## 1. 产品背景与目标用户

### 1.1 问题背景

在中小型设计团队中，设计资产的混乱是一个普遍痛点：

- **组件分散**: 设计组件散落在 Figma 的不同文件里，设计师不知道哪个是最新版本
- **规范断层**: 设计规范文档写完就放在 Notion 吃灰，开发找不到、用不上
- **品牌不统一**: 市场部和产品部各自使用不同的 Logo 版本，品牌一致性差
- **交接困难**: 设计师离职后，大量设计资产没有沉淀，新人接手困难

### 1.2 产品定位

**Design Asset Management Platform (设计资产管理平台)** —— 一个面向设计团队的「单点真相源」系统，帮助团队：

- 📦 **集中管理**: 统一存储组件、规范、图标、配色等所有设计资产
- 🔄 **版本控制**: 追踪每个资产的历史变更，避免「哪个版本最新」的混乱
- 👥 **团队协作**: 设计师、产品经理、开发在统一平台协作
- 🚀 **快速交付**: 提供可下载、可引用的代码片段，缩短设计到开发的距离

### 1.3 目标用户

| 角色 | 核心诉求 | 使用频率 |
|------|----------|----------|
| **设计总监** | 把控品牌一致性、审批重要资产变更 | 每周 2-3 次 |
| **UI/UX 设计师** | 查找可用组件、上传新设计、维护规范 | 每天使用 |
| **产品经理** | 查看设计进度、获取设计资源用于 PRD | 每周 3-5 次 |
| **前端开发** | 获取组件代码、查看设计 Token | 每天使用 |
| **市场运营** | 下载品牌物料（Logo、配色、字体） | 每月 5-10 次 |

---

## 2. 核心使用场景

### 场景 1：设计师查找组件

**用户**: UI 设计师小李  
**场景**: 接到一个新需求，需要做一个「带筛选的商品卡片列表」

**使用流程**:
1. 打开 `/components` 页面
2. 在搜索框输入 "card filter"
3. 系统返回匹配的组件：Card、FilterBar、ProductCard
4. 小李查看 ProductCard 组件详情，看到：
   - 设计预览图（多状态展示）
   - 使用说明文档
   - React 代码片段
   - CSS Tokens（颜色、间距、圆角）
5. 确认可用后，点击「复制代码」直接粘贴到项目

**价值**: 避免重复造轮子，统一组件风格

---

### 场景 2：设计规范发布

**用户**: 设计总监老王  
**场景**: 品牌升级，更新了主色调和字体规范

**使用流程**:
1. 进入 `/guidelines/colors` 页面
2. 编辑「品牌色板」章节，上传新的色值
3. 添加变更说明："从 #FF6B00 改为 #FF5722，提升可访问性"
4. 设置标签为 "v2.0"
5. 点击「发布更新」
6. 系统自动通知订阅该规范的所有成员
7. 在 `/guidelines/history` 查看所有历史版本

**价值**: 规范发布可追溯，变更影响可评估

---

### 场景 3：开发获取设计资源

**用户**: 前端工程师小张  
**场景**: 需要将设计稿实现为代码，需要精确的设计 Token

**使用流程**:
1. 收到设计师分享的链接，打开 `/components/button`
2. 在「开发者模式」下查看：
   - CSS Variables（--color-primary, --spacing-md）
   - Tailwind 类名（bg-primary-500, px-4 py-2）
   - React Props 接口定义
3. 点击「导出 Token」，下载 JSON 文件
4. 一键复制 React 组件代码到剪贴板
5. 在 `/tokens` 页面查看全局设计 Token 列表

**价值**: 设计到开发的无缝对接，减少还原度争议

---

### 场景 4：品牌资产管理

**用户**: 市场运营小陈  
**场景**: 需要制作一张活动海报，需要下载公司 Logo 的 PNG 版本

**使用流程**:
1. 进入 `/brand` 页面
2. 在「Logo 库」中找到主 Logo
3. 选择格式：PNG / SVG / PDF
4. 选择颜色版本：深色背景 / 浅色背景 / 单色
5. 选择尺寸：100px / 500px / 原始尺寸
6. 点击下载，自动打包符合品牌规范的 Logo 文件

**价值**: 确保所有对外物料品牌一致性

---

### 场景 5：组件版本管理

**用户**: UI 设计师小刘  
**场景**: 需要回退到一个组件的旧版本

**使用流程**:
1. 进入 `/components/modal` 详情页
2. 点击「版本历史」标签
3. 看到按时间排列的所有版本：
   - v3.2 (当前) - 2026-03-15 - 添加全屏模式
   - v3.1 - 2026-03-10 - 修复移动端适配
   - v3.0 - 2026-03-01 - 全新设计
4. 对比 v3.0 和 v3.2 的差异
5. 选择「回退到 v3.1」，并说明原因
6. 系统通知使用该组件的项目负责人

**价值**: 避免「改坏了找不到原版」的尴尬

---

## 3. 信息架构

### 3.1 整体结构

```
Dashboard (首页)
├── 数据概览（组件数量、规范更新、团队活跃度）
├── 最近更新（组件、规范、资产）
├── 快捷操作（上传组件、创建规范）
└── 待办事项（待审批资产、待查看更新）

Components (组件库)
├── 列表页 /components
│   ├── 分类筛选（表单、导航、数据展示、反馈）
│   ├── 搜索（名称、标签、作者）
│   ├── 视图切换（网格 / 列表）
│   └── 排序（最近更新、最多使用、字母序）
│
└── 详情页 /components/[id]
    ├── 预览区（交互式演示）
    ├── 文档（使用说明、设计原理）
    ├── 开发者（代码片段、Token）
    ├── 版本历史
    └── 相关组件

Guidelines (设计规范)
├── 概览页 /guidelines
├── 色彩规范 /guidelines/colors
├── 字体规范 /guidelines/typography
├── 布局规范 /guidelines/layout
├── 图标规范 /guidelines/icons
└── 版本历史 /guidelines/history

Brand (品牌资产)
├── Logo 库 /brand/logos
├── 配色方案 /brand/palettes
├── 字体资源 /brand/fonts
├── 图片素材 /brand/imagery
└── 品牌书 /brand/brandbook

Tokens (设计 Token)
├── 全部 Token /tokens
├── 颜色 /tokens/colors
├── 间距 /tokens/spacing
├── 字体 /tokens/typography
├── 圆角 /tokens/radius
└── 阴影 /tokens/shadows

Team (团队管理)
├── 成员列表 /team/members
├── 权限设置 /team/permissions
├── 活动日志 /team/activity
└── 邀请成员 /team/invite

Settings (设置)
├── 个人资料 /settings/profile
├── 通知设置 /settings/notifications
├── 团队设置 /settings/workspace
└── API 密钥 /settings/api-keys
```

### 3.2 页面详细说明

#### Dashboard (仪表盘)

**路径**: `/dashboard`

**展示内容**:
- **概览卡片**: 
  - 组件库总数（本周新增 X 个）
  - 活跃设计师数（在线 Y 人）
  - 待审批资产数
  - 规范文档总数
- **最近动态时间线**:
  - "设计师小王上传了 Button 组件 v2.0"
  - "设计总监批准了品牌色更新"
  - "前端小张导出了 15 个 Token"
- **快捷入口**:
  - 上传新组件
  - 创建规范章节
  - 查看待办

---

#### Components List (组件列表)

**路径**: `/components`

**展示内容**:
- **顶部栏**: 搜索框 + 视图切换 + 新建按钮
- **左侧边栏**: 分类树
  - Foundation（基础：颜色、字体、图标）
  - Layout（布局：Grid、Container、Divider）
  - Navigation（导航：NavBar、Tabs、Breadcrumb）
  - Form（表单：Input、Select、Checkbox）
  - Data Display（数据展示：Table、Card、List）
  - Feedback（反馈：Modal、Toast、Progress）
  - Media（媒体：Image、Avatar、Carousel）
- **主内容区**:
  - 网格视图：卡片展示（缩略图、名称、版本、作者）
  - 列表视图：表格展示（名称、分类、更新日期、状态）

---

#### Component Detail (组件详情)

**路径**: `/components/[id]`

**展示内容**:
- **头部**:
  - 组件名称 + 当前版本标签
  - 状态标签（草稿 / 审核中 / 已发布 / 已弃用）
  - 操作按钮（编辑、导出、分享）
- **标签页切换**:
  - **Preview** (预览): 交互式组件演示，可切换不同状态
  - **Documentation** (文档): Markdown 格式的使用指南
  - **Developer** (开发者): 代码片段（React/Vue/HTML）、Token 列表
  - **Versions** (版本): 历史版本列表，可对比差异
  - **Related** (相关): 相关组件推荐

---

#### Guidelines (规范页)

**路径**: `/guidelines/[category]`

**展示内容**:
- **侧边栏导航**:
  - 色彩系统（主色、辅助色、中性色、语义色）
  - 字体系统（字体族、字重、字号层级）
  - 间距系统（基础单位、常用间距）
  - 布局系统（栅格、断点、容器）
- **主内容区**:
  - 规范说明文档
  - 可视化示例
  - Token 对应表
  - 变更历史

---

#### Brand Assets (品牌资产)

**路径**: `/brand`

**展示内容**:
- **Logo 库**:
  - 主 Logo 各版本（横版、竖版、图标）
  - 安全空间标注
  - 下载选项（格式、颜色、尺寸）
- **配色**:
  - 品牌色板
  - 辅助色板
  - 渐变色
- **字体**:
  - 标题字体
  - 正文字体
  - 等宽字体
- **图片素材**:
  - 品牌摄影风格示例
  - 插画库
  - 图标库

---

#### Tokens (设计 Token)

**路径**: `/tokens`

**展示内容**:
- **Token 列表**:
  - 名称（color-primary-500）
  - 值（#FF5722）
  - 用途说明
  - 引用次数统计
- **分组筛选**:
  - Colors（颜色）
  - Spacing（间距）
  - Typography（字体）
  - Border（边框）
  - Shadow（阴影）
- **导出功能**:
  - CSS Variables
  - SCSS Variables
  - JSON
  - Tailwind Config

---

## 4. 数据大纲

### 4.1 核心实体关系

```
Workspace (工作空间)
├── 包含多个 Projects (项目)
├── 包含多个 Members (成员)
└── 包含全局的 Tokens、Guidelines

Project (项目)
├── 包含多个 Components (组件)
├── 包含 Brand Assets (品牌资产)
└── 关联特定的 Guidelines 版本

Component (组件)
├── 属于一个 Project
├── 有多个 Versions (版本)
├── 关联多个 Tags (标签)
├── 关联 Author (作者)
└── 关联 Tokens (使用的 Token)

Version (版本)
├── 属于一个 Component
├── 包含 Assets (资源文件：Figma 链接、图片)
├── 包含 Documentation (文档)
├── 包含 Code Snippets (代码片段)
└── 记录 Changelog (变更日志)

Guideline (规范)
├── 属于一个 Workspace
├── 有多个 Sections (章节)
├── 有多个 Versions (版本历史)
└── 关联 Editor (编辑者)

Member (成员)
├── 属于一个 Workspace
├── 有 Role (角色：Owner、Admin、Editor、Viewer)
└── 有 Activity (活动记录)

Token (设计 Token)
├── 属于一个 Workspace
├── 有 Category (分类：color、spacing、typography 等)
├── 有 Type (类型：primitive、semantic、component)
└── 被多个 Components 引用
```

### 4.2 实体详细说明

#### Component (组件)

**属性**:
- `id`: 唯一标识
- `name`: 组件名称（如 "Button"）
- `slug`: URL 友好名称（如 "button"）
- `category`: 分类（form、navigation、feedback 等）
- `description`: 简短描述
- `status`: 状态（draft、review、published、deprecated）
- `author_id`: 创建者
- `project_id`: 所属项目
- `current_version_id`: 当前版本
- `usage_count`: 使用次数统计
- `tags`: 标签数组
- `created_at`: 创建时间
- `updated_at`: 更新时间

**关系**:
- 一个组件有多个版本 (1:N)
- 一个组件使用多个 Token (N:M)
- 一个组件关联多个相关组件 (N:M)

---

#### Version (版本)

**属性**:
- `id`: 唯一标识
- `component_id`: 所属组件
- `version_number`: 版本号（如 "v2.1.0"）
- `changelog`: 变更说明
- `assets`: 资源文件列表
  - `figma_url`: Figma 设计稿链接
  - `preview_images`: 预览图数组
  - `attachments`: 附件
- `documentation`: Markdown 文档
- `code_snippets`: 代码片段
  - `react`: React 组件代码
  - `vue`: Vue 组件代码
  - `html`: HTML/CSS 代码
- `tokens`: 使用的 Token 列表
- `created_by`: 创建者
- `created_at`: 创建时间
- `is_published`: 是否已发布

---

#### Token (设计 Token)

**属性**:
- `id`: 唯一标识
- `name`: Token 名称（如 "color-primary-500"）
- `value`: 值（如 "#FF5722"）
- `category`: 分类（color、spacing、typography、border、shadow）
- `type`: 类型（primitive、semantic、component）
  - primitive: 基础值（如 #FF5722）
  - semantic: 语义值（如 color-brand-primary 引用 primitive）
  - component: 组件专用（如 button-bg-primary）
- `description`: 描述
- `usage_example`: 使用示例
- `workspace_id`: 所属工作空间
- `created_at`: 创建时间

---

#### Guideline (规范)

**属性**:
- `id`: 唯一标识
- `workspace_id`: 所属工作空间
- `category`: 分类（colors、typography、layout、icons）
- `title`: 标题
- `content`: Markdown 内容
- `version`: 版本号
- `changelog`: 变更历史数组
- `status`: 状态（draft、published）
- `editors`: 编辑者列表
- `created_at`: 创建时间
- `updated_at`: 更新时间

---

#### Member (成员)

**属性**:
- `id`: 唯一标识
- `workspace_id`: 所属工作空间
- `user_id`: 用户 ID
- `role`: 角色（owner、admin、editor、viewer）
- `joined_at`: 加入时间
- `last_active_at`: 最后活跃时间

**权限**:
- **Owner**: 拥有所有权限，可删除工作空间
- **Admin**: 可管理团队、发布资产、审批变更
- **Editor**: 可创建和编辑组件、规范
- **Viewer**: 仅查看和下载

---

## 5. MVP 范围

### 5.1 Phase 1: 基础框架 (Week 1-2)

**目标**: 搭建基础架构，实现核心页面框架

**功能清单**:
- ✅ 项目初始化（已完成）
- ✅ 认证系统（已有 4 个认证页面）
- ✅ 基础布局（Sidebar、Header）
- ✅ 主题系统（浅色/深色、配色预设）
- 🆕 改造 Dashboard 为 Design Asset Management 首页
  - 移除通用 Dashboard 图表
  - 添加组件库统计卡片
  - 添加最近活动时间线
- 🆕 创建 `/components` 页面框架
  - 左侧分类导航
  - 网格/列表视图切换
  - 搜索功能（前端过滤）
- 🆕 创建 `/guidelines` 页面框架
  - Markdown 渲染
  - 侧边栏章节导航

**技术任务**:
- 配置路由结构
- 创建数据模型 TypeScript 类型
- 搭建 Mock 数据层
- 实现基础 UI 组件（AssetCard、GuidelineNav）

---

### 5.2 Phase 2: 组件库功能 (Week 3-4)

**目标**: 实现组件管理和展示核心功能

**功能清单**:
- 🆕 `/components` 列表页
  - 分类筛选（Foundation、Layout、Form 等）
  - 搜索（支持名称、标签）
  - 网格视图：卡片展示（缩略图、名称、版本）
  - 列表视图：表格展示
- 🆕 `/components/[id]` 详情页
  - Preview 标签：组件预览（静态展示）
  - Documentation 标签：Markdown 渲染
  - Developer 标签：代码片段展示
  - Versions 标签：版本历史列表
- 🆕 组件上传功能
  - 表单：名称、分类、描述
  - 上传预览图
  - 填写文档（Markdown 编辑器）
  - 添加代码片段
- 🆕 Mock 数据
  - 20+ 个示例组件（Button、Card、Modal 等）
  - 3-5 个分类完整填充

**技术任务**:
- 实现组件 CRUD API（Mock）
- 集成 Markdown 编辑器
- 实现代码高亮展示
- 创建组件预览渲染器

---

### 5.3 Phase 3: 设计规范与 Token (Week 5-6)

**目标**: 实现规范管理和 Token 系统

**功能清单**:
- 🆕 `/guidelines` 规范系统
  - 色彩规范页（色板展示、色值复制）
  - 字体规范页（字体族、字号层级）
  - 布局规范页（栅格系统）
  - 版本历史记录
- 🆕 `/tokens` Token 管理
  - Token 列表（名称、值、分类）
  - 分组筛选（颜色、间距、字体）
  - 导出功能（CSS、JSON）
- 🆕 组件关联 Token
  - 在组件详情页显示使用的 Token
  - Token 到组件的反向引用

**技术任务**:
- 创建 Token 数据模型
- 实现 Token 导出逻辑
- 集成颜色选择器组件
- 实现规范版本对比

---

### 5.4 Phase 4: 品牌资产与协作 (Week 7-8)

**目标**: 实现品牌资产管理和基础协作功能

**功能清单**:
- 🆕 `/brand` 品牌资产
  - Logo 库（多格式下载）
  - 配色方案
  - 字体资源
- 🆕 `/team` 团队管理
  - 成员列表
  - 邀请成员（模拟）
  - 角色显示
- 🆕 协作增强
  - 活动日志（谁在什么时候做了什么）
  - 最近更新展示
  - 组件状态标签（草稿/已发布）

**技术任务**:
- 实现文件下载功能
- 创建活动日志系统
- 实现权限控制 UI
- 添加更多 Mock 数据

---

## 6. 非目标 (Out of Scope)

为了保持 MVP 聚焦，以下功能**明确不做**：

### 6.1 技术层面

| 功能 | 不做原因 | 后续考虑 |
|------|----------|----------|
| **真实后端 API** | MVP 使用 Mock 数据，聚焦前端体验 | Phase 2 接入真实后端 |
| **Figma 插件集成** | 需要 Figma API 和额外开发 | 后续版本开发 Figma Plugin |
| **实时协作编辑** | 复杂度高，需要 WebSocket | 后续考虑接入 Yjs 或类似方案 |
| **组件代码沙箱** | 需要 iframe 沙箱和构建服务 | 先展示静态代码 |
| **AI 智能推荐** | 需要训练数据和 AI 服务 | 后续版本考虑 |

### 6.2 功能层面

| 功能 | 不做原因 | 替代方案 |
|------|----------|----------|
| **复杂审批流程** | 需要工作流引擎 | MVP 用简单状态标签（草稿/已发布） |
| **高级权限控制** | 需要细粒度权限系统 | MVP 用 4 级角色（Owner/Admin/Editor/Viewer） |
| **多语言支持** | 增加复杂度 | MVP 专注中文市场 |
| **邮件通知系统** | 需要邮件服务 | MVP 仅在平台内展示通知 |
| **数据分析报表** | 需要埋点和数据仓库 | MVP 仅展示基础统计数据 |
| **移动端 App** | 超出前端范围 | 确保 Web 端响应式即可 |

### 6.3 设计层面

| 功能 | 不做原因 |
|------|----------|
| **完全自定义主题** | 使用现有 3-4 个预设主题 |
| **复杂动画效果** | 保持简洁，核心功能优先 |
| **深色模式完全适配** | 基础支持，不追求完美 |

---

## 7. 成功指标

### 7.1 技术指标

- [ ] 所有页面 Lighthouse 评分 > 90
- [ ] 首屏加载时间 < 2s
- [ ] 代码测试覆盖率 > 80%
- [ ] 零 TypeScript 类型错误

### 7.2 用户体验指标

- [ ] 组件查找时间 < 30 秒
- [ ] Token 导出成功率 100%
- [ ] 页面切换流畅，无卡顿
- [ ] 移动端可用性良好

### 7.3 功能完整性

- [ ] Phase 1 全部完成
- [ ] Phase 2 完成 80% 核心功能
- [ ] Phase 3 完成 Token 和基础规范
- [ ] Phase 4 品牌资产基础版本

---

## 8. 附录

### 8.1 命名规范

**页面路由**:
- 全部小写，使用连字符 `/components/new-component`
- 复数形式 `/components` 而非 `/component`

**组件命名**:
- PascalCase: `AssetCard`、`GuidelineNav`
- 文件与组件名一致

**API/数据**:
- camelCase: `componentId`、`createdAt`
- 数据库字段 snake_case（如果需要）

### 8.2 文件结构

```
src/
├── app/
│   ├── (main)/
│   │   ├── dashboard/
│   │   ├── components/
│   │   ├── guidelines/
│   │   ├── brand/
│   │   ├── tokens/
│   │   └── team/
│   └── layout.tsx
├── components/
│   ├── ui/              # Shadcn UI 组件
│   ├── asset/           # 资产相关组件
│   ├── guideline/       # 规范相关组件
│   └── layout/          # 布局组件
├── lib/
│   ├── data/            # Mock 数据
│   ├── types/           # TypeScript 类型
│   └── utils/
├── hooks/
└── styles/
```

### 8.3 参考资料

- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Design Tokens W3C Standard](https://design-tokens.github.io)
- [Figma Design System](https://help.figma.com/hc/en-us/articles/360038746534)

---

**文档结束**

如有疑问或需要调整，请联系产品团队。
