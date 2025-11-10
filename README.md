# 🧠 LLM Lab – GenAI Labs Challenge

An experimental console for analyzing how **temperature** and **top_p** affect Large Language Model behavior.  
Built with **Next.js 14, TypeScript, Prisma, PostgreSQL, TailwindCSS**, and the **OpenAI API**.  
Deployed and fully functional on **Vercel**.

---

## 🔗 Live App
https://genai-llm-jm0fzkr2h-jtorres-1s-projects.vercel.app

## 🎥 Demo Video
https://www.youtube.com/watch?v=FVSgB3h0hVk

## 💻 Source Code
https://github.com/jtorres-1/genai-llm-lab/tree/main

## 📊 Time Estimates
Documented here:  
**[Google Sheets – time_estimates.csv](https://docs.google.com/spreadsheets/d/1ZcQsTeChxSWs_mBiD30K7k_HJ3BTT0eOeHlloHTvrV8/edit?gid=0#gid=0)**

---

## 🚀 Overview

**LLM Lab** lets users experiment with how temperature and top_p values influence model output.  
Users can generate responses, view custom quality metrics, and visualize comparisons through interactive charts.

The goal is to make LLM “thinking” visible — turning abstract parameters into measurable behavior patterns.

---

## ⚙️ Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS  
- **Backend:** Prisma ORM + PostgreSQL  
- **API Integration:** OpenAI API  
- **Visualization:** Recharts  
- **Hosting:** Vercel  

---

## 🧩 Features

- Prompt input with adjustable **temperature** and **top_p**
- Automatic **response generation** with metrics calculation
- Custom metrics:
  - Word Count
  - Sentence Count
  - Completeness %
  - Diversity %
- **Experiment History** (stored via Prisma + Postgres)
- **Visual comparison charts**
- **CSV Export** of all experiments

---

## 🧠 Metrics Explained

Each response is analyzed programmatically (no LLM evaluation calls):

- **Word Count:** Measures length and verbosity  
- **Sentence Count:** Measures structure and completeness  
- **Completeness:** Checks punctuation and grammatical closure  
- **Diversity:** Calculates unique word ratio to gauge variation

---

## 🧱 Architecture

- `app/api/experiment/route.ts` – Handles POST/GET requests via Prisma  
- `Experiment` model stores all response data and computed metrics  
- Client uses fetch calls to trigger new experiments and render results  
- Recharts visualizes metrics for quick comparison  
- Prisma schema fully migrated to PostgreSQL for persistence  

---

## 🧩 Challenges & Solutions

- **SQLite → PostgreSQL Migration:**  
  Resolved Vercel deployment issues with a custom build script running `prisma generate` and `db push`.  
- **Nested Folder Conflicts:**  
  Flattened directory structure and corrected schema paths.  
- **Prisma Build Failures:**  
  Regenerated client and re-synced Postgres schema for stable builds.

---

## 🧭 Future Improvements

- Multi-response comparison on a single screen  
- Additional metrics for coherence and readability  
- Enhanced animations and chart interactivity  
- User authentication for saved experiment sessions  

---

## 🧾 Author

**Jesse Torres**  
Built as part of the **GenAI Labs LLM Lab Challenge**  
© 2025 LLM Lab – Built by Jesse Torres
