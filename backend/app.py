"""
Gita Speaker Lab — spaCy backend
──────────────────────────────────────
A tiny Flask API that runs REAL spaCy dependency parsing
and returns the exact same speaker-detection logic used
in the Gita analysis notebook.

Endpoints:
  POST /parse   → { "sentence": "..." }
                  returns full token-level parse + detected speaker

Run locally:
  pip install -r requirements.txt
  python -m spacy download en_core_web_sm
  python app.py

Deploy free on Render.com or Railway.app — see DEPLOY.md
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)  # allow the static HTML (hosted anywhere) to call this API

nlp = spacy.load("en_core_web_sm")

# ── Same speech verbs list used in the real analysis ──
SPEECH_VERBS = [
    'speak', 'explain', 'ask', 'say', 'tell', 'instruct',
    'call', 'name', 'conclude', 'continue', 'reply',
    'declare', 'proclaim', 'narrate', 'recount', 'state'
]

# ── Same pronoun filter used in the real analysis ──
PRONOUNS = {
    'i', 'he', 'she', 'they', 'you', 'we', 'it',
    'son', 'men', 'people', 'brahma', 'thay'
}

# ── Same speaker map used in the real analysis ──
SPEAKER_MAP = {
    'lord': 'Krishna', 'hrishikesa': 'Krishna', 'almighty': 'Krishna',
    'krishna': 'Krishna', 'madhusudana': 'Krishna', 'govinda': 'Krishna',
    'sanjaya': 'Sanjaya', 'sanjay': 'Sanjaya',
    'arjuna': 'Arjuna', 'partha': 'Arjuna', 'dhananjaya': 'Arjuna',
    'duryodhana': 'Duryodhana',
    'dhrtarashtra': 'Dhrtarashtra',
}


def detect_speaker(doc):
    """Exact same three-layer logic as the notebook pipeline."""
    detected = None
    verb_token = None
    subj_token = None

    for token in doc:
        if token.lemma_.lower() in SPEECH_VERBS:
            verb_token = token
            for other_token in doc:
                if other_token.dep_ == "nsubj" and other_token.head == verb_token:
                    candidate = other_token.text
                    if candidate.lower() in PRONOUNS:
                        # pronoun found — not a valid speaker name
                        subj_token = other_token
                        detected = None
                    else:
                        detected = candidate
                        subj_token = other_token
                    break
            if verb_token is not None:
                break

    mapped = None
    if detected:
        mapped = SPEAKER_MAP.get(detected.lower(), detected)

    return detected, mapped, verb_token, subj_token


@app.route("/parse", methods=["POST"])
def parse_sentence():
    data = request.get_json(force=True)
    sentence = (data.get("sentence") or "").strip()

    if not sentence:
        return jsonify({"error": "empty sentence"}), 400

    doc = nlp(sentence)

    raw_detected, mapped_speaker, verb_token, subj_token = detect_speaker(doc)

    tokens = []
    for token in doc:
        tokens.append({
            "text": token.text,
            "pos": token.pos_,
            "dep": token.dep_,
            "lemma": token.lemma_,
            "head": token.head.text,
            "is_speech_verb": token.lemma_.lower() in SPEECH_VERBS,
            "is_subject_of_speech_verb": (
                subj_token is not None and token.i == subj_token.i
            ),
            "is_pronoun_blocked": (
                token.dep_ == "nsubj"
                and verb_token is not None
                and token.head.i == verb_token.i
                and token.text.lower() in PRONOUNS
            ),
        })

    return jsonify({
        "sentence": sentence,
        "tokens": tokens,
        "speech_verb": verb_token.text if verb_token else None,
        "raw_subject": raw_detected,
        "detected_speaker": mapped_speaker,
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model": "en_core_web_sm"})


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
