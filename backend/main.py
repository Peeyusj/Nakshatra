from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn.functional as F
from model import load_model

app = FastAPI()

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once when server starts
model, stoi, itos, block_size = load_model("wavenet_indian_names.pt")


@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": True}


@app.get("/generate")
def generate_name(start: str = ""):
    """Generate a name, optionally starting with given characters"""
    context = [0] * block_size

    # If user provided starting characters, feed them in
    for ch in start.lower():
        if ch in stoi:
            ix = stoi[ch]
            context = context[1:] + [ix]

    out = list(start.lower())
    steps = []

    with torch.no_grad():
        for _ in range(20):
            logits = model(torch.tensor([context]))
            probs = F.softmax(logits, dim=1).squeeze()

            # Get top 5 predictions for frontend visualization
            top5_probs, top5_indices = probs.topk(5)
            step_data = {
                "top5": [
                    {"char": itos[idx.item()], "prob": round(p.item(), 4)}
                    for p, idx in zip(top5_probs, top5_indices)
                ]
            }

            # Sample from the distribution
            ix = torch.multinomial(probs, num_samples=1).item()

            if ix == 0:
                step_data["chosen"] = "."
                steps.append(step_data)
                break

            step_data["chosen"] = itos[ix]
            steps.append(step_data)

            context = context[1:] + [ix]
            out.append(itos[ix])

    return {
        "name": "".join(out),
        "steps": steps,
    }