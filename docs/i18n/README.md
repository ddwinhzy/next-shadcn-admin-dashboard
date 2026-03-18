# 国际化 (i18n) 文档

本项目使用 [`next-intl`](https://next-intl-docs.vercel.app/) 实现中文本地化，采用**无路由模式**（without routing），URL 中不含语言段，固定使用简体中文。

## 当前方案概述

- **语言**：仅简体中文（`zh`）
- **模式**：`next-intl` without routing — 不改变 URL 结构
- **翻译文件**：`messages/zh.json`，按命名空间组织
- **固定 locale**：在 `src/i18n/request.ts` 中硬编码 `zh`

## 关键文件

| 文件 | 作用 |
|------|------|
| `messages/zh.json` | 所有翻译 Key，按命名空间分组 |
| `src/i18n/request.ts` | 服务端 `getRequestConfig`，返回固定 locale |
| `next.config.mjs` | 使用 `createNextIntlPlugin` 包装配置 |
| `src/app/layout.tsx` | 根布局，提供 `NextIntlClientProvider` 给客户端 |

## 命名空间一览

```
messages/zh.json
├── auth          → 登录/注册页面相关文案
├── nav           → 侧边栏导航操作按钮
├── sidebar       → 侧边栏支持卡片、用户菜单
├── dashboard
│   ├── cards     → 首页统计卡片
│   ├── table     → Proposal 表格列与操作
│   └── comingSoon → 开发中页面提示
├── unauthorized  → 无权限页面
└── notFound      → 404 页面
```

## 常见任务速查

| 任务 | 参考文档 |
|------|---------|
| **覆盖上游更新后恢复中文** | [after-upstream-update.md](./after-upstream-update.md) ⬅ 常用 |
| 新增翻译 Key | [adding-translations.md](./adding-translations.md) |
| Server vs Client 组件如何选 | [server-vs-client.md](./server-vs-client.md) |
| 表单校验消息如何翻译 | [validation-schemas.md](./validation-schemas.md) |
| 了解整体架构 | [architecture.md](./architecture.md) |
| 未来扩展多语言 | [multi-language-guide.md](./multi-language-guide.md) |
