# Agent 自主运营（默认由本仓 Agent 执行）

更新日期：2026-11-03

用户要求 Agent 自行完成运营日常。本文件锁定**谁做什么**；与 [`acquisition-week1.md`](acquisition-week1.md)、[`robot-pivot-scorecard.md`](robot-pivot-scorecard.md) 一并使用。

## Agent 必须自己做（不打扰用户）

| 节奏 | 动作 |
|------|------|
| 每次接手 / 每周 | `python3 scripts/site-audit.py`；`python3 scripts/generate-robot-pages.py` 后确认无脏 diff |
| 每次接手 / 内容变更后 | `bash scripts/indexnow-submit.sh`（或依赖 Pages 部署后的 CI） |
| 每周 | 公开检索探测（`site:` / 型号词）；核对线上入口 HTTP 200 |
| 每周 | 更新 [`robot-pivot-scorecard.md`](robot-pivot-scorecard.md) 能由 Agent 观测的列与备注 |
| 门闩日 | 按记分卡判定「停扩 / 继续观察 / 扩型号」并回写 `docs/06`、`CONTINUE_PROMPT.md` |
| 持续 | 站内 SEO / 转化文案 / 内链 / FAQ·llms（**不**扩第三品牌、电池、维修、旧排水，除非书面改口令） |
| 禁止代劳 | 社媒开号/发帖、付费投放、自点联盟链、亲友下单、伪造访问 |

## 仍需用户本人（Agent 无法代登录）

仅这三项后台；**有数据时贴截图/数字即可**，平时不要求用户操作：

1. **GSC** Performance（型号页展示/点击/查询）与 URL 索引状态  
2. **Umami** Cloud（`3eb5fde2-…`）型号页与 `robot-model-selected` / `amazon-outbound`  
3. **Associates** Consolidated Summary：`usscenebuy-20` 的 Clicks / Orders  

可选一次性授权（之后 Agent 可少打扰）：Umami Share URL 或只读 API key；GSC 只读导出。未授权前，Agent 用公开检索 + 站点健康代替 GSC 列，Umami/Associates 记「未授权/未知」，**不以自点补零**。

## 税 / 收款

- US Tax：**Validated** — 勿重填  
- Canada：**Incomplete** — 继续搁置（仅 amazon.com）  
- Direct Deposit：已配置；无佣金时无动作
