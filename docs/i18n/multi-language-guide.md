# 扩展多语言指南

当前项目固定使用简体中文（`zh`）。本文档记录未来扩展为多语言时的两种方案及操作步骤。

---

## 当前状态

`src/i18n/request.ts` 中 locale 硬编码：

```ts
export default getRequestConfig(async () => {
  const locale = "zh";   // ← 固定值
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

---

## 方案一：Cookie / LocalStorage 存储语言偏好（推荐，无 URL 变化）

适合：不希望改变 URL 结构，通过语言切换按钮改变界面语言。

### 步骤

**1. 添加语言文件**

```
messages/
├── zh.json   ← 已有
└── en.json   ← 新增（结构与 zh.json 完全一致）
```

**2. 修改 `src/i18n/request.ts`，从 cookie 读取 locale**

```ts
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["zh", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("locale")?.value ?? "zh";
  const locale: Locale = isValidLocale(raw) ? raw : "zh";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

**3. 创建语言切换 API Route**

```ts
// src/app/api/set-locale/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { locale } = await request.json();
  const cookieStore = await cookies();
  cookieStore.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return NextResponse.json({ ok: true });
}
```

**4. 创建语言切换按钮组件**

```tsx
"use client";

async function switchLocale(locale: string) {
  await fetch("/api/set-locale", {
    method: "POST",
    body: JSON.stringify({ locale }),
    headers: { "Content-Type": "application/json" },
  });
  window.location.reload();
}

export function LocaleSwitcher() {
  return (
    <div>
      <button onClick={() => switchLocale("zh")}>中文</button>
      <button onClick={() => switchLocale("en")}>English</button>
    </div>
  );
}
```

---

## 方案二：URL 路由模式（`/zh/...`、`/en/...`）

适合：需要 SEO 区分、不同语言对应不同 URL 的场景。

### 步骤概览

1. 在 `src/app` 下创建 `[locale]` 目录，将现有路由移入其中
2. 创建 `src/middleware.ts` 使用 `next-intl/middleware` 处理 locale 检测和重定向
3. 修改 `src/i18n/request.ts` 从路由参数读取 locale（而非固定值）
4. 更新 `src/app/[locale]/layout.tsx` 接收并传递 `locale` 参数

> ⚠️ 此方案需要重构所有路由目录，改动较大，建议在项目早期或有明确 SEO 需求时才采用。

---

## 添加新语言文件

无论采用哪种方案，添加新语言的步骤相同：

1. 复制 `messages/zh.json` → `messages/en.json`
2. 翻译所有 Value（保持 Key 不变）
3. 在 `request.ts` 的 `SUPPORTED_LOCALES` 中添加新语言代码
4. 测试：切换到新语言，检查所有页面无缺失 Key

### 验证翻译完整性（可选脚本）

```ts
// scripts/check-translations.ts
import zh from "../messages/zh.json";
import en from "../messages/en.json";

function getKeys(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, val]) =>
    typeof val === "object"
      ? getKeys(val, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );
}

const zhKeys = new Set(getKeys(zh));
const enKeys = new Set(getKeys(en));

const missing = [...zhKeys].filter((k) => !enKeys.has(k));
if (missing.length > 0) {
  console.error("Missing keys in en.json:", missing);
  process.exit(1);
}
console.log("All keys present.");
```

---

## 静态数据文件的多语言处理

目前 `sidebar-items.ts` 等文件直接硬编码中文。多语言时需重构为工厂函数：

```ts
// 重构前（当前）
export const sidebarItems = [{ title: "仪表盘" }];

// 重构后（多语言）
export function createSidebarItems(t: (key: string) => string) {
  return [{ title: t("nav.dashboard") }];
}
```

在组件中调用：
```tsx
const t = useTranslations();
const items = createSidebarItems(t);
```
