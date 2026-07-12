# Deploying the spaCy Backend — Free, 15 Minutes

This gives your HTML lab a real spaCy backend. No Anthropic API, no local Python
needed by the visitor — just a small server that does the actual parsing.

## Option A — Render.com (recommended, easiest)

1. Push the `backend/` folder (or the whole repo, setting the Render root directory to `backend`) to a new GitHub repo (can be public or private).
2. Go to https://render.com → sign up free (GitHub login is fastest).
3. Click **New +** → **Web Service** → connect your GitHub repo.
4. Render will detect `render.yaml` automatically. If not, set manually:
   - **Build Command:** `pip install -r requirements.txt && python -m spacy download en_core_web_sm`
   - **Start Command:** `gunicorn app:app`
   - **Plan:** Free
5. Click **Create Web Service**. First build takes ~5 minutes (downloading spaCy model).
6. Once live, Render gives you a URL like:
   `https://gita-spacy-backend.onrender.com`
7. Test it:
   ```
   curl https://gita-spacy-backend.onrender.com/health
   ```
   Should return `{"status":"ok","model":"en_core_web_sm"}`

**Free tier note:** Render's free plan spins down after 15 min of no traffic.
First request after idle takes ~30-50 seconds to "wake up". This is fine for
a portfolio/demo lab — just know the first click after a while will be slow.

## Option B — Railway.app (also free, slightly faster cold starts)

1. Push the folder to GitHub (same as above).
2. Go to https://railway.app → sign up free.
3. **New Project** → **Deploy from GitHub repo** → select your repo.
4. Railway auto-detects Python. Add these two settings under **Variables/Settings**:
   - **Build Command:** `pip install -r requirements.txt && python -m spacy download en_core_web_sm`
   - **Start Command:** `gunicorn app:app`
5. Deploy. Railway gives you a URL like:
   `https://gita-spacy-backend-production.up.railway.app`

## Connecting your HTML file to the backend

Open your HTML lab file, find this line near the top of the `<script>` section:

```javascript
const SPACY_API_URL = "http://localhost:5000";
```

Change it to your deployed URL:

```javascript
const SPACY_API_URL = "https://gita-spacy-backend.onrender.com";
```

Save, re-upload your HTML anywhere (GitHub Pages, Netlify, Vercel, even a plain
file) — it will now call your real spaCy backend from anywhere in the world.

## Testing locally first (optional but recommended)

```bash
cd backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```

Server runs at `http://localhost:5000`. Test with:

```bash
curl -X POST http://localhost:5000/parse \
  -H "Content-Type: application/json" \
  -d '{"sentence": "Arjuna asked the Lord why he must fight his own kinsmen"}'
```

You should see real spaCy output — `Arjuna` correctly identified as the `nsubj`
of `asked`, not `Lord`.
