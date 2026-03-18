# Zod 表单校验消息的翻译模式

## 问题背景

Zod schema 通常定义在模块顶层：

```ts
// ❌ 模块顶层定义 — 无法使用翻译
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export function LoginForm() {
  const form = useForm({ resolver: zodResolver(formSchema) });
  // ...
}
```

这种写法的问题：
- `formSchema` 在模块加载时就被创建，**此时 React 上下文不存在**
- `useTranslations` 是 React Hook，只能在组件函数体内调用
- 因此模块级 schema 的错误消息只能硬编码，无法翻译

---

## 解决方案：将 Schema 定义移入组件函数体

```tsx
"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const t = useTranslations("auth");  // ← 第 1 步：获取翻译函数

  // ← 第 2 步：在函数体内定义 schema，使用 t() 提供错误消息
  const formSchema = z.object({
    email: z.string().email({ message: t("validation.emailInvalid") }),
    password: z.string().min(6, { message: t("validation.passwordMin") }),
    remember: z.boolean().optional(),
  });

  // ← 第 3 步：正常使用 useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  // ...
}
```

对应的翻译 Key（`messages/zh.json`）：

```json
{
  "auth": {
    "validation": {
      "emailInvalid": "请输入有效的邮箱地址。",
      "passwordMin": "密码至少需要 6 个字符。",
      "confirmPasswordMin": "确认密码至少需要 6 个字符。",
      "passwordsMismatch": "两次输入的密码不一致。"
    }
  }
}
```

---

## 带 `.refine()` 的跨字段校验

`register-form.tsx` 的密码确认场景：

```tsx
export function RegisterForm() {
  const t = useTranslations("auth");

  const formSchema = z
    .object({
      email: z.string().email({ message: t("validation.emailInvalid") }),
      password: z.string().min(6, { message: t("validation.passwordMin") }),
      confirmPassword: z.string().min(6, { message: t("validation.confirmPasswordMin") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordsMismatch"),  // ← refine 的消息也能翻译
      path: ["confirmPassword"],
    });

  // ...
}
```

---

## 性能说明

将 schema 移入组件函数体意味着每次渲染都会重新创建 schema 对象。这是可接受的，原因：

1. Zod schema 创建极快（纯 JS 对象构建）
2. `zodResolver` / `useForm` 内部对 resolver 有防抖/缓存处理
3. 实测对性能无可感知影响

如果在极端性能敏感场景下需要优化，可以用 `useMemo` 包装 schema，但通常**没有必要**。

---

## 本项目中使用该模式的文件

| 文件 | 命名空间 |
|------|---------|
| `src/app/(main)/auth/_components/login-form.tsx` | `auth.validation` |
| `src/app/(main)/auth/_components/register-form.tsx` | `auth.validation` |
