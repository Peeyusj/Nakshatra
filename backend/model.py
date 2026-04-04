import torch
import torch.nn as nn
import torch.nn.functional as F


# Same custom layers we built in Colab
class FlattenConsecutive(nn.Module):
    def __init__(self, n):
        super().__init__()
        self.n = n

    def forward(self, x):
        B, T, C = x.shape
        x = x.view(B, T // self.n, C * self.n)
        if x.shape[1] == 1:
            x = x.squeeze(1)
        return x


class BatchNorm1d(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.bn = nn.BatchNorm1d(dim)

    def forward(self, x):
        if x.ndim == 2:
            return self.bn(x)
        B, T, C = x.shape
        x = self.bn(x.view(B * T, C))
        return x.view(B, T, C)


def load_model(filepath):
    """Load the trained model and vocab from the .pt file"""
    data = torch.load(filepath, map_location='cpu')  # cpu because server won't have GPU

    vocab_size = data['vocab_size']
    n_embd = data['n_embd']
    n_hidden = data['n_hidden']
    stoi = data['stoi']
    itos = data['itos']
    block_size = data['block_size']

    # Rebuild the same architecture from Colab
    model = nn.Sequential(
        nn.Embedding(vocab_size, n_embd),

        FlattenConsecutive(2),
        nn.Linear(n_embd * 2, n_hidden, bias=False),
        BatchNorm1d(n_hidden),
        nn.Tanh(),

        FlattenConsecutive(2),
        nn.Linear(n_hidden * 2, n_hidden, bias=False),
        BatchNorm1d(n_hidden),
        nn.Tanh(),

        FlattenConsecutive(2),
        nn.Linear(n_hidden * 2, n_hidden, bias=False),
        BatchNorm1d(n_hidden),
        nn.Tanh(),

        nn.Linear(n_hidden, vocab_size),
    )

    # Load the learned weights into the architecture
    model.load_state_dict(data['model_state'])
    model.eval()  # inference mode

    return model, stoi, itos, block_size