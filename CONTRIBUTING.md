# Contributing to Reader

Thank you for your interest in contributing to **Reader**! We are building an open-source, local-first study companion for university students.

---

## 🛠️ Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/reader-tech.git
   cd reader-tech
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📜 Development Guidelines

- **Privacy First**: Never introduce server-side upload endpoints for course documents or user reading history.
- **Strict TypeScript**: Ensure all new modules have full type coverage and pass `npm run build`.
- **Modular TTS**: Any new speech synthesis feature should implement the `TTSEngine` interface in `lib/tts/types.ts`.
- **Accessibility**: Use semantic HTML tags, accessible ARIA attributes, and ensure visible focus states.
