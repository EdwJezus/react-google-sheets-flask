import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {

    const [numeroProcesso, setNumeroProcesso] = useState("");
    const [senhaProcesso, setSenhaProcesso] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const resposta = await fetch("https://direitoprocessos.onrender.com/login_user", { // mudar para endereço certo

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    numero_processo: numeroProcesso,
                    senha_processo: senhaProcesso

                })

            });

            const dados = await resposta.json();

            if (dados.sucesso) {

                navigate("/processo", {
                    state: dados.processo
                });

            } else {

                alert(dados.mensagem);

            }

        } catch (erro) {

            console.error(erro);
            alert("Erro ao conectar com o servidor.");

        }

    }

    return (

        <div className="login-container">
            <h1>Buscador de processo (login)</h1>

            <fieldset>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Digite o número do processo"
                        value={numeroProcesso}
                        onChange={(e) => setNumeroProcesso(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Digite a senha"
                        value={senhaProcesso}
                        onChange={(e) => setSenhaProcesso(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Enviar
                    </button>

                </form>

            </fieldset>
        </div>

    );

}

export default Login;