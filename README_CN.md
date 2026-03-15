# Next.js 后台管理系统模板 - TypeScript & Shadcn UI

**Studio Admin** - 包含多个仪表盘、认证页面布局、可自定义主题预设等功能。

<img src="https://github.com/arhamkhnz/next-shadcn-admin-dashboard/blob/main/media/dashboard.png?version=5" alt="仪表盘截图">

我接触的大多数管理后台模板，无论是免费还是付费的，都显得杂乱、过时或过于僵化。我创建了这个更简洁的替代方案，具备了其他模板经常缺失的功能，例如主题切换和布局控制，同时保持设计现代、简约且灵活。

设计灵感来自多个来源。如果您希望对某些特定内容进行署名，欢迎提交 issue 或联系我。

> **查看演示：** [Studio Admin](https://next-shadcn-admin-dashboard.vercel.app)

> [!TIP]
> 我正在开发 Nuxt.js、Svelte 和 React (Vite + TanStack Router) 版本的管理后台。即将上线。

## 功能特性

- 基于 Next.js 16、TypeScript、Tailwind CSS v4 和 Shadcn UI 构建
- 响应式设计，支持移动端
- 可自定义主题预设（浅色/深色模式，配色方案包括柑橘橙、野兽派等）
- 灵活的布局（可折叠侧边栏、可变内容宽度）
- 认证流程和页面
- 预置仪表盘（默认、CRM、财务），更多即将推出
- 基于角色的访问控制（RBAC），配置驱动的 UI 和多租户支持 *（规划中）*

> [!NOTE]
> 默认仪表盘使用 **shadcn 中性** 主题。
> 还包含受 [Tweakcn](https://tweakcn.com) 启发的其他配色预设：
>
> - 柑橘橙 (Tangerine)
> - 新野兽派 (Neo Brutalism)
> - 软萌流行 (Soft Pop)
>
> 您可以按照现有预设的结构创建更多主题。

> 寻找 **Next.js 15** 版本？
> 请查看 [`archive/next15`](https://github.com/arhamkhnz/next-shadcn-admin-dashboard/tree/archive/next15) 分支。
> 该分支包含升级到 Next 16 和 React Compiler 之前的设置。

> 寻找 **Next.js 14 + Tailwind CSS v3** 版本？
> 请查看 [`archive/next14-tailwindv3`](https://github.com/arhamkhnz/next-shadcn-admin-dashboard/tree/archive/next14-tailwindv3) 分支。
> 它采用不同的配色主题，不再积极维护，但我会尽量跟进重大更新。

## 技术栈

- **框架**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **UI 组件**: Shadcn UI
- **验证**: Zod
- **表单与状态管理**: React Hook Form, Zustand
- **表格与数据处理**: TanStack Table
- **工具链与开发体验**: Biome, Husky

## 页面展示

### 已上线
- 默认仪表盘
- CRM 仪表盘
- 财务仪表盘
- 认证页面（4个）

### 即将推出
- 分析仪表盘
- 电商仪表盘
- 学院仪表盘
- 物流仪表盘
- 邮件页面
- 聊天页面
- 日历页面
- 看板页面
- 发票页面
- 用户管理
- 角色管理

## 同构文件系统架构

本项目采用**同构架构**，每个功能模块将自己的页面、组件和逻辑放在其路由文件夹内。
共享 UI、hooks 和配置位于顶层，使代码库模块化、可扩展，并随着应用增长更易于维护。

完整的结构示例，请参见 [Next Colocation Template](https://github.com/arhamkhnz/next-colocation-template)。

## 开始使用

您可以在本地运行此项目，或使用 Vercel 一键部署。

### Vercel 部署

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farhamkhnz%2Fnext-shadcn-admin-dashboard)

_一键部署属于您的副本。_

### 本地运行

1. **克隆仓库**
   ```bash
   git clone https://github.com/arhamkhnz/next-shadcn-admin-dashboard.git
   ```
   
2. **进入项目目录**
   ```bash
   cd next-shadcn-admin-dashboard
   ```
   
3. **安装依赖**
   ```bash
   npm install
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

您的应用将运行在 [http://localhost:3000](http://localhost:3000)

### 格式化与代码检查

格式化、代码检查和自动整理导入
```bash
npx @biomejs/biome check --write
```
> 有关可用规则、修复选项和 CLI 参数的更多信息，请参考 [Biome 文档](https://biomejs.dev/)。

---

> [!IMPORTANT]  
> 本项目更新频繁。如果您正在使用 fork 或旧版本，请在同步之前拉取最新更改。某些更新可能包含破坏性变更。

---

欢迎贡献。欢迎提交 issue、功能请求或发起讨论。


**祝您编码愉快！**
