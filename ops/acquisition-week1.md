# 获客运营（Agent 自主路径）

更新日期：2026-09-14

## 2026-09-14 改刀

- 当前主线：扫地机器人精确型号耗材兼容；旧厨房排水内容降为 archive。
- 首轮入口：10 个 Roborock / Dreame 型号页 + 单字段型号选择器。
- 无真人访谈门闩：改看 GSC 精确型号词、Umami 型号页/出站事件、Associates Clicks/Orders。
- 每周记录；6～8 周后判断。多个型号页有搜索信号，且有足够真实访问时 Amazon 出站 CTR 约 ≥12% 才扩。
- 停止扩排水、空气、硬地；首轮未过门闩前不增第三品牌或电池/维修内容。

## 边界（已锁定）

| 谁做 | 做什么 |
|------|--------|
| **Agent 自主** | 写指南、改转化、部署 Pages、IndexNow 提交、扩 sitemap/FAQ schema |
| **growth 仓** | Maya 主号人设 / 开号 / 披露红线；us-scene-buy **不是**已定稿社媒子号 |
| **不要求用户** | Reddit / Quora / 论坛发帖、日常 SEO 后台操作、未批准的子号运营 |
| **用户仅一次（已完成）** | GSC 验证 + 提交 sitemap（账号必须本人） |

Reddit / 导购子号：**本阶段不起号**。开号仅当本仓 Agent 具备自动发帖（含审批）且书面改口令。默认 SEO；GEO 见 `site/llms.txt` 与页内 FAQ schema。草案停泊：[`docs/10-social-subaccount-persona.md`](../docs/10-social-subaccount-persona.md)。

## 转化定位（2026-09-14 改口令）

- 角色：购买末段的**兼容确认**，不是主观评测站。
- 页面：完整型号、耗材家族、近似型号错配警告、逐件 Amazon 当前选项。
- 证据：厂商兼容页是事实来源；Amazon 搜索结果只作购物入口。
- 禁止：亲测措辞、复制评论、手填实时价格、电池与内部维修。

## Agent 已接通的获客管道

1. **站内 SEO**：`品牌 + 完整型号 + replacement part` 静态兼容页
2. **IndexNow**：`scripts/indexnow-submit.sh`；每次 Pages 部署后 CI 自动提交  
3. **GSC sitemap**：你已提交；后续抓取由 Google 处理  
   - **2026-08-17**：GSC 邮件确认已开始收集 Search **impressions**（属性 `van0710-source.github.io/us-scene-buy/`）
   - **2026-08-20**：用户截图确认；下一步看 Performance → Top pages / Top queries（展示≠点击≠订单）
   - **2026-09-14**：新型号页上线后单独建立 page/query 基线
4. **联盟转化**：`tag=usscenebuy-20` 已挂在型号页精确 Amazon 搜索入口

站点：https://van0710-source.github.io/us-scene-buy/

## 本周看什么（成交相关）

| 指标 | 哪里看 |
|------|--------|
| Clicks | Associates 报表（按 ASIN / 日期） |
| Orders | Associates Orders / Ordered items |
| 展示 | GSC 展示/点击（有机是否开始） |

**增长报告收件箱（2026-08-17 确认）：** `van0710@gmail.com`（主运营）；不用 Maya Layer1 `van.paddle335@gmail.com`。  
触发：展示/点击/订单从 0→有，或日环比明显上升 → Agent 发短报。

禁止用本人、亲友或受指示人员制造联盟点击/购买；不以“24 小时内加购保归因”影响用户行为。

## 5 日启动口径（2026-08-17）

- **可控目标**：5 日内新增至少 10 次真实站点访问；排除本人、亲友任务流量与自动抓取。
- **争取目标**：Associates 首批 Clicks；Orders 由真实购买决定，不能合规保证数量。
- **历史入口**：排水症状 hub + 长尾页均保留，但停止扩写。
- **公开分发**：GitHub repo 首页/描述/topics、release 页面、Atom feed、IndexNow；不创建社媒号、不群发、不发联盟链接到私域。
- **持续机制**：每周 CI 检查 sitemap、canonical、披露、内部链接与在线入口；内容有变更时由部署流程提交 IndexNow。

## 现实预期（零付费）

- 有机流量通常要 **数周～数月** 才稳定。  
- 「尽快佣金」= **页内可点 Amazon + 被索引 + 真实搜索访问**；无访问时报表为零不证明定位错。
- 若型号页 6～8 周仍无可辨识精确词信号，结论是当前切口/域名无法获得自然注意力；不把爬虫、自点或堆薄页包装成增长。

## 短链

```
Home:  https://van0710-source.github.io/us-scene-buy/
Quiz:  https://van0710-source.github.io/us-scene-buy/quiz.html
Enzyme: https://van0710-source.github.io/us-scene-buy/guides/best-enzyme-drain-cleaner-kitchen.html
Air: https://van0710-source.github.io/us-scene-buy/guides/air-purifier-room-size.html
Floor: https://van0710-source.github.io/us-scene-buy/guides/hard-floor-cleaner-pick.html
Sitemap: https://van0710-source.github.io/us-scene-buy/sitemap.xml
```
