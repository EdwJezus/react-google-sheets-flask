import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# ID e cedulas da planilha
SAMPLE_SPREADSHEET_ID = "1PsXdzE7g7rGilm6IiwLbyTaYFpaMsKT6VFqD-3kKJhE"
SAMPLE_RANGE_NAME = "Página1!A1:D10"

def pega_planilha():
  creds = None
  # o arquivo token.json guarda o acesso do usuario e atualiza os tokens. é criado automaticamente na primeira verificação
  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)

  # se não existem credenciais validas, permite o usuario fazer login
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          "client_secret.json", SCOPES
      )
      creds = flow.run_local_server(port=0)
    # salva as credenciais pra proxima execução
    with open("token.json", "w") as token:
      token.write(creds.to_json())

  service = build("sheets", "v4", credentials=creds)

  # chama a api do google sheets
  sheet = service.spreadsheets()
  result = (
      sheet.values()
      .get(spreadsheetId=SAMPLE_SPREADSHEET_ID, range=SAMPLE_RANGE_NAME)
      .execute()
  )
  values = result.get("values", [])

  if not values:
    print("No data found.")
    return

  return(values)