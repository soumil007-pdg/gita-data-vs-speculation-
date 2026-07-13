# Gita Analysis Lab

Interactive lab explaining nine NLP methods used to analyse the Bhagavad Gita —
speaker detection, emotion arcs, topic modeling, translation fidelity, and
readability — plus a live real-spaCy sentence parser. Also includes the
"Data vs. Speculation" LinkedIn carousel deck built from the same analysis.

```
gita-analysis-lab/
├── carousel/          "What Does Data Actually Say About the Gita?" deck
│   ├── gita_final.ipynb                    Source notebook (all 9 methods)
│   ├── build.js                            pptxgenjs script that generates the deck
│   ├── Gita_Data_vs_Speculation.pptx       Final 15-slide deck
│   └── Gita_Data_vs_Speculation.pdf        PDF export
├── backend/          Flask + spaCy API (real dependency parsing)
│   ├── app.py
│   ├── requirements.txt
│   └── render.yaml
├── frontend/          Static interactive lab
│   └── index.html
├── DEPLOY.md          Step-by-step deploy guide (Render / Railway)
└── README.md          This file
```

## The carousel deck

`carousel/Gita_Data_vs_Speculation.pptx` (and matching `.pdf`) is a 15-slide
LinkedIn carousel testing six widely-believed claims about the Gita against
real data pulled from `gita_final.ipynb` — no invented numbers, every source
a verified live link, every chart built natively from the notebook's actual
output.

To regenerate the deck after changing the notebook's numbers:
```bash
cd carousel
npm install pptxgenjs
node build.js
# then convert Gita_Data_vs_Speculation.pptx -> .pdf with LibreOffice or PowerPoint
```

## Quick start (interactive lab)

**1. Run the backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```
Backend runs at `http://localhost:5000`.

**2. Open the frontend**
```bash
cd frontend
open index.html                 # macOS
# or just double-click index.html
```
It already points at `http://localhost:5000` — the live sentence parser
(Section 2, "Try it yourself") will call your local backend directly.

## What's inside

| Section | What it shows |
|---|---|
| 1. Load Data | Dataset structure, the column-name typo gotcha |
| 2. Speaker Detection | spaCy dependency parsing, live parser (real backend)|
| 3. Distribution | Who speaks how much across 700 verses |
| 4. Word Frequency | Krishna vs Arjuna vocabulary fingerprints |
| 5. GoEmotions | 28-emotion classification across all verses |
| 6. Krishna's Arc | Emotional arc by chapter |
| 7. Arjuna's Arc | Emotional arc by chapter — with the speaker-filter bug fix explained |
| 8. LDA | Topic modeling, interactive coherence-score explorer |
| 9. Readability | Flesch-Kincaid grade level by chapter |

## Editing

- All frontend logic lives in `frontend/index.html` — one file, vanilla JS,
  no build step. Open it, edit, refresh.
- Backend logic lives in `backend/app.py` — the `SPEECH_VERBS`, `PRONOUNS`,
  and `SPEAKER_MAP` constants mirror exactly what the original Colab
  notebook used, so any fix here should be mirrored there too.
- Carousel deck logic lives in `carousel/build.js` — a single pptxgenjs
  script with helper functions (`specSlide`, `dataSlide`, `sourceCard`,
  `conclusionCard`, `drawHeatmap`) reused across all 15 slides.

## Deploying

See `DEPLOY.md` for the full walkthrough — free hosting on Render.com or
Railway.app, then point `SPACY_API_URL` in `frontend/index.html` at your
live backend URL.
