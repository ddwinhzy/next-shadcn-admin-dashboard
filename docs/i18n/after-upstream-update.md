# 官方上游更新后恢复中文本地化

从 GitHub 拉取最新代码覆盖后，按下面的清单逐步恢复，**顺序很重要**。

---

## 第一步：确认依赖

检查 `package.json` 是否还有 `next-intl`：

```bash
grep '"next-intl"' package.json
```

如果没有，重新安装：

```bash
npm install next-intl
```

---

## 第二步：恢复基础配置文件

这三个文件在上游仓库里**不存在**，覆盖后需要手动重建。

### `src/i18n/request.ts`（新建）

```ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "zh";
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### `messages/zh.json`（新建）

从本仓库的 Git 历史恢复，或直接复制以下内容：

```json
{
  "auth": {
    "emailAddress": "邮箱地址",
    "password": "密码",
    "confirmPassword": "确认密码",
    "rememberMe": "记住我 30 天",
    "loginButton": "登录",
    "registerButton": "注册",
    "loginSideTitle": "欢迎回来",
    "loginSideSubtitle": "登录以继续",
    "loginHeading": "登录",
    "loginDescription": "欢迎回来，请输入您的邮箱和密码。",
    "noAccount": "还没有账号？",
    "continueWith": "或继续使用",
    "loginToAccount": "登录您的账号",
    "loginDetails": "请输入您的账号信息以登录。",
    "registerHeading": "注册",
    "registerDescription": "请填写以下信息完成注册。",
    "registerSideTitle": "欢迎！",
    "registerSideSubtitle": "来对地方了。",
    "alreadyHaveAccount": "已有账号？",
    "createAccount": "创建账号",
    "createAccountDetails": "请输入您的注册信息。",
    "continueWithGoogle": "使用 Google 继续",
    "language": "中文",
    "validation": {
      "emailInvalid": "请输入有效的邮箱地址。",
      "passwordMin": "密码至少需要 6 个字符。",
      "confirmPasswordMin": "确认密码至少需要 6 个字符。",
      "passwordsMismatch": "两次输入的密码不一致。"
    }
  },
  "nav": {
    "quickCreate": "快速新建",
    "inbox": "收件箱",
    "comingSoon": "即将推出"
  },
  "sidebar": {
    "support": {
      "title": "需要更多功能？",
      "description": "提交问题或联系我们。"
    },
    "user": {
      "account": "账号",
      "billing": "账单",
      "notifications": "通知",
      "logout": "退出登录"
    }
  },
  "dashboard": {
    "cards": {
      "totalRevenue": "总收入",
      "revenueTrend": "本月呈上升趋势",
      "revenueFootnote": "过去 6 个月访客数据",
      "newCustomers": "新增客户",
      "customersTrend": "本期下降 20%",
      "customersFootnote": "客户获取需要关注",
      "activeAccounts": "活跃账号",
      "accountsTrend": "用户留存情况良好",
      "accountsFootnote": "参与度超出目标",
      "growthRate": "增长率",
      "growthTrend": "持续稳定增长",
      "growthFootnote": "符合增长预期"
    },
    "table": {
      "header": "标题",
      "sectionType": "模块类型",
      "status": "状态",
      "target": "目标",
      "limit": "上限",
      "reviewer": "审阅人",
      "edit": "编辑",
      "makeCopy": "复制",
      "favorite": "收藏",
      "delete": "删除",
      "assignReviewer": "指定审阅人",
      "selectAll": "全选",
      "selectRow": "选择行",
      "dragToReorder": "拖动排序",
      "openMenu": "打开菜单",
      "submit": "提交",
      "done": "完成",
      "headerLabel": "标题",
      "typeLabel": "类型",
      "statusLabel": "状态",
      "targetLabel": "目标",
      "limitLabel": "上限",
      "reviewerLabel": "审阅人",
      "drawerDescription": "显示过去 6 个月的访客总数",
      "trendingUp": "本月上涨 5.2%",
      "visitorsSummary": "过去 6 个月访客总数。",
      "tableOfContents": "目录",
      "executiveSummary": "执行摘要",
      "technicalApproach": "技术方案",
      "design": "设计",
      "capabilities": "能力",
      "focusDocuments": "重点文件",
      "narrative": "叙述",
      "coverPage": "封面",
      "statusDone": "完成",
      "statusInProgress": "进行中",
      "statusNotStarted": "未开始",
      "selectType": "选择类型",
      "selectStatus": "选择状态",
      "selectReviewer": "选择审阅人",
      "outline": "大纲",
      "pastPerformance": "历史业绩",
      "keyPersonnel": "核心人员",
      "selectView": "选择视图",
      "viewButton": "视图",
      "toggleColumns": "切换列",
      "addSection": "添加章节",
      "noResults": "暂无数据",
      "rowsPerPage": "每页行数",
      "pageInfo": "第 {page} 页，共 {total} 页",
      "rowsSelectedInfo": "已选 {selected} / {total} 行",
      "goToFirstPage": "首页",
      "goToPreviousPage": "上一页",
      "goToNextPage": "下一页",
      "goToLastPage": "末页",
      "savingToast": "正在保存 {header}",
      "savedToast": "已保存",
      "saveErrorToast": "保存失败"
    },
    "comingSoon": {
      "title": "页面不存在",
      "description": "此页面正在开发中，将在未来版本中提供。"
    }
  },
  "unauthorized": {
    "title": "无访问权限",
    "description": "您没有权限查看此内容。如果您认为这是错误，请联系网站管理员。",
    "goHome": "前往首页"
  },
  "notFound": {
    "title": "页面未找到",
    "description": "您访问的页面不存在。",
    "goHome": "返回首页"
  }
}
```

---

## 第三步：修改 `next.config.mjs`

用 `createNextIntlPlugin` 包装导出：

```js
// 原来
import NextConfig from "..." // 保留原有 import

