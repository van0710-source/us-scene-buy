# 下一步工作项

上一步已完成：规格、小站、**本地 git 初提交**、Pages 自动部署工作流、T05/T01 指南、`AFFILIATE_TAG` 预留。

**站点**：[`site/`](../site/)  
**一键部署脚本**：[`scripts/deploy-github.sh`](../scripts/deploy-github.sh)（需本机已 `gh auth login` 一次）  
已知约束：零外部投放；派安盈美国户可复用收联盟款；W-8BEN 申 Associates。

## 运营阶段

| 阶段 | 状态 | 说明 |
|------|------|------|
| Phase0～1 | 完成 | 规格 + 问卷 + 内部合成验收 |
| 小站内容 | 完成 | 首页/问卷/6 篇指南；无 tag |
| **公开 HTTPS** | **卡在 GitHub 登录** | 本环境无 `gh` 登录态，无法代创仓库/推送；你执行一次 `gh auth login` 后跑 deploy 脚本即可全自动 |
| Phase2 Associates | 待公开 URL | 须你本人在 Amazon 账号内申请（无法代填税务/身份） |
| Phase3 | 获批后 | 我可把 `AFFILIATE_TAG` 写入 `quiz.js` |

## 你只需做的最少手动项（无法代理）

1. 终端一次：`gh auth login` → `bash scripts/deploy-github.sh`  
2. 浏览器：用公开站 URL 申请 Amazon Associates + W-8BEN；付款选派安盈美国账户 Direct deposit  

其余（改站、加 tag、补文）可继续让 Agent 做。

## P2

7. [ ] 打点字典 v0  
8. [ ] Associates 获批 + tag 写入  

## 暂缓

付费投放、多品类、美港主体（非必要）等。
