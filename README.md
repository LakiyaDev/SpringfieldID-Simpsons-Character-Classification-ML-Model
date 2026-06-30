# Springfield ID — Simpsons Character Classifier

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Springfield%20ID-yellow?style=for-the-badge)](https://icy-moss-06fa2b400.7.azurestaticapps.net/)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016-black)
![Backend](https://img.shields.io/badge/Backend-Express-green)
![AI](https://img.shields.io/badge/AI-Azure%20Custom%20Vision-blue)
![Deploy](https://img.shields.io/badge/Deploy-Azure-0078D4)

**Springfield ID** is a full-stack AI portfolio project that identifies *The Simpsons* characters from uploaded images. It combines a custom **Azure Custom Vision** multiclass classification model with an immersive glassmorphism web UI, real-time confidence scoring, and rich character metadata.

## Live Application

| Service | URL |
|---------|-----|
| **Website (production)** | [**https://icy-moss-06fa2b400.7.azurestaticapps.net/**](https://icy-moss-06fa2b400.7.azurestaticapps.net/) |
| **Backend API** | [https://simpsonsbackend-hmgff0hac5dpcub3.southeastasia-01.azurewebsites.net](https://simpsonsbackend-hmgff0hac5dpcub3.southeastasia-01.azurewebsites.net) |
| **API health check** | [GET /api/predict/health](https://simpsonsbackend-hmgff0hac5dpcub3.southeastasia-01.azurewebsites.net/api/predict/health) |

Upload a Simpsons image on the live site and get instant character identification with confidence scores and bios.

---

## Overview

Springfield ID demonstrates end-to-end machine learning deployment on Azure:

1. **Train** a Custom Vision model on tagged Simpsons character images
2. **Publish** the model to a Prediction resource
3. **Serve** predictions through a Node.js/Express API
4. **Present** results in a static-export Next.js frontend hosted on Azure Static Web Apps

The model (**SimpsonMLIteration2**) was trained on the [Kaggle Simpsons Characters Dataset](https://www.kaggle.com/datasets/alexattia/the-simpsons-characters-dataset) and recognizes **20+ Springfield residents** across **21 classification tags**.

### Model performance (published iteration)

| Metric | Score |
|--------|-------|
| **Precision** | 95.1% |
| **Recall** | 88.3% |
| **Average Precision** | 97.1% |

Eight characters achieved **100% precision**; three reached perfect precision, recall, and AP scores. See the [About page](https://icy-moss-06fa2b400.7.azurestaticapps.net/about) on the live site for per-character breakdowns.

---

## Features

### Classifier
- Drag-and-drop and file-browse image upload
- Mobile camera capture (`capture="environment"`)
- Automatic analysis on upload — no extra button click required
- Top-5 prediction confidence bar chart
- Character details: occupation, family, personality, iconic quote, and description
- Session prediction history (stored in browser)
- Azure configuration health indicator

### UI & UX
- Animated Springfield sky background (Framer Motion)
- Glassmorphism design with light/dark theme toggle
- Fully responsive layout (mobile, tablet, desktop)
- Static export for fast global delivery via Azure Static Web Apps

### Pages
- **Classifier** — main upload and results experience
- **About** — model metrics, tech stack, dataset info
- **Help** — usage guide, accuracy tips, troubleshooting
- **Contact** — author links and social profiles
- **Privacy** & **Terms** — legal pages

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| **Backend** | Node.js 20+, Express, Multer, Axios |
| **AI / ML** | Azure Custom Vision (multiclass image classification) |
| **Cloud** | Azure Static Web Apps, Azure App Service, Azure Cognitive Services |
| **CI/CD** | GitHub Actions (OIDC deploy to Azure) |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  User uploads image (browser)                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Next.js Frontend (static export)                               │
│  Azure Static Web Apps                                          │
│  https://icy-moss-06fa2b400.7.azurestaticapps.net               │
└────────────────────────────┬────────────────────────────────────┘
                             │  POST /api/predict  (multipart/form-data)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Express API                                                    │
│  Azure App Service — SimpsonsBackEnd                            │
│  https://simpsonsbackend-...azurewebsites.net                   │
└────────────────────────────┬────────────────────────────────────┘
                             │  POST classify/iterations/.../image
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Azure Custom Vision Prediction API                             │
│  simpsonsml-prediction.cognitiveservices.azure.com              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
              Character name + confidence + metadata (characters.json)
```

---

## Project Structure

```
Simpsons Character Classification ML Model/
├── .github/workflows/
│   ├── azure-static-web-apps-icy-moss-06fa2b400.yml   # Frontend → SWA
│   └── main_simpsonsbackend.yml                       # Backend → App Service
├── backend/
│   ├── server.js                    # Express entry point, CORS, routes
│   ├── routes/predict.js            # POST /api/predict, GET /health
│   ├── controllers/predictController.js
│   ├── services/customVision.js     # Azure Custom Vision API client
│   ├── data/characters.json         # Character bios & metadata enrichment
│   ├── .env.example                 # Environment variable template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/                     # Next.js App Router pages
│   │   ├── components/              # UI components (upload, charts, layout)
│   │   └── lib/                     # API client, types, metadata, theme
│   ├── public/
│   │   ├── staticwebapp.config.json # SWA SPA routing fallback
│   │   └── logo.png
│   ├── next.config.ts               # Static export (output: "export")
│   └── package.json
├── package.json                     # Root scripts (concurrent dev)
└── README.md
```

---

## Quick Start (Local Development)

### Prerequisites

- **Node.js** 20 or later
- An **Azure Custom Vision** project with a published prediction iteration
- Prediction resource **Key** and **Endpoint**

### 1. Clone the repository

```bash
git clone https://github.com/LakiyaDev/SpringfieldID-Simpsons-Character-Classification-ML-Model.git
cd "SpringfieldID-Simpsons-Character-Classification-ML-Model"
```

### 2. Configure the backend

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
PREDICTION_KEY=your_prediction_key_from_simpsonsml_prediction_resource
CUSTOM_VISION_ENDPOINT=https://simpsonsml-prediction.cognitiveservices.azure.com
PROJECT_ID=your-project-guid
PUBLISHED_NAME=SimpsonMLIteration2
PORT=5001
FRONTEND_URL=http://localhost:3000
```

> Use the key from your **Prediction** resource (`simpsonsml-prediction`), not the Training resource.

### 3. Install dependencies

```bash
npm run install:all
npm install
```

### 4. Run locally

**Both services at once (recommended):**

```bash
npm run dev
```

Or in separate terminals:

```bash
# Terminal 1 — backend (port 5001)
cd backend && npm run dev

# Terminal 2 — frontend (port 3000)
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000), upload a Simpsons image, and view the prediction.

> On macOS, port 5000 is often used by AirPlay. This project defaults to **port 5001** for the backend.

### 5. Test the API directly

```bash
curl -X POST http://localhost:5001/api/predict \
  -F "image=@/path/to/homer.jpg"

curl http://localhost:5001/api/predict/health
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PREDICTION_KEY` | Key from Azure **Prediction** resource |
| `CUSTOM_VISION_ENDPOINT` | Prediction resource endpoint URL |
| `PROJECT_ID` | Custom Vision project GUID |
| `PUBLISHED_NAME` | Published iteration name (e.g. `SimpsonMLIteration2`) |
| `PORT` | Server port (default `5001`) |
| `FRONTEND_URL` | Allowed CORS origin (local or production frontend URL) |

### Frontend (build-time)

| Variable | Local | Production |
|----------|-------|------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001` | Azure App Service API URL |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | SWA production URL |

Production values are set in `.github/workflows/azure-static-web-apps-icy-moss-06fa2b400.yml` and baked in at build time.

---

## API Reference

### `POST /api/predict`

Upload an image for classification.

**Request:** `multipart/form-data` with field `image` (JPG, PNG, WEBP — max 10 MB)

**Response:**

```json
{
  "character": "Homer Simpson",
  "tagName": "Homer Simpson",
  "confidence": 98.7,
  "predictions": [
    { "tagName": "Homer Simpson", "probability": 0.987, "confidence": 98.7 },
    { "tagName": "Barney Gumble", "probability": 0.008, "confidence": 0.8 }
  ],
  "metadata": {
    "displayName": "Homer Simpson",
    "occupation": "Nuclear Safety Inspector",
    "quote": "D'oh!",
    "color": "#FFD90F"
  }
}
```

### `GET /api/predict/health`

Returns Azure configuration status.

```json
{ "status": "ok", "azureConfigured": true }
```

### Azure Custom Vision endpoint (internal)

```
POST {CUSTOM_VISION_ENDPOINT}/customvision/v3.0/Prediction/{PROJECT_ID}/classify/iterations/{PUBLISHED_NAME}/image
```

Headers: `Prediction-Key`, `Content-Type: application/octet-stream`

---

## Azure Setup (Training Your Own Model)

### 1. Create Azure resources

1. [Create a free Azure account](https://azure.microsoft.com/free/)
2. In **Azure Portal** → **Create a resource** → search **Custom Vision**
3. Create two resources:
   - **Training** — for uploading images and training
   - **Prediction** — for API calls from your app

### 2. Build the dataset

1. Open [Custom Vision](https://www.customvision.ai/) → **New Project**
   - Type: **Classification** → **Multiclass**
   - Domain: **General [A2]**
2. Upload and tag images (aim for **50–100+ per character**)
3. Recommended dataset: [Kaggle Simpsons Characters Dataset](https://www.kaggle.com/datasets/alexattia/the-simpsons-characters-dataset)

### 3. Train and publish

1. Click **Train**, review performance metrics
2. **Publish** to your Prediction resource with a name (e.g. `SimpsonMLIteration2`)
3. Copy **Project ID**, **Endpoint**, and **Prediction Key** into `backend/.env`

### 4. Character metadata

Azure tag names should match keys in `backend/data/characters.json` so the API returns rich bios. Eight characters have full metadata entries; others still classify correctly but may show prediction name only until metadata is added.

---

## Deployment (Azure)

| Component | Azure Service | Deploy trigger |
|-----------|---------------|----------------|
| **Frontend** | Azure Static Web Apps | Push to `main` |
| **Backend** | Azure App Service (`SimpsonsBackEnd`) | Push to `main` (changes in `backend/`) |
| **ML Model** | Azure Custom Vision (hosted) | Publish from Custom Vision portal |

### Frontend (Static Web Apps)

- **Static export:** `next build` outputs to `frontend/out/`
- **Workflow:** `.github/workflows/azure-static-web-apps-icy-moss-06fa2b400.yml`
- **SPA routing:** `frontend/public/staticwebapp.config.json` handles client-side routes

### Backend (App Service)

- **Workflow:** `.github/workflows/main_simpsonsbackend.yml`
- **Startup command:** `npm start`
- **App settings:** mirror `backend/.env` values in Azure Portal → Configuration
- Set `SCM_DO_BUILD_DURING_DEPLOYMENT=false` (dependencies installed in CI)

### Post-deploy checklist

- [ ] `FRONTEND_URL` on App Service matches the SWA production URL
- [ ] `NEXT_PUBLIC_API_URL` in SWA workflow points to the App Service URL
- [ ] `NEXT_PUBLIC_SITE_URL` in SWA workflow points to the SWA production URL
- [ ] Health check returns `azureConfigured: true`
- [ ] Upload test image on live site succeeds

### Custom domain (optional)

You can attach a custom domain via **Azure DNS** (~$0.50/month per zone) or free DNS at your registrar / Cloudflare:

- `www.yourdomain.com` → Static Web App (CNAME + TXT validation)
- `api.yourdomain.com` → App Service (CNAME + managed SSL)

Update `FRONTEND_URL`, `NEXT_PUBLIC_API_URL`, and `NEXT_PUBLIC_SITE_URL` after the domain is live.

---

## Supported Characters

The model recognizes **21 tags** trained in the SimpsonsML Custom Vision project, including:

Homer, Marge, Bart, Lisa, Maggie, Ned Flanders, Mr. Burns, Milhouse, Groundskeeper Willie, Edna Krabappel, Carl Carlson, Apu, Kent Brockman, Grampa Simpson, Mayor Quimby, Krusty, Lenny, Chief Wiggum, Moe, Barney, and Comic Book Guy.

Full metadata (quotes, occupation, family) is available for the eight core characters in `backend/data/characters.json`.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Azure Custom Vision is not configured` | Copy `backend/.env.example` → `backend/.env` and fill all values |
| `Invalid Prediction Key` | Use Key from **Prediction** resource, not Training |
| `Model not found` | Republish model; ensure `PUBLISHED_NAME` matches published iteration |
| CORS errors in production | Set `FRONTEND_URL` on App Service to your SWA URL |
| Port 5001 already in use | Kill stale process or change `PORT` in `.env` |
| SWA 404 on routes like `/about` | Ensure `staticwebapp.config.json` is deployed and `is_static_export: true` in workflow |
| No character metadata | Align Azure tag names with `backend/data/characters.json` keys |
| Analysis failed on live site | Verify App Service env vars and restart the backend |

---

## Author

**Sadeepa Lakshan** ([@LakiyaDev](https://github.com/LakiyaDev))

- GitHub: [github.com/LakiyaDev](https://github.com/LakiyaDev)
- LinkedIn: [Sadeepa Lakshan Bandaranayaka](https://www.linkedin.com/in/sadeepa-lakshan-bandaranayaka-37b75b288)
- Email: iamsadeepalakshan@gmail.com

---

## License

Educational and portfolio use. *The Simpsons* and related characters are trademarks of their respective owners. Use only appropriately licensed images for model training.
