# MVP 原型：厨房堵塞 / 排水异味

可直接用于对话/表单原型。场景：③ 急用选品；可挂「养护下一步」入口（①）。

---

## 1. 约束问卷（≤5 题，选项为主）

对外英文体验文案以 [`prototype/kitchen-drain.html`](../prototype/kitchen-drain.html) 为准（朋友式顾问口吻）。下表为**内部枚举**。

### 问卷评分（对内，2026-07-17 修订）

| 版本 | 分（/10） | 说明 |
|------|-----------|------|
| 初版（症状+系统+disposal 分立+限制+已尝试） | **7** | 安全路由强；缺「油脂/成因」利益锚，disposal 对推荐话术贡献弱 |
| 现行（症状含烹饪信号 + 系统 + **成因∪disposal** + 限制 + 已尝试） | **8.5** | 补齐场景利益锚；仍保留 septic/租房/已用化学等合规硬约束 |

> 对内沉淀维度：症状、系统、成因、disposal、硬限制、已尝试 —— 均直接改变主推/拒答；对外不宣传「护城河」。

### Q1. 现在水槽什么情况？（症状 + 烹饪/油脂信号）

| 值 | 含义（对内） |
|----|----------------|
| `full_clog` | 几乎堵死 |
| `slow_drain` | 慢，尤其做饭后（油脂模式） |
| `odor_only` | 主要异味，仍下水 |
| `odor_and_slow` | 异味 + 慢 |

### Q2. 排水接到什么系统？

| 值 | 选项 |
|----|------|
| `sewer` | 市政下水 |
| `septic` | 化粪池 |
| `unsure` | 不清楚 |

> 路由：`septic` / `unsure` → 禁用强腐蚀化学疏通剂作主推。

### Q3. 你觉得管道里主要是什么？（成因 ∪ disposal）

| 值 | 归一化 |
|----|--------|
| `grease_disposal` | `cause=grease`, `disposal=disposal_yes` |
| `grease_no_disposal` | `cause=grease`, `disposal=disposal_no` |
| `unsure_cause` | `cause=unsure`, `disposal=disposal_unsure` |

> 厨房主线用油脂/食物作利益锚；disposal 影响清洁步骤与产品边界话术。

### Q4. 需要保守一点的原因？（可多选；无则选 none）

| 值 | 选项 |
|----|------|
| `rental_no_harsh` | 租房 / 不宜强化学 |
| `old_pipes` | 老旧管道 |
| `kids_pets` | 孩宠，少刺激性化学品 |
| `none` | 没有以上限制 |

> 任一非 `none` → 主推偏酶/物理；强化学最多备选或「不买」。

### Q5. 已经试过什么？

| 值 | 选项 |
|----|------|
| `tried_none` | 还没试 |
| `tried_mechanical` | 物理方法 |
| `tried_chemical` | 已用化学疏通剂 |
| `tried_pro_contact` | 已约/准备约管道工 |

> `tried_chemical` → 拒新化学剂叠用。`tried_pro_contact` + `full_clog` → 优先等待专业人士。

### 问卷结束时的内部路由摘要

```text
constraints = { Q1, Q2, cause, disposal, Q4, Q5 }  // Q3 归一化
if septic|unsure OR rental_no_harsh|old_pipes|kids_pets:
  chemical_harsh = blocked_as_primary
if tried_chemical:
  any_new_chemical = refuse
if full_clog AND (septic|old_pipes|tried_chemical|tried_pro_contact):
  prefer_no_buy_or_pro
if cause=grease AND not refuse AND not harsh_primary_path:
  prefer enzyme_maintain in benefit copy
```
---

## 2. 输出模板

每次回答按此结构生成（字段勿缺）。

### 2.1 页眉（必出）

```text
【披露】本页含联盟推广链接；你在零售商处购买，我们可能获得佣金。价格与库存以结账页为准（信息核对于：{YYYY-MM-DD}）。
【安全】勿混用不同排水化学品（尤其含氯与酸碱类）。一律按产品标签使用。
```

