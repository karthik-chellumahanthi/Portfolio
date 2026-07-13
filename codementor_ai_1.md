# CodeMentor AI - Project Analysis Report
**Status:** V1.0 (Production-Ready for Demonstration)

## 1. Executive Summary
CodeMentor AI is a 100% offline, privacy-first, local coding assistant specifically tailored for Python and Java development. Built to mimic the premium user experience of ChatGPT, it leverages local Llama 3 inference via Ollama alongside a custom Retrieval-Augmented Generation (RAG) pipeline to provide accurate, context-aware programming mentorship without ever sending data to the cloud.

## 2. Core Architecture
*   **Frontend Environment:** React + Vite
*   **Styling Engine:** Tailwind CSS
*   **Backend Framework:** FastAPI (Python)
*   **AI Orchestration:** LangChain
*   **Vector Database:** ChromaDB
*   **Local LLM Engine:** Ollama (Qwen 2.5 Coder)
*   **Streaming Protocol:** Server-Sent Events (SSE)

## 3. Key Features (Frontend & UX)
The interface was built to pass as a commercial, Silicon Valley-grade product. 
*   **Responsive ChatGPT-like UI:** A clean, modern interface that supports both full-desktop viewing and an overlay mobile drawer (hamburger menu).
*   **State-of-the-Art Theming:** A persistent Light/Dark mode toggle that dynamically updates everything, including the Markdown code-block syntax highlighting (`vscDarkPlus` to `vs`).
*   **Conversational Management:** 
    *   Persistent local storage memory.
    *   Ability to rename specific chats or delete them with safety confirmation prompts.
    *   "Clear All" guest account functionality.
*   **Advanced Chat Interactions:**
    *   **Auto-Resizing Input:** Textarea dynamically grows to accommodate large blocks of pasted code.
    *   **Smart Auto-Scroll:** Intelligent scrolling that auto-follows generating text, but safely pauses if the user manually scrolls up to read earlier text.
    *   **Floating Jump Arrow:** A quick-action button to snap back to the latest message.
    *   **Export Chat:** A 1-click button to download the entire conversation history as a formatted `.md` Markdown file.
    *   **Copy Notifications:** Visual "Toast" checkmarks when copying code blocks or full answers.
    *   **Voice Dictation (Mic):** Uses the browser's native Web Speech API for seamless voice-to-text dictation directly into the chat input.
*   **Interactive Practice Quiz Module:**
    *   A dedicated testing mode where users select a Language (Python/Java), Format (Multiple Choice/Code Writing), and Difficulty Level (1-5).
    *   The frontend dynamically tracks the user's progress and secretly injects system instructions when the quiz concludes to mathematically guarantee the AI generates an accurate Final Score and improvement report.

## 4. Key Features (Backend & AI)
*   **100% Local Inference:** Absolute privacy. Zero API keys, zero cloud processing.
*   **Extended Conversational Memory:** The backend retrieves the last 14 messages (7 conversational turns) to inject deep contextual awareness, allowing the AI to recall variables, names, and previous code blocks seamlessly.
*   **Heuristic Intent Router:** The AI analyzes questions and routes them intelligently using strict prompt-engineering. 
    *   **Off-topic Guardrails:** If the user asks for small talk or non-programming information (weather, politics), it dynamically restricts output.
    *   **Refinement Priorities:** If the user asks to "summarize" or "shorten" a previous answer, the router dynamically disables RAG context injection and heavily prioritizes the Conversation History to prevent hallucination.
*   **Dynamic Source Citations:** When querying the ChromaDB Python/Java documentation, the LLM attaches reference links to its answers. The backend intelligently hides these citations if the query is conversational (e.g., "What is my name?").
*   **Asynchronous Streaming:** Utilizing Server-Sent Events, the LLM streams tokens to the frontend in real-time, completely avoiding HTTP timeout errors for long code generations.
*   **Graceful Cancellation:** The backend fully supports `AbortController` signals to stop heavy GPU processing instantly if the user clicks "Stop Generating".
*   **Failsafe Recovery:** If a user restarts the app or changes chats mid-generation, the system automatically detects abandoned tasks and resolves their states so the UI doesn't break.

## 5. Known Limitations & Constraints
While highly capable, the application has intentional physical and architectural limits:
1.  **Hardware Dependency:** Because the LLM runs locally, generation speed and maximum token context size are entirely bottlenecked by the host machine's RAM, GPU, and CPU. It will run slower on older laptops compared to cloud services.
2.  **Context Window Limits:** The conversation memory is hard-capped at the last 14 messages. If a conversation exceeds this, the AI will "forget" the earliest messages in that specific chat thread to prevent token overflow and crashing.
3.  **Knowledge Cutoff & Scope:** The RAG database is limited strictly to the documents currently embedded in the local ChromaDB vector store. It cannot browse the live internet for today's documentation updates.
4.  **No Cloud Sync:** Because chats are stored in browser `localStorage`, conversations cannot be synced across multiple devices or different browsers.

## 6. Future Expansion Possibilities
*(If you wish to continue development in the future)*
*   **Multiple LLM Support:** Adding a dropdown menu to let the user switch between Llama 3, Mistral, or CodeLlama on the fly.
*   **Web Search Fallback:** Giving the LangChain agent the ability to use a DuckDuckGo search tool if the local ChromaDB doesn't have the answer.
*   **User Accounts:** Implementing a lightweight local SQLite database to allow multiple distinct user profiles on the same machine.
