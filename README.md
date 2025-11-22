# 🌤️ Global Weather Viz - Vibe Coding Project

## 📌 Project Overview (專案簡介)
這是一個基於 **Next.js** 與 **Tailwind CSS** 開發的現代化氣象儀表板，作為「雲端運算應用與實務」課程的期中專案。
本專案採用 **Vibe Coding** 模式開發，利用 AI (Claude 3.5 Sonnet) 輔助生成核心邏輯與 UI 組件，實現了前後端分離與動態資料視覺化。

### 🔗 Links
- **Deploy URL:** [等待 Vercel 部署後填入網址]
- **Repository:** [填入你的 GitHub 網址]

## ✨ Features (功能特色)
- **Real-time Data:** 串接 **Open-Meteo API**，獲取全球即時氣象資訊。
- **Multi-City Support:** 支援台北、東京、紐約、倫敦等多城市切換。
- **Dynamic Visuals:** 根據天氣代碼 (WMO Code) 自動切換 晴天/雨天/多雲 等動態動畫。
- **Data Visualization:** 使用 **Recharts** 繪製未來 7 天高低溫雙曲線圖表。
- **Interactive UI:** 玻璃擬態 (Glassmorphism) 設計風格，支援 RWD 響應式排版。

## 🛠️ Tech Stack (技術棧)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel
- **AI Tool:** Cursor / VS Code Copilot (Model: Claude 3.5 Sonnet)

## 🚀 Getting Started (如何執行)

### 1. Clone the repository
\`\`\`bash
git clone [你的 Git URL]
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 Vibe Coding Reflection (心得摘要)
本專案在開發過程中，從原本的「手寫每一行程式碼」轉變為「AI 協作模式」。透過精確的 Prompt 指令，快速構建出包含動態動畫與複雜圖表的應用。過程中解決了 Recharts 的 SSR Hydration 問題與 TypeScript 型別定義問題，是一次成功的人機協作實踐。

---
*Created by [你的名字/學號] for Cloud Computing Course Midterm.*