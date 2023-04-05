import torch
from fastapi import FastAPI, HTTPException
from utils import extract_features
from pydantic import BaseModel, AnyUrl

app = FastAPI()

# Define the neural network class
class Net(torch.nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(Net, self).__init__()
        self.fc1 = torch.nn.Linear(input_size, hidden_size)
        self.relu = torch.nn.ReLU()
        self.fc2 = torch.nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x


# Load the trained model
model = Net(15, 64, 2)
model.load_state_dict(torch.load("model_weights.pth"))
model.eval()


class PredictRequestBody(BaseModel):
    url: AnyUrl


@app.post("/predict")
async def predict(request_body: PredictRequestBody):
    url = request_body.url

    # Extract features from the URL text
    try:
        features = extract_features(url)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error extracting features: {e}")

    # Convert the features to a PyTorch tensor
    input_tensor = torch.tensor(features, dtype=torch.float32).unsqueeze(0)

    # Make predictions using the neural network
    with torch.no_grad():
        logits = model(input_tensor)
        probs = torch.softmax(logits, dim=1)

    prob_malicious = probs[0, 1].item()
    prob_benign = probs[0, 0].item()

    return {
        "probabilities": {
            "phishing": prob_malicious,
            "safe": prob_benign,
        }
    }
