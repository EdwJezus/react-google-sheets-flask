from flask import Flask, render_template, request, redirect, session
from google_api import pega_planilha

app = Flask(__name__)

app.secret_key = 'chave_flask'

@app.route('/debug')
def debug():
    dados_planilha = pega_planilha()
    return render_template('debug.html', dados_planilha=dados_planilha)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login_user', methods=['POST'])
def login_user():
    dados_planilha = pega_planilha()
    numero_processo = request.form['numero_processo']
    senha_processo = request.form['senha_processo']

    for n in dados_planilha:
        if n[1] == numero_processo and n[3] == senha_processo:
            session['user_dados_processo'] = n
            return redirect('/processo')
    
    return render_template('login.html')

@app.route('/processo')
def processo():
    user_dados_processo = session['user_dados_processo']
    return render_template('processo.html', user_dados_processo=user_dados_processo)

if __name__ == "__main__":
    app.run(debug=True)