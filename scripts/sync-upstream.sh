#!/usr/bin/env bash
# sync-upstream.sh
# 用法：./scripts/sync-upstream.sh
# 功能：拉取上游最新代码，将 i18n/zh 分支 rebase 到最新上游之上

set -e

echo "🔄 拉取上游最新代码..."
git fetch upstream

echo "📋 切换到 i18n/zh 分支..."
git checkout i18n/zh

echo "⬆️  Rebase 到 upstream/main..."
git rebase upstream/main

echo ""
echo "✅ 同步完成！当前分支 i18n/zh 已是最新上游 + i18n 改动。"
echo ""
echo "如有冲突，请手动解决后执行："
echo "  git add <冲突文件>"
echo "  git rebase --continue"
echo ""
echo "如需推送到远程："
echo "  git push origin i18n/zh --force-with-lease"