### 2.2 对你这次情况的理解（2～3 句）

用用户选项复述约束，不用夸大：

```text
你的情况：{Q1 白话}；系统 {Q2}；垃圾处理机 {Q3}；限制 {Q4}；已尝试 {Q5}。
因此优先：{physical | enzyme_maintain | harsh_chemical | call_pro | wait}。
```

### 2.3 主推荐（恰好 1 个）

```markdown
### 主推荐：{产品名 / 类型名}

- **对你意味着什么**：{场景利益点，对准 Q1–Q4 原话约束}
- **约束对齐**：命中 [{约束值列表}]
- **事实锚**（可核对）：{厂商标称 / 标签用途 / 公开规格} —— 类型：`label` | `spec` | `brand_claim`
  - 原文或要点：「…」
  - 我们不保证：疏通成功率、永不复发、具体分钟数（除非标签写明且如实引用）
- **使用边界**：{如：仅厨房水槽油脂类；化粪池是否适用以标签为准}
- **购买**：[{零售商}]({affiliate_url}) 
- **不推荐给**：{与备选/拒买对照的一句话}
```

### 2.4 备选（0～2 个）

每个备选必须写清「换哪条约束才会更合适」：

```markdown
### 备选 {n}：{产品名 / 类型名}

- **更适合若**：{不同约束，如「确定是市政下水且无租房限制」}
- **对你意味着什么**：…
- **事实锚**：…
- **购买**：[{零售商}]({affiliate_url})
```

### 2.5 不买 / 等待 / 先非购买（必出一段）

至少覆盖当前最相关的一条：

| 条件 | 建议文案骨架 |
|------|----------------|
| `full_clog` 且未试物理 | 先皮搋子或适合厨房的手摇疏通；仍不通再考虑产品或管道工。 |
| `tried_chemical` | 不要再倒另一种化学剂。按标签冲洗/等待，或请管道工；我们本次不推荐新的化学疏通剂。 |
| `septic` / `old_pipes` / `rental_no_harsh` | 强化学剂风险高或违约风险；优先物理或标签标明 septic-safe 的酶/生物型（仍按标签）。 |
| 异味为主且下水正常 | 可先热水+清洁篮渣/检查 disposal 橡胶裙边；未必需要疏通剂。 |
| 已约管道工 | 等待上门前不建议叠加化学剂，以免增加作业风险。 |

```markdown
### 也可以不买 / 先等待

{上表选一条展开 2～4 句}
```

### 2.6 养护下一步（轻量，导向 ①）

```markdown
### 下次别等到堵死

若这次解决后仍想降低复发：可考虑定期酶制剂/管道养护耗材（标签用途：维护而非急救）。
→ CTA：查看养护选项（原型可先占位）
```

### 2.7 利益点 ↔ 约束 ↔ 事实锚（机器可读示意）

原型可用 JSON 校验输出完整性：

```json
{
  "primary": {
    "sku_or_type": "",
    "benefit": "",
    "constraints_hit": ["slow_drain", "septic", "kids_pets"],
    "anchor": { "type": "label", "text": "" },
    "affiliate_url": ""
  },
  "alternates": [],
  "no_buy": { "reason_code": "tried_chemical", "message": "" },
  "disclosure": true,
  "as_of": "2026-07-17"
}
```

---

## 3. 合规拒答要点（可执行规则文案）

命中规则时：**短拒答 + 安全下一步**；不编造功效；不输出冲突化学剂链接。

### 3.1 硬拒答（不推荐购买类方案）

