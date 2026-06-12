from flask import Flask, render_template
from google_api import pega_planilha

app = Flask(__name__)

@app.route('/')
def home():
    dados_planilha = pega_planilha()
    return render_template('home.html', dados_planilha=dados_planilha)

if __name__ == "__main__":
    app.run(debug=True)