# i18n 架构说明

## 为何选择"无路由"模式

`next-intl` 提供两种模式：

| 模式 | URL 结构 | 适用场景 |
|------|---------|---------|
| with routing | `/zh/dashboard`、`/en/dashboard` | 多语言、SEO 需要语言区分 |
| **without routing（当前）** | `/dashboard` | 单语言、不需要 URL 语言段 |

本项目选择 **without routing**，原因：
- 当前仅需简体中文，无多语言需求
- URL 结构保持简洁，无需重构路由
- 无需处理 locale 检测、重定向、中间件等复杂逻辑

---

## 数据流

```
next.config.mjs
  └── createNextIntlPlugin("./src/i18n/request.ts")
        └── getRequestConfig()
              └── 返回 { locale: "zh", messages: zh.json }
                    └── src/app/layout.tsx
                          └── NextIntlClientProvider (messages)
                                ├── Server Components → getTranslations(namespace)
                                └── Client Components → useTranslations(namespace)
```

---

## 配置文件说明

### `src/i18n/request.ts`

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

- 每次服务端请求时执行
- `locale` 固定为 `"zh"`，如需多语言可在此处读取 cookie/header
- `messages` 动态 import，支持未来按语言懒加载

---

### `next.config.mjs`

```js
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
```

- `createNextIntlPlugin` 接收 `request.ts` 路径（相对项目根目录）
- 必须包装 `nextConfig`，否则服务端翻译函数无法工作

---

### `src/app/layout.tsx`

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({ children }) {
  const messages = await getMessages();
  return (
    <html lang="zh">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- `getMessages()` 在服务端获取当前 locale 的所有翻译
- `NextIntlClientProvider` 将翻译注入客户端组件树
- 根布局必须是 `async` 函数

---

## `messages/zh.json` 命名空间结构

翻译 Key 按功能模块分组，避免命名冲突，便于维护：

```json
{
  "auth": { ... },         // 登录/注册
  "nav": { ... },          // 导航操作
  "sidebar": {
    "support": { ... },    // 支持卡片
    "user": { ... }        // 用户菜单
  },
  "dashboard": {
    "cards": { ... },      // 统计卡片
    "table": { ... },      // 表格
    "comingSoon": { ... }  // 开发中页面
  },
  "unauthorized": { ... }, // 无权限页面
  "notFound": { ... }      // 404 页面
}
```

命名约定：
- Key 使用 **camelCase**
- 按功能/页面分命名空间，不按组件类型分
- 嵌套层级最多 2 层（如 `dashboard.cards`、`auth.validation`）
