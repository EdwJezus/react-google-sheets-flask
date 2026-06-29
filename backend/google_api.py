import os
import time

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

SAMPLE_SPREADSHEET_ID = "1PsXdzE7g7rGilm6IiwLbyTaYFpaMsKT6VFqD-3kKJhE"
SAMPLE_RANGE_NAME = "Página1!A1:D10"

# Caminhos absolutos (evita erro no deploy)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TOKEN_FILE = os.path.join(BASE_DIR, "token.json")
CLIENT_SECRET_FILE = os.path.join(BASE_DIR, "client_secret.json")

# CACHE
dados_cache = None
ultima_atualizacao = None
CACHE_TEMPO = 300  # 5 minutos


def pega_planilha():
    global dados_cache, ultima_atualizacao

    # 1. CACHE (evita chamadas repetidas)
    if dados_cache and ultima_atualizacao:
        if time.time() - ultima_atualizacao < CACHE_TEMPO:
            return dados_cache

    creds = None

    # 2. TOKEN
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    # 3. AUTENTICAÇÃO
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except Exception:
                creds = None  # força novo login

        if not creds:
            flow = InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRET_FILE,
                SCOPES
            )
            creds = flow.run_local_server(port=0)

        # salva token
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())

    # 4. GOOGLE SHEETS API
    service = build("sheets", "v4", credentials=creds)

    sheet = service.spreadsheets()
    result = sheet.values().get(
        spreadsheetId=SAMPLE_SPREADSHEET_ID,
        range=SAMPLE_RANGE_NAME
    ).execute()

    values = result.get("values", [])

    # 5. SALVA CACHE
    dados_cache = values
    ultima_atualizacao = time.time()

    return values