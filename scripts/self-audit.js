#!/usr/bin/env node

/**
 * 项目自主审计脚本
 * 持续扫描项目，找出可优化点
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const REPORT_FILE = path.join(PROJECT_ROOT, '.audit-report.json');

class ProjectAuditor {
  constructor() {
    this.issues = [];
    this.recommendations = [];
    this.stats = {};
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  // 扫描TODO和FIXME注释
  scanTodos() {
    this.log('🔍 扫描 TODO/FIXME 注释...');
    try {
      const result = execSync(
        `grep -r "TODO\\|FIXME\\|XXX\\|HACK" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" ${PROJECT_ROOT}/src || echo ""`,
        { encoding: 'utf8', cwd: PROJECT_ROOT }
      );
      
      if (result.trim()) {
        const todos = result.split('\n').filter(Boolean);
        this.issues.push({
          type: 'todo',
          severity: 'info',
          count: todos.length,
          items: todos.slice(0, 10),
          message: `发现 ${todos.length} 个 TODO/FIXME 标记`
        });
      }
    } catch {
      // 没有TODO也是正常的
    }
  }

  // 检查console.log
  scanConsoleLogs() {
    this.log('🔍 检查 console.log...');
    try {
      const result = execSync(
        `grep -r "console.log\\|console.warn\\|console.error" --include="*.ts" --include="*.tsx" ${PROJECT_ROOT}/src/app || echo ""`,
        { encoding: 'utf8', cwd: PROJECT_ROOT }
      );
      
      if (result.trim()) {
        const logs = result.split('\n').filter(Boolean);
        this.issues.push({
          type: 'console',
          severity: 'warning',
          count: logs.length,
          message: `发现 ${logs.length} 个 console 语句（生产环境应移除）`
        });
      }
    } catch {
      // 忽略错误
    }
  }

  // 检查路由完整性
  scanRoutes() {
    this.log('🔍 扫描路由完整性...');
    const appDir = path.join(PROJECT_ROOT, 'src/app');
    
    const routes = [];
    const walkDir = (dir, prefix = '') => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        if (item.isDirectory() && !item.name.startsWith('_') && !item.name.startsWith('.')) {
          const fullPath = path.join(dir, item.name);
          const routePath = prefix + '/' + item.name;
          
          // 检查是否有page.tsx
          if (fs.existsSync(path.join(fullPath, 'page.tsx'))) {
            routes.push(routePath);
          }
          
          walkDir(fullPath, routePath);
        }
      }
    };
    
    walkDir(appDir);
    this.stats.routes = routes.length;
    this.log(`📊 发现 ${routes.length} 个路由页面`);
  }

  // 检查依赖更新
  checkDependencies() {
    this.log('🔍 检查依赖状态...');
    try {
      const outdated = execSync('npm outdated --json 2>/dev/null || echo "{}"', {
        encoding: 'utf8',
        cwd: PROJECT_ROOT
      });
      
      const outdatedPackages = JSON.parse(outdated);
      const outdatedCount = Object.keys(outdatedPackages).length;
      
      if (outdatedCount > 0) {
        this.recommendations.push({
          type: 'dependencies',
          priority: 'low',
          message: `${outdatedCount} 个依赖有更新可用`
        });
      }
      
      this.stats.outdatedPackages = outdatedCount;
    } catch {
      // 忽略错误
    }
  }

  // 检查测试覆盖
  checkTestCoverage() {
    this.log('🔍 检查测试覆盖...');
    const e2eDir = path.join(PROJECT_ROOT, 'e2e');
    
    if (!fs.existsSync(e2eDir)) {
      this.recommendations.push({
        type: 'testing',
        priority: 'high',
        message: '缺少 E2E 测试，建议添加 Playwright 测试'
      });
    } else {
      const getTestFiles = (dir) => {
        const files = [];
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
          const fullPath = path.join(dir, item.name);
          if (item.isDirectory()) {
            files.push(...getTestFiles(fullPath));
          } else if (item.name.endsWith('.spec.ts')) {
            files.push(item.name);
          }
        }
        return files;
      };
      
      const tests = getTestFiles(e2eDir);
      this.stats.e2eTests = tests.length;
    }
  }

  // 生成报告
  generateReport() {
    this.log('📊 生成审计报告...');
    
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      issues: this.issues,
      recommendations: this.recommendations,
      summary: {
        totalIssues: this.issues.length,
        criticalIssues: this.issues.filter(i => i.severity === 'error').length,
        warnings: this.issues.filter(i => i.severity === 'warning').length,
        recommendations: this.recommendations.length
      }
    };
    
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
    
    this.log('\n' + '='.repeat(60));
    this.log('📋 审计报告摘要');
    this.log('='.repeat(60));
    this.log(`📁 路由页面: ${this.stats.routes || 0}`);
    this.log(`🧩 组件数量: ${this.stats.components || 0}`);
    this.log(`🧪 E2E 测试: ${this.stats.e2eTests || 0}`);
    this.log(`📦 过期依赖: ${this.stats.outdatedPackages || 0}`);
    this.log(`⚠️  问题数量: ${report.summary.totalIssues}`);
    this.log(`💡 优化建议: ${report.summary.recommendations}`);
    this.log('='.repeat(60));
    
    // 输出建议
    if (this.recommendations.length > 0) {
      this.log('\n💡 优化建议:');
      this.recommendations.forEach((rec) => {
        const priorityEmoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        this.log(`  ${priorityEmoji} ${rec.message}`);
      });
    }
    
    if (this.issues.length > 0) {
      this.log('\n⚠️  发现的问题:');
      this.issues.forEach((issue) => {
        const emoji = issue.severity === 'error' ? '🔴' : issue.severity === 'warning' ? '🟡' : '🟢';
        this.log(`  ${emoji} ${issue.message}`);
      });
    }
    
    return report;
  }

  run() {
    this.log('\n🚀 启动项目审计...\n');
    
    this.scanTodos();
    this.scanConsoleLogs();
    this.scanRoutes();
    this.checkDependencies();
    this.checkTestCoverage();
    
    return this.generateReport();
  }
}

// 运行审计
const auditor = new ProjectAuditor();
auditor.run();
