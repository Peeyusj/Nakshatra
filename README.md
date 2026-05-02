# Nakshatra ✨

**An AI-powered Indian name generator with live neural network inference tracing.**

Nakshatra is a custom-built, character-level language model trained entirely from scratch on a dataset of 114,000 Indian names. Inspired by Andrej Karpathy's "Zero to Hero" series, it uses a WaveNet-style hierarchical architecture to generate phonetically authentic names based on traditional Vedic astrology (Rashi) seed syllables.

🔗 https://nakshatra-aifi.vercel.app *Note: The backend is hosted on a free Render instance, so the very first generation might take ~50 seconds to wake up from a cold start!*

## 🧠 The Neural Engine

Unlike standard text generators that spit out a final string, Nakshatra exposes its internal "thought process" in real-time. 

Instead of reading all context characters at once, the model uses a custom `FlattenConsecutive` layer architecture. It builds understanding gradually—processing pairs of characters first, combining those pairs into groups, and finally merging them into a single context vector before a Linear layer predicts the next character's probability distribution.

### Key Features
* **Real-Time Inference Trace:** Watch the model calculate probability vectors and predict the next character step-by-step in the UI.
* **Hierarchical "Pairing Trick":** A custom PyTorch architecture that structurally funnels inputs rather than using standard dilated causal convolutions.
* **Vedic Cybernetics UI:** A premium, dark-mode glassmorphism interface powered by Framer Motion.
* **Native Pronunciation:** Offline, zero-API text-to-speech using the browser's native `hi-IN` voice engine for accurate phonetic pronunciation.
* **Educational Architecture Breakdown:** An interactive, animated page explaining the tensor flow and math behind the model.

## 🛠 Tech Stack

**Frontend (Client)**
* React 18 + Vite
* TypeScript
* Tailwind CSS + shadcn/ui
* Framer Motion (Physics-based animations)

**Backend (API & Model)**
* PyTorch (Model training & inference)
* FastAPI (REST API streaming)
* Python 3.10+
* Uvicorn

## 📂 Monorepo Structure

This project is structured as a monorepo containing both the neural network backend and the interactive frontend:

```text
Nakshatra/
├── backend/               # PyTorch model, weights, and FastAPI server
│   ├── main.py            # API endpoints
│   ├── model.py           # Hierarchical neural network architecture
│   └── requirements.txt   
└── frontend/              # React Vite application
    ├── src/
    │   ├── components/    # UI and Framer Motion visuals
    │   ├── hooks/         # Axios API polling
    │   └── pages/         # Generation & Architecture views
    └── package.json
