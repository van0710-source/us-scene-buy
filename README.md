# US Scene Buy

美国市场、纯联盟模式的 **精确型号耗材兼容助手**（细分垂直起步）。

**Live site:** https://van0710-source.github.io/us-scene-buy/

Current public tools:
- [Robot vacuum parts by exact model](https://van0710-source.github.io/us-scene-buy/robots/)
- [Kitchen drain guide archive](https://van0710-source.github.io/us-scene-buy/guides/)
- [How compatibility is verified](https://van0710-source.github.io/us-scene-buy/about.html)

## 一句话定位

面向已经准备购买替换耗材的美国用户：用完整设备型号匹配尘袋、滤网、拖布和刷件，明确相近型号的错配风险，再给联盟追踪链接；不经手货款。

## 当前 MVP 切口（2026-09-14 改刀）

**扫地机器人完整型号 → 可核验耗材兼容 → Amazon 当前选项**

首批 10 个 Roborock / Dreame 型号；厨房排水、空气和硬地页面保留为历史探针，但停止扩写。

## 文档索引

| 文件 | 内容 |
|------|------|
| [docs/00-decisions.md](docs/00-decisions.md) | 已锁定决策清单 |
| [docs/01-business-model.md](docs/01-business-model.md) | 纯联盟、现金流、交椅 |
| [docs/02-differentiation.md](docs/02-differentiation.md) | 场景利益点差异化 |
| [docs/03-category-strategy.md](docs/03-category-strategy.md) | 方案乙与品类策略 |
| [docs/04-compliance.md](docs/04-compliance.md) | 合规与拒答边界 |
| [docs/05-data-moat.md](docs/05-data-moat.md) | 决策资产（对内，不对外宣称） |
| [docs/06-next-steps.md](docs/06-next-steps.md) | 下一步工作项 |
| [docs/07-mvp-kitchen-drain.md](docs/07-mvp-kitchen-drain.md) | MVP：厨房堵塞/异味问卷·输出·拒答·SKU |
| [docs/08-ops-roadmap.md](docs/08-ops-roadmap.md) | **操作总图**：阶段、联盟、软硬测、瓶颈 |
| [docs/09-seo-maintenance.md](docs/09-seo-maintenance.md) | P1：SEO 选题地图 + ③→① 养护路径 |
| [site/](site/) | **扫地机器人耗材兼容站**（旧排水内容保留归档） |
| [site/assets/robot-compatibility.json](site/assets/robot-compatibility.json) | 首批 10 型号兼容矩阵与权威来源 |
| [scripts/generate-robot-pages.py](scripts/generate-robot-pages.py) | 从矩阵生成首页、型号页与发现文件 |
| [prototype/kitchen-drain.html](prototype/kitchen-drain.html) | 早期单页原型（已由 `site/quiz.html` 承接） |
| [CONTINUE_PROMPT.md](CONTINUE_PROMPT.md) | **新对话续聊提示词（复制即用）** |
| [AGENTS.md](AGENTS.md) | Agent 工作约定 |

## 原则（对外）

- 只做用户决策体验，**不暴露**「大平台 / 数据库护城河」叙事
- AI 完成绝大部分交付；人不碰商品货款现金流
- 不做大而全，先单细分飞轮
