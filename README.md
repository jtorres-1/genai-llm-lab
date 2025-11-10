🧠 LLM Lab
Overview
LLM Lab is an interactive console that helps users understand how temperature and top_p parameters affect large language model (LLM) behavior.
It allows users to generate responses, analyze them using custom quality metrics, visualize differences, and export experiments for deeper analysis.
This project demonstrates real-world LLM evaluation, data persistence, and visual analytics through a polished, professional UI.
 Features
Dynamic Prompt Input – users can send custom prompts with adjustable temperature and top_p
Real-Time OpenAI Integration – uses the GPT-4o-mini model to generate diverse responses
Automated Quality Metrics – evaluates text by structure, completeness, and diversity
Interactive Visualization – bar chart comparison powered by Recharts
Data Persistence – experiments stored via Prisma + SQLite
CSV Export – download all results for external review
Responsive UI – clean, modern design built with TailwindCSS
🧩 Tech Stack
Frontend: Next.js 14 (App Router) + TypeScript + TailwindCSS + Recharts
Backend: Next.js API Routes + Prisma ORM + SQLite
Language: TypeScript
LLM API: OpenAI GPT-4o-mini
Deployment: Vercel
🧠 How It Works
User enters a prompt, temperature, and top_p value.
The request hits the backend /api/experiment route.
The route calls the OpenAI API to generate a response.
A local function (analyzeResponse) computes metrics like word count, sentence count, diversity, and completeness.
Data is saved to the Prisma database and rendered dynamically on the dashboard.
Results can be compared visually and exported as a .csv file.
📊 Quality Metrics
Each experiment includes automatically computed metrics:
Metric	Description
Word Count	Total number of words generated
Sentence Count	Number of distinct sentences
Average Sentence Length	Words per sentence (response structure indicator)
Completeness	Response size vs. prompt ratio
Punctuation Count	Count of punctuation marks (flow indicator)
Diversity Score	Ratio of unique to total words (lexical richness)
🧪 Example Use Case
Try prompts like:
“Explain how AI helps doctors in one paragraph.”
“Describe a surreal dream in three sentences.”
“Summarize quantum computing like I’m 10 years old.”
Then compare metric patterns between temperature 0.3 vs. 1.0 to visualize creativity trade-offs.
⚙️ Setup & Running Locally
# Install dependencies
npm install

# Set your OpenAI API key in .env
OPENAI_API_KEY=your_api_key_here

# Run Prisma migrations (creates local dev.db)
npx prisma migrate dev

# Start local server
npm run dev
Visit http://localhost:3000 to start experimenting.
🌍 Deployment
Hosted via Vercel for fast, reliable deployment and server-side rendering.
Ensure your environment variables (OPENAI_API_KEY, DATABASE_URL) are set in Vercel dashboard.
🧭 Design Decisions
Built metrics locally for transparency and full control (no external scoring APIs)
Used GPT-4o-mini for efficiency and real-time generation speed
Recharts used for clean, data-driven visualization
Minimal yet professional UI inspired by modern dev dashboards
🔮 Future Improvements
Add semantic coherence and readability metrics
Enable multi-run comparison grids for deeper analysis
Add API request caching and experiment labeling
Export to JSON and PDF formats
