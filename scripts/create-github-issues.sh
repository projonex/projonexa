#!/usr/bin/env bash
# Create GitHub issues from docs/GITHUB_ISSUES_BACKLOG.md
# Requires: Node 20+, gh CLI (gh auth login), milestones + labels on GitHub

set -euo pipefail
cd "$(dirname "$0")/.."

node scripts/create-github-issues.mjs "$@"
