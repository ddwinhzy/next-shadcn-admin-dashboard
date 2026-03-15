# Studio Admin - 功能说明文档

## 项目概述

**Studio Admin** 是一个基于 **Next.js 16 + TypeScript + Tailwind CSS v4 + Shadcn UI** 构建的现代化后台管理系统模板。本项目已完成全面的中文本地化，适合中文开发者使用。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 16 (App Router) |
| **语言** | TypeScript 5.9 |
| **样式** | Tailwind CSS v4 |
| **UI 组件** | Shadcn UI + Radix UI |
| **状态管理** | Zustand |
| **表单处理** | React Hook Form + Zod |
| **数据表格** | TanStack Table |
| **主题** | next-themes |
| **代码规范** | Biome |

---

## 功能模块

### 1. 仪表盘模块

#### 1.1 默认仪表盘 (Default Dashboard)
- **状态**: ✅ 已完成
- **路径**: `/dashboard/default`
- **功能**:
  - 数据概览卡片
  - 交互式面积图表
  - 提案分区表格

#### 1.2 CRM 仪表盘 (CRM Dashboard)
- **状态**: ✅ 已完成
- **路径**: `/dashboard/crm`
- **功能**:
  - 概览卡片（总用户数、活跃率等）
  - 洞察卡片（转化漏斗、客户分布）
  - 运营卡片（团队绩效、销售目标）
  - 最近线索表格

#### 1.3 财务仪表盘 (Finance Dashboard)
- **状态**: ✅ 已完成
- **路径**: `/dashboard/finance`
- **功能**:
  - 主账户余额卡片
  - 净资产卡片
  - 月度现金流卡片
  - 储蓄率卡片
  - 现金流概览图表
  - 支出分类图表
  - 收入可靠性分析
  - 银行卡概览

#### 1.4 分析仪表盘 (Analytics Dashboard)
- **状态**: ✅ 已完成
- **路径**: `/dashboard/analytics`
- **功能**:
  - 分析概览
  - 预测目标驱动器
  - 覆盖率分类驱动器
  - 操作管理队列
  - 风险分类账操作

#### 1.5 其他仪表盘（规划中）
- **电商仪表盘** (E-commerce) - 🚧 开发中
- **学院仪表盘** (Academy) - 🚧 开发中
- **物流仪表盘** (Logistics) - 🚧 开发中

---

### 2. 页面模块

#### 2.1 认证系统
- **状态**: ✅ 已完成
- **页面**:
  - 登录 V1 (`/auth/v1/login`)
  - 登录 V2 (`/auth/v2/login`)
  - 注册 V1 (`/auth/v1/register`)
  - 注册 V2 (`/auth/v2/register`)
- **功能**:
  - 邮箱/密码登录
  - 表单验证（Zod）
  - Google OAuth 按钮
  - 记住我功能
  - 响应式布局

#### 2.2 其他页面（规划中）
- **邮件** (Email) - 🚧 开发中
- **聊天** (Chat) - 🚧 开发中
- **日历** (Calendar) - 🚧 开发中
- **看板** (Kanban) - 🚧 开发中
- **发票** (Invoice) - 🚧 开发中
- **用户管理** (Users) - 🚧 开发中
- **角色管理** (Roles) - 🚧 开发中

---

### 3. 主题系统

#### 3.1 主题模式
- **浅色模式** (Light)
- **深色模式** (Dark)
- **跟随系统** (System)

#### 3.2 主题预设
- **默认** (Default) - 中性配色
- **野兽派** (Brutalist) - 红色系
- **软萌** (Soft Pop) - 紫色系
- **柑橘橙** (Tangerine) - 橙色系

#### 3.3 布局控制
- **页面布局**: 居中 / 全宽
- **导航栏行为**: 固定 / 滚动
- **侧边栏样式**: 内嵌 / 侧边栏 / 浮动
- **侧边栏折叠**: 图标 / 画布
- **字体选择**: 多种字体可选

---

### 4. 组件系统

