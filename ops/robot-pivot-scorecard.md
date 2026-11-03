# 扫地机器人耗材兼容 · 6～8 周记分卡

> 启动：2026-09-14（生产部署完成，commit `017fd86`，Day 0）
> 统计只认真实外部访问；本人/亲友测试、爬虫、激励点击不计。  
> Amazon 后台和 GSC 需要用户本人查看；Agent 负责站点、Umami、整理与判定。

## 基线

| 指标 | 改刀前 |
|---|---:|
| GSC（2026-08-17～26） | 2 impressions / 0 clicks |
| Associates（同窗口） | 0 Clicks / 0 Orders |
| 机器人型号页 | 0 |

## 每周记录

| 周 | 窗口 | 型号页 GSC 展示 | 型号页 GSC 点击 | Umami 型号页访问 | `robot-model-selected` | `amazon-outbound` | Associates Clicks | Orders | 备注 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| W1 | Day 0–7 | — | — | — | — | — | — | — | 2026-09-14 GSC：属性正确；`/robots/` + Qrevo Pro / MaxV / L40 Ultra 均已 Request indexing（priority crawl queue） |
| W2 | Day 8–14 | 0（型号页） | 0 | 0 | 0 | 0 | 0 | 0 | 2026-09-28 周检：GSC 仅首页 2 展示/0 点击（约 8/18）；Queries No data；四页 not on Google，已再 Request indexing。Umami Last 30d/Today 全 0。Associates 9/14–9/28 **no data**（0/0）。税：US Validated；Canada Incomplete 搁置 |
| W3 | Day 15–21 | — | — | — | — | — | — | — | 未做用户周检（空窗） |
| W4 | Day 22–28 | — | — | — | — | — | — | — | 未做用户周检（空窗） |
| W5 | Day 29–35 | — | — | — | — | — | — | — | 未做用户周检（空窗） |
| W6 | Day 36–42 | — | — | — | — | — | — | — | 首次门闩窗口；无后台数据落盘 |
| W7 | Day 43–49 | — | — | — | — | — | — | — | 无后台数据落盘 |
| W8 | Day 50–56 | 未知（无 GSC 授权） | 未知 | 未知 | 未知 | 未知 | 未知 | 未知 | **2026-11-03 Agent 终门闩自检**：site-audit OK；生成页无脏 diff；IndexNow 38 URL → HTTP 200；线上型号页 200。公开检索可见 hub/首页/about，**未见**单型号页对「完整型号 + replacement」商用词占位；上次真人 GSC（W2）型号页仍 not on Google / 0·0。**判定：停止扩写**（保留 10 型号页；不增第三品牌/第二品类/电池维修；继续 IndexNow + 周检，不伪造点击） |

## 计算

```text
型号页 Amazon 出站 CTR
= Umami amazon-outbound 去重会话数 / 型号页真实访问会话数
```

Amazon Associates Clicks 作为平台侧核对；两边数字可能因隐私拦截、时区或归因规则不同，不强求相等。

## 判定

### 继续并扩型号

同时满足：

1. 多个型号页出现与完整型号 + 耗材相关的 GSC query；
2. 有足够真实访问时，型号页 Amazon 出站 CTR 约 ≥12%；
3. 点击集中到具体型号 / 具体耗材，而不是只有泛导航；
4. 无兼容投诉、Amazon 合规警告或来源失效。

出现真实 Orders 是加速信号，但不伪造、不承诺数量。

### 停止扩写

任一成立：

- W8 仍没有可辨识的精确型号搜索信号；
- 有相关型号页访问，但 Amazon 出站接近 0；
- 多数点击只能靠泛词或误导性“兼容”表述获得；
- 厂商资料不足以稳定区分型号家族。

停止时保留页面，不用第三品牌、第二品类或堆薄页“补流量”。

## Amazon 180 天风险

官方规则：申请后前 180 天至少 3 个合格销售才进入审核，个人订单不算。账号约 2026-07-17 启动，暂按 2027-01 中旬为风险窗口；以 Associates 后台实际日期为准。每周只抄真实 Clicks / Orders，不做本人、亲友或激励购买。
