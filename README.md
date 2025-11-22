# 🌤️ Global Weather Viz - Vibe Coding Project

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📌 Project Overview (專案簡介)
這是一個基於 **Next.js** 與 **Tailwind CSS** 開發的現代化氣象儀表板，作為「雲端運算應用與實務」課程的期中專案。  
本專案採用 **Vibe Coding** 模式開發，利用 AI (Claude 3.5 Sonnet) 輔助生成核心邏輯與 UI 組件，實現了前後端分離與動態資料視覺化。

### 🔗 Quick Links
> 點擊下方連結查看成果
- 🚀 **Live Demo (部署網址):** [https://cloud-computing-weather-app.vercel.app/](https://cloud-computing-weather-app.vercel.app/)
- 💻 **GitHub Repository:** [https://github.com/Tanuki3701/cloud-computing-weather-app](https://github.com/Tanuki3701/cloud-computing-weather-app)

---

## 📸 Screenshot (專案截圖)
*(專案實際運行畫面，展示深色模式與動態天氣動畫)*
![Project Screenshot](./public/screenshot.png)

---

## ✨ Features (功能特色)

| 功能 | 說明 |
| :--- | :--- |
| 🌍 **Real-time Data** | 串接 **Open-Meteo API**，獲取全球即時氣象資訊 (溫度/濕度/風速/UV)。 |
| 🏙️ **Multi-City Support** | 支援 **台北、東京、紐約、倫敦** 等多城市一鍵切換，自動轉換時區。 |
| 🎨 **Dynamic Visuals** | 根據 **WMO Code** 自動切換 ☀️晴天、🌧️雨天、☁️多雲 等 CSS 動畫。 |
| 📊 **Data Visualization** | 使用 **Recharts** 繪製未來 7 天「最高溫 vs 最低溫」雙曲線趨勢圖。 |
| 📱 **Interactive UI** | 採用 **玻璃擬態 (Glassmorphism)** 風格，支援 RWD 響應式排版。 |

---

## 🛠️ Tech Stack (技術棧)

- **Framework:** `Next.js 14 (App Router)`
- **Styling:** `Tailwind CSS`
- **Visualization:** `Recharts`
- **Icons:** `Lucide React`
- **Deployment:** `Vercel`
- **AI Tool:** `Cursor` / `VS Code Copilot` (Model: Claude 3.5 Sonnet)

---

## 🚀 Getting Started (如何執行)

如果你想在本地端執行此專案，請依照以下步驟：

### 1. Clone the repository
```bash
git clone https://github.com/Tanuki3701/cloud-computing-weather-app.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```