| ID | 触发 | 对用户说（可直接用） |
|----|------|----------------------|
| R1 | 用户要求「和刚才那种疏通剂再配一种一起用 / 混倒」 | 不建议，也不提供这类搭配。不同排水化学品混用可能产生危险反应。请只按当前产品标签操作；不确定就停用并联系管道工或中毒控制资源。 |
| R2 | `tried_chemical` 且仍要强化学剂 | 你已经用过化学疏通剂了，我不能再推荐另一种叠用。请按标签处理或请专业管道工，而不是再买一支更「猛」的。 |
| R3 | 要求保证「一次必通 / 永不复发 / 比管道工一定更便宜」 | 做不到这种保证。我只能按标签用途和你的限制做选项比较；完全堵死或反复堵塞，专业管道工往往更合适。 |
| R4 | 把排水产品当成消毒、防疫、防病、治病 | 这类产品不是药品或医疗方案，我不提供医疗/防疫建议。只讨论排水清洁与标签用途。 |
| R5 | 主诉已超出厨房水槽（整屋反水、污水上涌、多层漏水） | 这超出选品范围，优先停用电器相关风险源并联系管道工或房东，而不是网购疏通剂。 |

### 3.2 降级（可答，但不主推强化学）

| ID | 触发 | 行为 |
|----|------|------|
| D1 | `septic` 或 `unsure` | 主推不得为强腐蚀化学疏通剂；仅可推荐标签写明 septic-safe 的类型，或物理工具；并提示「不清楚系统时按更保守选」。 |
| D2 | `old_pipes` / `rental_no_harsh` / `kids_pets` | 同 D1；租房限制要写明：违规定可能影响押金/合同，优先非购买或房东许可方案。 |
| D3 | `full_clog` | 必须同时给出物理方法或呼叫专业人士路径；禁止只丢一个化学剂链接当唯一答案。 |
| D4 | 事实锚不足（无标签用途/无公开规格） | 降级措辞：「常见用于…（需你核对标签）」；宁可「不买/等待」也不编造分钟数与成功率。 |
| D5 | 仅异味、约束很松 | 允许主推养护/酶制剂或清洁步骤；避免恐吓式「必须立刻买疏通剂」。 |

### 3.3 允许的声称梯子（由强到弱）

1. 标签/说明书原文用途  
2. 厂商标称（注明 brand claim）  
3. 「评价里常见…」（不得当功效证明）  
4. 撑不住 → 改「不买 / 先物理 / 打电话」

### 3.4 原型系统提示词（摘录可粘贴）

```text
你是美国市场厨房排水选品助手（纯联盟，不收款不代发）。
先根据 ≤5 题约束作答：主推 1 + 备选 ≤2 + 必须给不买/等待。
利益点必须映射用户约束，并用可核对事实锚；禁止百分百疏通、禁止建议混用化学品。
化粪池/老旧管/租房/已用过化学剂：保守或拒荐新化学剂。
每次输出含联盟披露与「按标签使用」。
对外不谈数据平台或护城河。
```

---

## 4. SKU 池 + 手工推荐样例（纯示意链接）

> 以下为原型走通用：**ASIN 为美国常见在售商品示意**；`tag=` 为占位。上线前需核对标题、标签用途、库存与 Associates 类目合规。  
> 链接结构：`https://www.amazon.com/dp/{ASIN}?tag={ASSOCIATE_TAG}`  
> 事实锚只引用厂商标称/公开卖点类型，**不保证**疏通结果。信息核对于：2026-07-17。

### 4.1 SKU 池（5 个）

| ID | 角色 | 商品（常见称呼） | ASIN | 事实锚类型与要点（需再核标签） |
|----|------|------------------|------|--------------------------------|
| S1 | 物理工具 | Zip-It Hair Clog Remover，25" drain snake（常见 3 包装） | `B08FGH2V5Q` | `brand_claim`：无化学药剂；插入排水口扭转后拉出，用于抓取毛发等堵塞物；开口需大于约 1/4" |
| S2 | 酶/生物·急用偏维护 | Green Gobbler Enzyme Drain Cleaner，1 Gallon | `B079K94HHV` | `brand_claim`：酶配方；卖点含分解油脂/异味相关有机物；宣传可用于 drain / septic / grease trap；非腐蚀性替代叙事（仍按标签） |
| S3 | 化学凝胶疏通 | Liquid-Plumr Industrial Strength Gel，约 42 fl oz | `B00IPUIQIA` | `brand_claim`：凝胶疏通；卖点含对付 hair / grease / soap scum；可用于 kitchen sink、garbage disposal；标签常见警告：勿与污泥搋子/其他疏通剂/氨类混用；勿用于马桶 |
| S4 | ① 养护耗材 | Green Gobbler Septic Tank Enzyme Treatment Packets（约 6 个月装） | `B00ZS4ZAEE` | `brand_claim`：按月投入马桶冲走的 septic 维护包；卖点为分解厕纸/油脂等、辅助减少异味与备份风险（非急救疏通） |
| S5 | 物理·水槽 | 通用厨房水槽杯型皮搋子（cup plunger；选「sink / basin」款，非法兰马桶款） | （上线前锁定具体 ASIN） | `spec`：靠压力差作用于水槽落水口；无化学成分；完全堵死时优先于叠用化学剂 |

