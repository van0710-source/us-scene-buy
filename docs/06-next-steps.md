# 下一步工作项

更新日期：2026-09-14

**站点**：https://van0710-source.github.io/us-scene-buy/  
**跨仓**：[`/Users/apple/Projects/growth`](../../growth/README.md)（Maya / 社媒）；本仓不假设已有导购子号在跑。  
**子号草案**：[`10-social-subaccount-persona.md`](10-social-subaccount-persona.md)（停泊 · 不起号）
**当前改刀**：扫地机器人精确型号耗材兼容；旧排水 / 空气 / 硬地页停止扩写。

## 阶段

| 阶段 | 状态 |
|------|------|
| Associates + 税 + Direct Deposit | 完成（0% 预提） |
| GSC 验证 + sitemap | 完成（用户一次操作） |
| GSC impressions | 旧站基线：2026-08-17～26 共 2 展示 / 0 点击；改刀后重新按型号页建基线 |
| 当前有机获客 | **扫地机器人兼容第一轮**：10 型号页 + 单字段选择器 |
| 转化形态 | **完整型号 → 厂商来源兼容说明 → Amazon 精确搜索入口** |
| 社媒导购子号 | **停泊 · 不起号**（除非 Agent 可自动发帖且书面改口令）；草案 `10` |
| GEO | **按需**：`llms.txt` 映射；不替代精确型号 SEO，不开号前置 |
| 社区代发 | **不做**（无自动发帖能力前） |

## 第一轮执行（2026-09-14）

- [x] 建立 10 型号兼容矩阵：`site/assets/robot-compatibility.json`
- [x] 生成单字段选择器 + 10 型号静态页：`scripts/generate-robot-pages.py`
- [x] 兼容页逐件 Amazon 入口 + 厂商来源 + 相近型号警告
- [x] 首页主入口改为 Robot parts；排水降为 archive
- [ ] 部署后核公开 URL、sitemap、资源与选择器
- [ ] 按 `ops/robot-pivot-scorecard.md` 每周记 GSC 精确型号词、Umami 型号选择/出站、Associates Clicks/Orders
- [ ] 6～8 周门闩：多页有精确词信号；有足够真实访问时出站 CTR 约 ≥12%

## 暂缓

付费投放、Reddit 养号、**导购子号开号**、无审批的社媒代发。  
旧排水、空气、硬地页不删除但停止扩写。首轮未过门闩前不增第三品牌、第二大品类、机器人电池或内部维修。
