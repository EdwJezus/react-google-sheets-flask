from flask import Flask, request, jsonify
from flask_cors import CORS
from google_api import pega_planilha

app = Flask(__name__)
CORS(app)


@app.route('/login_user', methods=['POST'])
def login_user():

    dados = request.get_json()

    numero_processo = dados.get("numero_processo")
    senha_processo = dados.get("senha_processo")

    dados_planilha = pega_planilha()

    for processo in dados_planilha:

        if processo[1] == numero_processo and processo[3] == senha_processo:

            return jsonify({
                "sucesso": True,
                "processo": {
                    "representante": processo[0],
                    "numero": processo[1],
                    "status": processo[2],
                    "senha": processo[3]
                }
            })

    return jsonify({
        "sucesso": False,
        "mensagem": "Processo ou senha inválidos."
    }), 401


if __name__ == "__main__":
    import os

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)