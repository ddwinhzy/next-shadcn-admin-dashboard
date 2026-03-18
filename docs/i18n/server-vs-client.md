# Server vs Client：翻译 API 的选择规则

`next-intl` 提供两个翻译函数，用于不同的组件类型。选错会导致运行时报错。

## 快速参考

| | `getTranslations` | `useTranslations` |
|--|------------------|------------------|
| 导入来源 | `next-intl/server` | `next-intl` |
| 调用方式 | `await getTranslations(ns)` | `useTranslations(ns)`（hook） |
| 适用组件 | Server Component | Client Component (`"use client"`) |
| 组件是否需要 async | 是 | 否 |

---

## 判断流程

```
组件文件顶部有 "use client" 吗？
        │
       是 → 使用 useTranslations()
        │
       否 → 是否需要翻译？
              │
             是 → 将函数改为 async，使用 await getTranslations()
              │
             否 → 直接硬编码中文（见"静态数据文件"节）
```

---

## Server Component 示例

文件：`src/app/(main)/auth/v2/login/page.tsx`

```tsx
// 无 "use client" → Server Component
import { getTranslations } from "next-intl/server";

export default async function LoginV2() {
  const t = await getTranslations("auth");  // ← await
  return (
    <h1>{t("loginToAccount")}</h1>
  );
}
```

规则：
- 函数必须是 `async`
- 从 `next-intl/server` 导入
- 只能在函数体内调用，不能在模块顶层调用

---

## Client Component 示例

文件：`src/app/(main)/auth/_components/login-form.tsx`

```tsx
"use client";  // ← 必须有

import { useTranslations } from "next-intl";

export function LoginForm() {
  const t = useTranslations("auth");  // ← hook，无需 await
  return (
    <FieldLabel>{t("emailAddress")}</FieldLabel>
  );
}
```

规则：
- 文件顶部必须有 `"use client"`
- 从 `next-intl` 导入（不是 `next-intl/server`）
- 遵循 React Hook 规则：只能在组件函数顶层调用

---

## 静态数据文件的特殊处理

有些文件是模块级常量（`const items = [...]`），**无法使用任何 hook 或 async**。

典型例子：
- `src/navigation/sidebar/sidebar-items.ts` — 侧边栏导航数据
- `src/app/(main)/dashboard/default/_components/proposal-sections-table/columns.tsx` 中的列定义

**处理方式：直接硬编码中文**

```ts
// sidebar-items.ts — 模块级常量，不能用 hook
export const sidebarItems = [
  { title: "仪表盘", url: "/dashboard" },   // ← 直接写中文
  { title: "客户管理", url: "/customers" },
];
```

如果将来需要动态翻译这类数据，需要将其重构为接受 `t` 函数参数的工厂函数。

---

## 常见错误

**错误 1**：在 Server Component 中使用 `useTranslations`

```tsx
// ❌ 错误：Server Component 不能用 hook
export default function Page() {
  const t = useTranslations("auth");  // 报错
}
```

**错误 2**：在 Client Component 中使用 `getTranslations`

```tsx
// ❌ 错误：Client Component 不能 await
"use client";
export default async function Form() {
  const t = await getTranslations("auth");  // 报错
}
```

**错误 3**：忘记将 Server Component 改为 async

```tsx
// ❌ 错误：缺少 async
export default function Page() {
  const t = await getTranslations("auth");  // 报错：不能在非 async 函数中 await
}
```
