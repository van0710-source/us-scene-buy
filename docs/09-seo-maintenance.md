# P1：SEO 选题地图 + ③→① 养护路径

更新日期：2026-07-17  
获客默认 **零付费**（见 [`08-ops-roadmap.md`](08-ops-roadmap.md)）。页内 CTA 一律导向：**主推商品盒（Check price on Amazon）** + 可选约束问卷；不单堆无上下文商品链，也不再「只导问卷」。

---

## 1. ③ SEO / 问答选题地图

### 1.1 用法

- 每条选题 → 1 篇英文落地页或问答页（可先大纲后成文）
- 结构：问题共鸣 → 约束分叉（2～3 个关键问题）→ CTA「Answer 5 questions to get one primary pick」→ 短安全提示
- 优先级：P0 先写；P1 有余力；P2 观察搜索词后再补

### 1.2 选题表

| ID | 优先级 | 意图簇 | 示例查询（英文） | 页内必须点出的约束 | CTA 后主路由 |
|----|--------|--------|------------------|--------------------|--------------|
| T01 | P0 | 厨房全堵 | clogged kitchen sink won't drain | sewer/septic、是否已用化学剂、disposal | 常 → 样例 B 或物理优先 |
| T02 | P0 | 下水慢/油脂 | slow kitchen drain grease | septic vs sewer、孩宠/租房 | 常 → 样例 A 类保守或酶 |
| T03 | P0 | 异味 | kitchen sink smells like sewage / rotten | 仅异味 vs 慢+臭、disposal | 常 → 样例 D；先非购买清洁 |
| T04 | P0 | 化粪池 | septic safe drain cleaner kitchen | 强制 septic；禁强化学主推恐吓 | → 酶/物理；挂养护 |
| T05 | P0 | 租房限制 | apartment kitchen drain clog landlord | rental_no_harsh | → 物理/酶；提示房东规则 |
| T06 | P1 | 已用化学剂 | used Drano still clogged | tried_chemical → 拒叠用 | → 拒答 R2 + 物理/管道工 · **已有页** `guides/used-drain-cleaner-still-clogged.html` |
| T07 | P1 | 有 disposal | garbage disposal clogged smelling | disposal_yes | → 勿乱倒化学；工具/酶/检查卡物 |
| T08 | P1 | 老旧管道 | cast iron drain clog kitchen safe | old_pipes | → 保守；慎强化学 · **已有页** `guides/old-pipes-kitchen-drain.html` |
| T09 | P1 | 酶 vs 化学 | enzyme vs chemical drain cleaner kitchen | 维护 vs 急救意图 | → 讲清标签用途差；导问卷 |
| T10 | P1 | 不买/先物理 | unclog kitchen sink without chemicals | 愿意物理 | → Zip-It/皮搋子路径 |
| T11 | P2 | 化粪池异味系统级 | septic tank odor vs sink trap | 超出单槽则 R5 | → 何时该叫专业人士 |
| T12 | P2 | 预防/养护 | prevent kitchen grease clog monthly | 非急救 | → 直接 ① 养护文案 |
| T13 | P2 | 管道工边界 | when to call plumber vs drain cleaner | full_clog 反复 | → 不买商品也可 |
| T14 | P2 | 市政 vs 化粪池教育 | city sewer vs septic drain cleaner | Q2 为何改变推荐 | → 进问卷 · **已有页** `guides/sewer-vs-septic-drain-cleaner.html` |

### 1.3 内链与避坑

- T04/T05/T06 互链到「安全/拒答」短节（混用化学品、百分百疏通禁止）
- T11/T12 承接问卷输出末尾「养护下一步」
- 每页页脚：联盟披露占位 + 「按产品标签使用」
- 禁止：未核标签的分钟数/成功率；医疗/防疫话术

### 1.4 首批开工顺序（建议）

