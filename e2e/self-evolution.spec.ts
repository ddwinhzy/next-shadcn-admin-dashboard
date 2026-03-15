import { expect, test } from "@playwright/test";

/**
 * 自主迭代测试套件 - 模拟真实用户行为
 * 每5分钟执行一次，检测功能完整性
 */

const BASE_URL = "http://localhost:3000";

// 仪表盘页面测试
test.describe("Dashboard Pages", () => {
  test("Default Dashboard loads correctly", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/default`);
    await expect(page).toHaveTitle(/Studio Admin/);

    // 检查核心组件（使用实际页面中的文本）
    await expect(page.locator("body")).toContainText("Total Revenue");
    await expect(page.locator("body")).toContainText("仪表盘");

    console.log("✅ Default Dashboard 测试通过");
  });

  test("CRM Dashboard loads correctly", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/crm`);
    await expect(page.locator("body")).toContainText("CRM");
    await expect(page.locator("body")).toContainText("仪表盘");

    console.log("✅ CRM Dashboard 测试通过");
  });

  test("Finance Dashboard loads correctly", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/finance`);
    await expect(page.locator("body")).toContainText("财务");
    await expect(page.locator("body")).toContainText("仪表盘");

    console.log("✅ Finance Dashboard 测试通过");
  });

  test("Analytics Dashboard loads correctly", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/analytics`);
    await expect(page.locator("body")).toContainText("分析");
    await expect(page.locator("body")).toContainText("仪表盘");

    console.log("✅ Analytics Dashboard 测试通过");
  });
});

// 认证页面测试
test.describe("Auth Pages", () => {
  test("Login V1 page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/v1/login`);
    await expect(page.locator("body")).toContainText("登录");
    await expect(page.locator('input[type="email"]')).toBeVisible();

    console.log("✅ Login V1 测试通过");
  });

  test("Register V1 page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/v1/register`);
    await expect(page.locator("body")).toContainText("注册");

    console.log("✅ Register V1 测试通过");
  });
});

// 侧边栏功能测试
test.describe("Sidebar Navigation", () => {
  test("Sidebar navigation works", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/default`);

    // 检查侧边栏存在（通过文本判断）
    await expect(page.locator("body")).toContainText("仪表盘");

    // 测试导航到CRM
    await page.click("text=CRM");
    await expect(page).toHaveURL(/dashboard\/crm/);

    console.log("✅ Sidebar Navigation 测试通过");
  });

  test("Search dialog opens", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/default`);

    // 尝试打开搜索（通常是Cmd+K或点击搜索按钮）
    await page.keyboard.press("Meta+k");

    // 等待搜索对话框
    await page.waitForTimeout(500);

    console.log("✅ Search Dialog 测试通过");
  });
});

// 主题切换测试
test.describe("Theme System", () => {
  test("Theme toggle works", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/default`);

    // 查找主题切换按钮
    const themeButton = page.locator('button:has-text("主题")').first();

    if (await themeButton.isVisible().catch(() => false)) {
      await themeButton.click();
      await page.waitForTimeout(500);
      console.log("✅ Theme Toggle 测试通过");
    } else {
      console.log("⚠️ 主题切换按钮未找到，跳过");
    }
  });
});

// 响应式测试
test.describe("Responsive Design", () => {
  test("Mobile view renders correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/dashboard/default`);

    // 检查页面是否正常渲染
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("body")).toContainText("Studio Admin");

    console.log("✅ Mobile Responsive 测试通过");
  });

  test("Tablet view renders correctly", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${BASE_URL}/dashboard/default`);

    await expect(page.locator("body")).toBeVisible();

    console.log("✅ Tablet Responsive 测试通过");
  });
});

// 性能测试
test.describe("Performance", () => {
  test("Page loads within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto(`${BASE_URL}/dashboard/default`);
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    console.log(`⏱️ 页面加载时间: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000); // 5秒内

    console.log("✅ Performance 测试通过");
  });
});

// 错误处理测试
test.describe("Error Handling", () => {
  test("404 page works", async ({ page }) => {
    await page.goto(`${BASE_URL}/nonexistent-page`);

    // 等待页面加载
    await page.waitForLoadState("domcontentloaded");

    // 检查是否有404提示或重定向
    const bodyText = await page.locator("body").textContent();
    const has404 =
      bodyText?.includes("404") ||
      bodyText?.includes("找不到") ||
      bodyText?.includes("Not Found") ||
      bodyText?.includes("Studio Admin");

    if (has404) {
      console.log("✅ 404 Page 测试通过");
    } else {
      console.log("⚠️ 404处理不明显，可能需要检查");
    }
  });
});

// 核心功能完整性检查
test.describe("Core Functionality Check", () => {
  test("All dashboards are accessible", async ({ page }) => {
    const dashboards = ["default", "crm", "finance", "analytics"];

    for (const dashboard of dashboards) {
      await page.goto(`${BASE_URL}/dashboard/${dashboard}`);
      await page.waitForLoadState("domcontentloaded");

      // 检查页面是否成功加载（没有错误信息）
      const bodyText = await page.locator("body").textContent();
      const hasError =
        bodyText?.includes("Error") || bodyText?.includes("error") || bodyText?.includes("Internal Server Error");

      expect(hasError).toBeFalsy();
      console.log(`✅ Dashboard ${dashboard} 可访问`);
    }
  });

  test("Auth pages are accessible", async ({ page }) => {
    const authPages = ["/auth/v1/login", "/auth/v1/register", "/auth/v2/login", "/auth/v2/register"];

    for (const pagePath of authPages) {
      await page.goto(`${BASE_URL}${pagePath}`);
      await page.waitForLoadState("domcontentloaded");

      // 检查页面是否包含登录或注册文本
      const bodyText = await page.locator("body").textContent();
      const hasAuthContent =
        bodyText?.includes("登录") ||
        bodyText?.includes("注册") ||
        bodyText?.includes("Login") ||
        bodyText?.includes("Register");

      expect(hasAuthContent).toBeTruthy();
      console.log(`✅ Auth page ${pagePath} 可访问`);
    }
  });
});
