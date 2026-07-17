# 新对话续聊提示词（复制以下全部）

---

请先阅读本仓库，再继续：`AGENTS.md`、`docs/00-decisions.md`、`docs/08-ops-roadmap.md`、`docs/06-next-steps.md`、`site/`。

## 摘要

US Scene Buy：美国纯联盟、厨房排水垂直站（`site/`）。派安盈美国户可复用收款。无收入不投放。

## 当前阻塞

公开 HTTPS 部署脚本已写好，但环境未登录 GitHub。用户若已 `gh auth login`，执行：

```bash
bash scripts/deploy-github.sh
```

然后用 `https://<user>.github.io/us-scene-buy/` 申请 Associates。获批后把 tag 发给 Agent，写入 `site/assets/quiz.js` 的 `AFFILIATE_TAG`。

## 本次请继续

1. 若已有公开 URL / gh 已登录：跑部署、确认 Pages 绿、更新 `06`  
2. 获批后写入 `AFFILIATE_TAG` 并硬测  
3. 勿扩多品类；Associates 申请无法由 Agent 代操作  

工作语言：中文。

---