示意链接（把 `YOURTAG` 换成 Associates tag）：

```text
https://www.amazon.com/dp/B08FGH2V5Q?tag=YOURTAG
https://www.amazon.com/dp/B079K94HHV?tag=YOURTAG
https://www.amazon.com/dp/B00IPUIQIA?tag=YOURTAG
https://www.amazon.com/dp/B00ZS4ZAEE?tag=YOURTAG
```

### 4.2 样例 A — 化粪池 + 下水慢 + 孩宠（保守）

**问卷**：`slow_drain` · `septic` · `grease_disposal` · `kids_pets` · `tried_none`  
**路由**：`chemical_harsh = blocked_as_primary` → 优先酶/物理

```text
【披露】本页含联盟推广链接；你在零售商处购买，我们可能获得佣金。价格与库存以结账页为准（信息核对于：2026-07-17）。
【安全】勿混用不同排水化学品。一律按产品标签使用。
```

**理解**：下水慢、化粪池、有 disposal、希望少刺激性化学品、尚未尝试 → 优先 `enzyme_maintain` / `physical`，不强推腐蚀性急救剂。

#### 主推荐：Green Gobbler Enzyme Drain Cleaner（S2）

- **对你意味着什么**：按你「化粪池 + 孩宠 + 下水慢」，先选偏酶/生物、宣传可用于 septic 的维护向产品，而不是一上来用强化学凝胶。
- **约束对齐**：`slow_drain`, `septic`, `kids_pets`, `tried_none`
- **事实锚**：`brand_claim` — 卖点含酶配方、油脂/异味相关有机物、septic / grease trap 场景（下单前核对本瓶标签用途与用量）
- **使用边界**：按标签；不承诺「一次必通」；完全不通时改物理或管道工
- **购买**：[Amazon](https://www.amazon.com/dp/B079K94HHV?tag=YOURTAG)
- **不推荐给**：已倒过化学疏通剂、或需要保证立刻打通的人

#### 备选 1：Zip-It drain snake（S1）

- **更适合若**：你愿意先物理抓取堵塞物、或想完全避开液体药剂
- **事实锚**：`brand_claim` — 无化学；扭转拉出毛发等（厨房若以油脂软块为主，工具效果可能有限）
- **购买**：[Amazon](https://www.amazon.com/dp/B08FGH2V5Q?tag=YOURTAG)

#### 也可以不买 / 先等待

先热水冲洗篮渣、确认 disposal 未卡硬物；仍慢再考虑 S2/S1。本次**不主推** Liquid-Plumr 类化学凝胶（化粪池 + 孩宠 → 走保守路由）。

#### 养护下一步（①）

缓解后若仍用 septic：可看按月维护包 S4 → [Amazon](https://www.amazon.com/dp/B00ZS4ZAEE?tag=YOURTAG)（标签用途：维护，非急救）。

### 4.3 样例 B — 市政下水 + 完全堵死 + 无硬限制

**问卷**：`full_clog` · `sewer` · `grease_no_disposal` · `none` · `tried_none`  
**路由**：可化学，但 `full_clog` → 必须同时给物理/专业路径（D3）

**理解**：完全堵死、市政下水、无租房/老管/孩宠限制、尚未尝试 → 可给化学凝胶作主推之一，但先提示物理尝试。

#### 主推荐：Liquid-Plumr Industrial Strength Gel（S3）

- **对你意味着什么**：在「市政下水、无硬限制、厨房向油脂堵塞」前提下，凝胶类产品厂商标称可用于厨房水槽油脂/堵塞场景；仍须按标签，且勿与其他疏通剂混用。
- **约束对齐**：`full_clog`, `sewer`, `none`, `tried_none`
- **事实锚**：`brand_claim` — 2-in-1 针对 hair/grease；可用于 kitchen sinks；常见标签：勿与 plunger 同时使用、勿混用其他 clog removers/氨类；勿用于马桶
- **购买**：[Amazon](https://www.amazon.com/dp/B00IPUIQIA?tag=YOURTAG)
- **不推荐给**：化粪池不确定、租房禁强化学、或已经倒过别的化学剂的人

#### 备选 1：Zip-It（S1）— 更适合若想先零化学试一把  
#### 备选 2：杯型皮搋子（S5）— 更适合若落水口形状适合封压（注意：若已倒化学剂则不要再用搋子溅液）

#### 也可以不买 / 先等待

完全堵死也可以先 S1/S5；若反复堵塞或怀疑主管道问题，直接约管道工往往比连买两瓶化学剂更合理。

### 4.4 样例 C — 已用过化学剂（硬拒答 R2）

**问卷**：`slow_drain` · `sewer` · `grease_disposal` · `none` · `tried_chemical`

```text
你已经用过化学疏通剂了，我不能再推荐另一种叠用（规则 R2）。
请只按当前产品标签冲洗/等待，或联系管道工——而不是再买一支更「猛」的。
本次不输出 Liquid-Plumr / 其他化学疏通剂购买链接。
```

#### 主推荐：改为「不买化学剂」；若仍要商品则仅物理工具 Zip-It（S1）

- **对你意味着什么**：避免第二种化学剂反应风险；用工具尝试机械清除残留物（油脂块效果因情况而异）。
- **约束对齐**：`tried_chemical` → `any_new_chemical = refuse`
- **购买（可选）**：[Amazon](https://www.amazon.com/dp/B08FGH2V5Q?tag=YOURTAG)
- **不买**：任何新的化学疏通剂（含 S3）

### 4.5 样例 D — 异味为主 + 租房限制 → 导向养护①

**问卷**：`odor_only` · `unsure` · `grease_disposal` · `rental_no_harsh` · `tried_none`  
**路由**：`unsure` + `rental_no_harsh` → 禁强化学主推；异味优先清洁/酶维护

#### 主推荐：Green Gobbler Enzyme Drain Cleaner（S2）

- **对你意味着什么**：下水还行、主要是味道，且租房不宜强化学——更适合维护向酶制剂（核标签是否适用于你的场景），而不是急救腐蚀剂。
- **约束对齐**：`odor_only`, `unsure`, `rental_no_harsh`
- **事实锚**：同 S2；并提示「系统不清楚时按更保守选」（D1）
- **购买**：[Amazon](https://www.amazon.com/dp/B079K94HHV?tag=YOURTAG)

#### 备选：先不买 — 清理 disposal 裙边/篮渣、倒掉存水弯异味源（非购买步骤）

#### 养护下一步

若确认 septic 且要做周期维护：S4；若是市政下水，仍可用 S2 做低频率维护（按标签），不必上 S3。

### 4.6 样例对照（验收用）

| 样例 | 主推 | 备选 | 必须出现的不买/等待 |
|------|------|------|---------------------|
| A septic+孩宠 | S2 | S1 | 不主推 S3 |
| B 市政全堵 | S3 | S1、S5 | 可先物理/可叫管道工 |
| C 已用化学 | S1 或纯不买 | — | **拒荐一切新化学剂** |
| D 异味+租房 | S2 | 非购买清洁步骤 | 不主推 S3；可挂 S4 |