/** @type {import('next').NextConfig} */
const nextConfig = { /* ... 保持原内容不变 ... */ };

export default nextConfig;
```

改为：

```js
import createNextIntlPlugin from "next-intl/plugin";

// ... 原有 import 保持不变 ...

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = { /* ... 保持原内容不变 ... */ };

export default withNextIntl(nextConfig);
```

---

## 第四步：修改 `src/app/layout.tsx`

根布局需要变成 async，并添加 `NextIntlClientProvider`：

```diff
+import { NextIntlClientProvider } from "next-intl";
+import { getMessages } from "next-intl/server";

-export default function RootLayout({ children }) {
+export default async function RootLayout({ children }) {
+  const messages = await getMessages();
   return (
     <html>
       <body>
-        {children}
+        <NextIntlClientProvider messages={messages}>
+          {children}
+        </NextIntlClientProvider>
       </body>
     </html>
   );
}
```

> **注意**：保留原布局里的 `ThemeProvider`、字体等配置，只在最外层套上 `NextIntlClientProvider`。

---

## 第五步：逐文件修改组件

按下表找到每个文件，对照"修改方式"列操作。

### Server Components（异步组件，用 `getTranslations`）

| 文件 | 命名空间 | 修改方式 |
|------|---------|---------|
| `src/app/(main)/auth/_components/social-auth/google-button.tsx` | `auth` | 函数改 `async`，加 `await getTranslations("auth")` |
| `src/app/(main)/dashboard/_components/section-cards.tsx` | `dashboard.cards` | 函数改 `async`，加 `await getTranslations("dashboard.cards")` |
| `src/app/(main)/dashboard/coming-soon/page.tsx` | `dashboard.comingSoon` | 函数改 `async`，加 `await getTranslations("dashboard.comingSoon")` |
| `src/app/(main)/unauthorized/page.tsx` | `unauthorized` | 函数改 `async`，加 `await getTranslations("unauthorized")` |

import 来自 `"next-intl/server"`。

### Client Components（加 `"use client"`，用 `useTranslations`）

| 文件 | 命名空间 | 注意事项 |
|------|---------|---------|
| `src/app/(main)/auth/_components/login-form.tsx` | `auth` | `formSchema` 必须在组件函数体内定义（在 `useTranslations` 之后） |
| `src/app/(main)/auth/_components/register-form.tsx` | `auth` | 同上，含 `.refine()` 密码确认逻辑 |
| `src/app/(main)/auth/v1/login/page.tsx` | `auth` | 纯文案替换 |
| `src/app/(main)/auth/v1/register/page.tsx` | `auth` | 纯文案替换 |
| `src/app/(main)/auth/v2/login/page.tsx` | `auth` | 纯文案替换 |
| `src/app/(main)/auth/v2/register/page.tsx` | `auth` | 纯文案替换 |
| `src/app/(main)/dashboard/_components/sidebar/sidebar-support-card.tsx` | `sidebar.support` | 必须加 `"use client"`（父级 AppSidebar 是 Client Component） |
| `src/app/(main)/dashboard/_components/sidebar/nav-main.tsx` | `nav` | `IsComingSoon` 和 `NavMain` 都需要 hook |
| `src/app/(main)/dashboard/_components/sidebar/nav-user.tsx` | `sidebar.user` | 纯文案替换 |
| `src/app/(main)/dashboard/default/_components/proposal-sections-table/table.tsx` | `dashboard.table` | 在 `ProposalSectionsTable` 内调用 hook，`viewOptions` 在组件内构造 |
| `src/app/not-found.tsx` | `notFound` | 加 `"use client"`，已由根布局的 `NextIntlClientProvider` 覆盖 |

import 来自 `"next-intl"`。

### 硬编码中文（不走 i18n，直接写死）

这些文件是**模块级常量**或**非 React 函数**，无法使用 hook，直接硬编码中文：

| 文件 | 硬编码内容 |
|------|-----------|
| `src/navigation/sidebar/sidebar-items.ts` | 所有导航 `title`、`label` 字段 |
| `src/app/(main)/dashboard/default/_components/proposal-sections-table/columns.tsx` | `STATUS_LABELS` 映射表、`TYPE_LABELS` 映射表、`toast` 消息、占位符文字 |

`columns.tsx` 需要在模块顶部添加：

```ts
const STATUS_LABELS: Record<string, string> = {
  "Done": "完成",
  "In Progress": "进行中",
  "Not Started": "未开始",
};

const TYPE_LABELS: Record<string, string> = {
  "Table of Contents": "目录",
  "Executive Summary": "执行摘要",
  "Technical Approach": "技术方案",
  "Design": "设计",
  "Capabilities": "能力",
  "Focus Documents": "重点文件",
  "Narrative": "叙述",
  "Cover Page": "封面",
};
```

在状态/类型列的 cell 里使用：

```tsx
// type 列
{TYPE_LABELS[row.original.type] ?? row.original.type}

// status 列
{STATUS_LABELS[row.original.status] ?? row.original.status}
```

toast 消息改为：

```ts
toast.promise(..., {
  loading: `正在保存 ${header}`,
  success: "已保存",
  error: "保存失败",
});
```

---

## 第六步：恢复 CRM / Finance / Analytics / Preferences 中文化

以下是第二批中文化涉及的所有文件，上游覆盖后按此清单恢复。

### `messages/zh.json` 需新增的命名空间

在原有内容末尾追加以下四个顶级字段（`crm`、`finance`、`analytics`、`preferences`）。完整内容见本仓库 Git 历史中的 `messages/zh.json`。

**新增命名空间一览：**

| 命名空间 | 用途 |
|---------|------|
| `crm.overview` | CRM 概览卡片（新线索、提案、收入等） |
| `crm.insights` | CRM 洞察卡片（线索来源、项目收入） |
| `crm.operational` | CRM 运营卡片（销售漏斗、待办事项） |
| `crm.table` | CRM 最近线索表格（列头、分页、按钮） |
| `finance.tabs` | Finance 页面 Tab 标签（概览/活动/洞察/工具） |
| `finance.card` | Finance 银行卡概览（卡类型、额度、付款等） |
| `finance.cashFlow` | Finance 现金流概览（收入/支出、时间范围） |
| `finance.income` | Finance 收入稳定性（稳定性指标） |
| `finance.spending` | Finance 支出明细（标题、描述） |
| `analytics.riskLedger` | Analytics 风险台账（表格头部统计、列标签） |
| `analytics.forecastTarget` | Analytics 预测 vs 目标（指标芯片、图表标题） |
| `preferences` | 偏好设置弹窗（所有控件标签） |

---

### Server Components（用 `getTranslations`，来自 `"next-intl/server"`）

| 文件 | 命名空间 | 修改方式 |
|------|---------|---------|
| `src/app/(main)/dashboard/finance/page.tsx` | `finance.tabs` | 函数改 `async`，加 `await getTranslations("finance.tabs")`，Tab 标签替换为 `t()` |

---

### Client Components（用 `useTranslations`，来自 `"next-intl"`）

| 文件 | 命名空间 | 注意事项 |
|------|---------|---------|
| `src/app/(main)/dashboard/crm/_components/overview-cards.tsx` | `crm.overview` | 纯文案替换 |
| `src/app/(main)/dashboard/crm/_components/insight-cards.tsx` | `crm.insights` | 纯文案替换 |
| `src/app/(main)/dashboard/crm/_components/operational-cards.tsx` | `crm.operational` | 含带参数的 `t("regionsTracked", { count })` |
| `src/app/(main)/dashboard/crm/_components/recent-leads-table/table.tsx` | `crm.table` | 含带参数的分页翻译 |
| `src/app/(main)/dashboard/finance/_components/card-overview.tsx` | `finance.card` | 纯文案替换 |
| `src/app/(main)/dashboard/finance/_components/cash-flow-overview.tsx` | `finance.cashFlow` | 纯文案替换 |
| `src/app/(main)/dashboard/finance/_components/income-reliability.tsx` | `finance.income` | 纯文案替换 |
| `src/app/(main)/dashboard/finance/_components/spending-breakdown.tsx` | `finance.spending` | 纯文案替换 |
| `src/app/(main)/dashboard/analytics/_components/analytics-actions-risk-ledger.tsx` | `analytics.riskLedger` | 模块级 `ledgerColumns` 列头直接硬编码中文；`priorityLabel` 映射表用于 Badge 显示（英文 key 保留用于 CSS 逻辑）；组件内 `t()` 用于卡片标题/统计 |
| `src/app/(main)/dashboard/analytics/_components/analytics-drivers-forecast-target.tsx` | `analytics.forecastTarget` | `forecastChartConfig` 中 label 硬编码中文；卡片标题/MetricChip 通过 `t()` |
| `src/app/(main)/dashboard/_components/sidebar/layout-controls.tsx` | `preferences` | 偏好设置弹窗所有控件标签、aria-label、按钮文字全部通过 `t()` |

---

### 硬编码中文（不走 i18n，直接写死）

这些文件包含模块级常量或纯 Server Component，无法使用 hook，直接硬编码中文：

| 文件 | 硬编码内容 |
|------|-----------|
| `src/app/(main)/dashboard/crm/_components/recent-leads-table/columns.tsx` | 列头文字（客户、状态、来源等）、操作菜单项 |
| `src/app/(main)/dashboard/analytics/_components/analytics-overview.tsx` | 全部 UI 文案（风险视图选项、指标标签、按钮文字） |
| `src/app/(main)/dashboard/analytics/_components/analytics-actions-manager-queue.tsx` | 全部 UI 文案（干预组合、经理关注点、下一步干预等） |
| `src/app/(main)/dashboard/analytics/_components/analytics-drivers-coverage-triage.tsx` | 全部 UI 文案（覆盖度分诊、杠杆选项、负责人信息等） |
| `src/app/(main)/dashboard/finance/_components/kpis/*.tsx` | KPI 卡片（主账户、净值、储蓄率、月现金流）全部文案 |

#### `analytics-actions-risk-ledger.tsx` 的特殊处理

Priority 字段的英文 key（`Escalate`/`Coach`/`Reforecast`）需保留用于 CSS 样式映射，另建一个中文显示映射表：

```ts
const priorityLabel: Record<Exclude<LedgerPriority, null>, string> = {
  Escalate: "上报",
  Coach: "辅导",
  Reforecast: "重新预测",
};
```

Badge 显示使用 `priorityLabel[row.original.priority]`，CSS 类名仍用原英文 key 的 `priorityTone` 映射。

---

## 第七步：验证

```bash
npm run build
```

全部页面编译通过即为成功。

---

## 常见错误速查

| 错误信息 | 原因 | 解决方法 |
|---------|------|---------|
| `<XxxComponent> is an async Client Component` | 组件用了 `async` + `getTranslations` 但父级是 Client Component | 改用 `"use client"` + `useTranslations` |
| `A component was suspended by an uncached promise` | 同上，async Server Component 被嵌入 Client Component 树 | 同上 |
| `formSchema` 报错翻译函数未定义 | `formSchema` 定义在组件外，`t()` 还不存在 | 将 `formSchema` 移到组件函数体内，放在 `useTranslations` 调用之后 |
| `useTranslations` 在 Server Component 里报错 | hook 只能在客户端用 | 改用 `await getTranslations()` from `"next-intl/server"` |