```text
T02 → T04 → T03 → T05 → T01 → T06
（慢/油脂与 septic、异味、租房先于「猛药全堵」叙事）
```

---

## 2. ③→①「养护下一步」产品内路径文案

用于急用推荐输出末尾（充实 `07` §2.6）。按问卷结果选用 **一条** 主文案 + 可选 CTA。

### 2.1 通用骨架（所有急用会话可出）

```text
### Before the next backup

Emergency fixes don’t replace buildup habits. If flow is acceptable again, a maintenance-style product (enzyme / bacterial—check the label for “maintenance” vs “clog remover”) is often a better next step than another harsh gel.

→ CTA: See maintenance options
→ Secondary: Not now — habits only
```

中文原型：

```text
### 下次别等到堵死

急救不等于养护。若已经能正常下水，下一步更宜考虑「维护向」酶/生物类耗材（核对标签是 maintenance 还是 clog remover），而不是再来一支更猛的化学剂。

→ CTA：查看养护选项
→ 次要：暂时不买，先改习惯
```

### 2.2 按约束切换（产品内规则）

| 条件 | 路径文案要点 | CTA 指向 |
|------|----------------|----------|
| `septic` 或 `unsure` | 强调 septic 维护包/酶；勿用「工业强度」恐吓复购 | S4 类 + S2（核标签） |
| `rental_no_harsh` / `kids_pets` / `old_pipes` | 养护非强腐蚀叙事；可先物理习惯 | S2；弱化 S3 |
| `odor_only` 且已缓解 | 异味复发 → 维护频率（按标签） | S2 或 S4 |
| `tried_chemical` | **不**在养护位再推化学疏通剂；维护向或纯习惯 | S2/S4 或仅习惯 |
| `full_clog` 刚疏通 / 建议管道工 | 等稳定或事后再说；避免立刻叠化学 | 延迟：「一周后再看养护」或习惯 only |
| `sewer` + `none` + 已用 S3 成功 | 「定期维护」须标 brand_claim；① 用酶 | S2 为主，不自动再推 S3 |

### 2.3 习惯清单（与商品 CTA 并列，强化「允许不买」）

```text
No-purchase habits that cut grease clogs:
1. Basket strainer in; empty into trash
2. Wipe grease to trash before wash
3. Hot water after heavy cooking (habit, not a guarantee)
4. If you have a disposal: no fibrous scraps / grease as trash can
```

### 2.4 养护选项页（最小信息架构）

```text
标题：Keep the kitchen line clearer between emergencies
披露：联盟披露
区块 A：谁适合维护向产品（septic / 租房 / 怕化学 / 异味复发）
区块 B：主推 1 维护 SKU（模板同 07 §2.3）+ 备选 ≤1
区块 C：不买也可以（习惯清单）
区块 D：仍反复全堵 → 管道工边界（链 T13）
```

### 2.5 会话内触发时机

```text
急用输出完成
  → show_maintenance_module = true
  → if reason_code in (refuse_chemical, call_pro): 习惯 + 专业人士，弱化商品养护
  → else if 主推已是 S2 维护型: CTA → 「看月度包 S4」或提醒
  → else if tried_chemical_recent: habits_only
  → else if septic: primary_maint = S4_type
  → else: primary_maint = S2_type + §2.1
```

---

## 3. 与操作阶段的衔接

| 文档动作 | 运营阶段 |
|----------|----------|
| 本页选题大纲 | 可与 Phase1 软测并行 |
| 英文成页上线 | 支撑 Phase2 审站 + Phase4 获客 |
| 养护 CTA 进原型 | Phase1 即可挂；Phase5 做转化观察 |

## 4. 验收

- [x] T02 / T04 / T03 英文成页 → `site/guides/`
- [x] 原型/站点急用输出末尾含养护模块 → `site/quiz.html` + `prevent-grease-clog.html`
- [x] `tried_chemical` / 全堵保守路径不硬推强化学主推（见 `site/assets/quiz.js`）