#### 4.1 侧边栏组件
- **导航菜单**: 多层级支持
- **搜索对话框**: ⌘+J 快捷键
- **用户导航**: 头像、邮箱、快捷菜单
- **账号切换器**: 多账号支持
- **主题切换器**: 一键切换主题
- **布局控制**: 偏好设置面板

#### 4.2 UI 组件 (Shadcn UI)
- Button, Input, Select, Dialog
- Table, Card, Tabs, Dropdown
- Avatar, Badge, Checkbox
- Command (搜索), Popover
- Sidebar, Toast (Sonner)
- 以及更多...

---

### 5. 国际化

#### 5.1 已汉化内容
✅ 导航菜单（侧边栏）
✅ 主题设置（模式、预设）
✅ 认证页面（登录、注册）
✅ 表单标签和提示
✅ 搜索对话框
✅ 用户菜单
✅ 偏好设置面板
✅ 财务仪表盘标签
✅ README 文档

#### 5.2 项目元数据
- **应用名称**: Studio Admin
- **页面标题**: Studio Admin - 现代化 Next.js 后台管理模板
- **页面描述**: 中文描述

---

## 项目结构

```
next-shadcn-admin-dashboard/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (main)/                   # 主布局组
│   │   │   ├── auth/                 # 认证页面
│   │   │   │   ├── v1/login          # 登录 V1
│   │   │   │   ├── v1/register       # 注册 V1
│   │   │   │   ├── v2/login          # 登录 V2
│   │   │   │   └── v2/register       # 注册 V2
│   │   │   └── dashboard/            # 仪表盘
│   │   │       ├── default           # 默认仪表盘
│   │   │       ├── crm               # CRM 仪表盘
│   │   │       ├── finance           # 财务仪表盘
│   │   │       ├── analytics         # 分析仪表盘
│   │   │       └── coming-soon       # 即将推出页面
│   │   ├── globals.css               # 全局样式
│   │   └── layout.tsx                # 根布局
│   ├── components/                   # 共享组件
│   │   └── ui/                       # UI 组件库
│   ├── config/                       # 配置文件
│   │   └── app-config.ts             # 应用配置
│   ├── data/                         # 模拟数据
│   ├── hooks/                        # 自定义 Hooks
│   ├── lib/                          # 工具函数
│   │   ├── fonts/                    # 字体配置
│   │   ├── preferences/              # 偏好设置
│   │   └── utils.ts                  # 工具函数
│   ├── navigation/                   # 导航配置
│   │   └── sidebar/                  # 侧边栏配置
│   ├── server/                       # 服务端代码
│   ├── stores/                       # 状态管理
│   │   └── preferences/              # 偏好设置状态
│   └── styles/                       # 样式文件
├── public/                           # 静态资源
├── README_CN.md                      # 中文 README
└── package.json                      # 依赖配置
```

---

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问: http://localhost:3000

### 构建
```bash
npm run build
```

### 代码检查
```bash
npm run lint       # 代码检查
npm run format     # 代码格式化
npm run check      # 完整检查
```

---

## 自定义配置

### 添加新的主题预设
编辑 `src/lib/preferences/theme.ts`：

```typescript
export const THEME_PRESET_OPTIONS = [
  // ... 现有预设
  {
    label: "我的主题",
    value: "my-theme",
    primary: {
      light: "oklch(0.5 0.2 200)",
      dark: "oklch(0.6 0.18 200)",
    },
  },
] as const;
```

### 添加新的导航项
编辑 `src/navigation/sidebar/sidebar-items.ts`：

```typescript
export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "仪表盘",
    items: [
      {
        title: "我的页面",
        url: "/dashboard/my-page",
        icon: MyIcon,
      },
    ],
  },
];
```

---

## 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/my-feature`)
3. 提交更改 (`git commit -am 'Add my feature'`)
4. 推送分支 (`git push origin feature/my-feature`)
5. 创建 Pull Request

---

## 许可证

MIT License

---

**祝您使用愉快！如有问题请提交 Issue。**
