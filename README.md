🧠 LLM Lab Console
Live Demo: https://genai-llm-lab.vercel.app
LLM Lab Console is a full-stack experimental playground for studying how temperature and top-p affect the behavior of large language models. Users can generate multiple responses, compare metrics, and visualize response quality — turning abstract model parameters into tangible insights.
🚀 Features
• Input a prompt and tweak temperature and top-p values
• Generate LLM responses instantly
• Auto-compute metrics like Word Count, Sentence Count, Completeness, Diversity, Average Sentence Length, and Punctuation Density
• Interactive visual charts using Recharts
• Export experiment results to CSV
• Clean, responsive dark UI with gradient styling
• Built with a focus on clarity, polish, and explainability
🧮 Quality Metrics
Metrics are calculated locally to evaluate the LLM output structure and diversity without additional API calls.
Completeness measures the ratio of finished sentences to total text length.
Diversity measures variation in vocabulary usage by analyzing unique word frequency.
Sentence length and count are used to measure verbosity and coherence.
🧰 Tech Stack
Frontend: Next.js 14 (App Router) with TypeScript and TailwindCSS
Charts: Recharts
Backend: Next.js API Routes (Node/TypeScript)
Database: SQLite for local experiments
Deployment: Vercel
LLM Integration: OpenAI GPT-4 via the OpenAI API key
⚙️ Setup
To run locally, clone the repository, install dependencies, and start the server.
Add your OpenAI API key and database URL to an .env file as follows:
OPENAI_API_KEY = your_key
DATABASE_URL = file:./dev.db
📊 Architecture
app/page.tsx – Core UI and main experiment logic
app/api/experiment/route.ts – Handles API calls and metric processing
components/ExperimentChart.tsx – Renders Recharts visualizations
utils/exportToCSV.ts – CSV exporter
styles/globals.css – Global dark theme and gradient styling
🎨 Design Rationale
Gradient-to-black background creates a lab-like visual depth.
Elevated cards and soft shadows establish focus hierarchy.
Modern monospace typography highlights the analytical theme.
Minimal animations preserve clarity and professional tone.
🧠 Reflection
The goal was to make model reasoning visually tangible. Users can explore how randomness through temperature and probability filtering through top-p shape creative versus coherent outputs.
🎥 Demo Video
Demo video link: (Add Loom or YouTube unlisted link here once uploaded).
The demo covers prompt input, response generation, metrics explanation, chart visualization, technical decisions, and planned future improvements such as model comparison and persistent experiment history.
👤 Author
Jesse Torres
Los Angeles, CA
Full-Stack Engineer and AI Automation Developer
