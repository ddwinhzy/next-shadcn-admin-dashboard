# 新增翻译 Key 步骤指南

## 完整流程（5 步）

### 第 1 步：确定命名空间

查看 `messages/zh.json` 顶层结构，找到最合适的命名空间：

```
auth          → 登录/注册相关
nav           → 侧边栏导航操作
sidebar       → 侧边栏支持卡片、用户菜单
dashboard     → 仪表盘（cards、table、comingSoon）
unauthorized  → 无权限页面
notFound      → 404 页面
```

如果没有合适的，创建新命名空间（见下方"新增命名空间"节）。

---

### 第 2 步：在 `messages/zh.json` 中添加 Key

打开 `messages/zh.json`，在对应命名空间下添加新 Key：

```json
{
  "dashboard": {
    "cards": {
      "totalRevenue": "总收入",
      "newMetric": "新指标名称"    // ← 新增
    }
  }
}
```

命名约定：
- 使用 **camelCase**（如 `totalRevenue`，不是 `total_revenue`）
- 名称反映 UI 元素的语义，而非位置（如 `submitButton`，不是 `formBottomButton`）
- 校验错误消息放在 `validation` 子命名空间下（如 `auth.validation.emailInvalid`）

---

### 第 3 步：在 Server Component 中使用

```tsx
// src/app/(main)/dashboard/some-page/page.tsx
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("dashboard.cards");
  return <div>{t("newMetric")}</div>;
}
```

---

### 第 4 步：在 Client Component 中使用

```tsx
// src/components/some-widget.tsx
"use client";

import { useTranslations } from "next-intl";

export function SomeWidget() {
  const t = useTranslations("dashboard.cards");
  return <div>{t("newMetric")}</div>;
}
```

---

### 第 5 步：验证

启动开发服务器后：
1. 打开对应页面，确认文字正确显示
2. 如果显示 Key 原文（如 `dashboard.cards.newMetric`），说明 Key 路径有误或 JSON 格式错误
3. 检查浏览器控制台是否有 `[next-intl] Missing message` 警告

---

## 新增命名空间

如果需要全新命名空间（例如为新功能模块添加），在 `messages/zh.json` 根层添加：

```json
{
  "auth": { ... },
  "newFeature": {           // ← 新命名空间
    "title": "新功能标题",
    "description": "功能描述"
  }
}
```

然后在组件中使用 `getTranslations("newFeature")` 或 `useTranslations("newFeature")`。

---

## 带插值的翻译

如果文本包含动态值（如用户名、数字），使用插值：

**`messages/zh.json`**：
```json
{
  "dashboard": {
    "welcome": "欢迎回来，{name}！"
  }
}
```

**组件**：
```tsx
const t = useTranslations("dashboard");
return <p>{t("welcome", { name: user.name })}</p>;
```

---

## 常见问题

| 现象 | 原因 | 解决 |
|------|------|------|
| 显示 Key 原文 | Key 路径错误 | 检查命名空间和 Key 拼写 |
| 控制台报 Missing message | Key 不存在于 JSON | 在 `zh.json` 中添加该 Key |
| JSON 解析错误 | `zh.json` 格式有误 | 检查逗号、括号是否配对 |
| 组件显示英文 | 该组件未接入翻译 | 参考 [server-vs-client.md](./server-vs-client.md) |
