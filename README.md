# Springfield ID — Simpsons Character Classification

An AI portfolio project that identifies Simpsons characters from uploaded images using **Azure Custom Vision**, with an immersive glassmorphism frontend and a Node.js API backend.

![Stack](https://img.shields.io/badge/Frontend-Next.js%2016-black)
![Stack](https://img.shields.io/badge/Backend-Express-green)
![Stack](https://img.shields.io/badge/AI-Azure%20Custom%20Vision-blue)

## Architecture

```
User uploads image
       │
       ▼
Next.js Frontend (port 3000)
       │
       POST /api/predict
       │
       ▼
Express Backend (port 5001)
       │
       Azure Custom Vision Prediction API
       │
       ▼
Character name + confidence + metadata
```

## Quick Start

### 1. Train your model in Azure (one-time)

1. Create an [Azure account](https://azure.microsoft.com/free/) (free tier works).
2. In **Azure Portal** → **Create a resource** → search **Custom Vision** → create:
   - **Training** resource (to train the model)
   - **Prediction** resource (to call the API from your app)
3. Open [Custom Vision](https://www.customvision.ai/) → **New Project**:
   - Name: `Simpsons Character Classification`
   - Type: **Classification** → **Multiclass**
   - Domain: **General**
4. Upload and tag images (aim for **50–100+ per character**):
   - Homer Simpson, Marge Simpson, Bart Simpson, Lisa Simpson, Maggie Simpson
   - Ned Flanders, Mr Burns, Milhouse
5. Click **Train**, then **Publish**:
   - Prediction resource: your Prediction resource
   - Published name: `springfield-v1` (or update `PUBLISHED_NAME` in `.env`)
6. Collect credentials from Azure Portal → your **Prediction** resource → **Keys and Endpoint**:
   - **Key 1** → `PREDICTION_KEY`
   - **Endpoint** → `CUSTOM_VISION_ENDPOINT`
7. Get **Project ID** from Custom Vision → project **Settings** (GUID).

### 2. Configure the backend

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
PREDICTION_KEY=your_key_from_azure_portal
CUSTOM_VISION_ENDPOINT=https://YOUR-RESOURCE.cognitiveservices.azure.com
PROJECT_ID=your-project-guid
PUBLISHED_NAME=springfield-v1
PORT=5001
FRONTEND_URL=http://localhost:3000
```

> **Tag names matter:** Azure tag names should match (or be close to) keys in `backend/data/characters.json` so metadata (quotes, occupation, etc.) appears on the result page.

### 3. Install and run

```bash
# Install all dependencies
npm run install:all
npm install

# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

Or run both together from the project root:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), upload a Simpsons image, and click **Identify Character**.

### 4. Test the API directly

```bash
curl -X POST http://localhost:5001/api/predict \
  -F "image=@/path/to/homer.jpg"
```

Health check:

```bash
curl http://localhost:5001/api/predict/health
```

## Project Structure

```
├── backend/
│   ├── server.js              # Express entry point
│   ├── routes/predict.js      # POST /api/predict
│   ├── controllers/           # Prediction + character enrichment
│   ├── services/customVision.js  # Azure API client
│   └── data/characters.json   # Character bios (local metadata)
├── frontend/
│   └── src/
│       ├── app/               # Next.js App Router
│       └── components/        # UI (upload, results, animations)
└── README.md
```

## Azure Custom Vision API Details

The backend sends the raw image bytes to:

```
POST {ENDPOINT}/customvision/v3.0/Prediction/{PROJECT_ID}/classify/iterations/{PUBLISHED_NAME}/image
```

Headers:

- `Prediction-Key`: your prediction key
- `Content-Type`: `application/octet-stream`

Example Azure response:

```json
{
  "predictions": [
    { "tagName": "Homer Simpson", "probability": 0.987 }
  ]
}
```

The backend returns a simplified payload with top-5 predictions and character metadata.

## Features

- Drag-and-drop and file browse upload
- Mobile camera capture (`capture="environment"`)
- Animated Springfield sky background
- Glassmorphism UI with Framer Motion
- Top-5 confidence bar chart
- Character details (occupation, family, quote, personality)
- Session prediction history
- Azure configuration health indicator

## Deployment

| Component | Suggested Azure service |
|-----------|-------------------------|
| Frontend  | Azure Static Web Apps or Vercel |
| Backend   | Azure App Service |
| AI Model  | Already hosted by Custom Vision |

Set environment variables on App Service to match `backend/.env`. Update `NEXT_PUBLIC_API_URL` in the frontend to your deployed API URL.

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Azure Custom Vision is not configured` | Copy `backend/.env.example` → `backend/.env` and fill in all values |
| `Invalid Prediction Key` | Use Key from **Prediction** resource, not Training |
| `Model not found` | Republish model; ensure `PUBLISHED_NAME` matches published iteration |
| CORS errors | Set `FRONTEND_URL` in backend `.env` to your frontend origin |
| No character metadata | Align Azure tag names with `backend/data/characters.json` keys |

## License

Educational / portfolio use. The Simpsons is a trademark of Disney. Use only appropriately licensed images for training.
