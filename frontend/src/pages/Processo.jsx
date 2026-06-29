import { useLocation, useNavigate } from "react-router-dom";
import "../css/Processo.css";

function Processo() {

    const location = useLocation();
    const navigate = useNavigate();

    const processo = location.state;

    if (!processo) {
        return (
            <div className="processo-container">

                <h2>Nenhum processo encontrado.</h2>

                <button
                    onClick={() => navigate("/")}
                >
                    Voltar
                </button>

            </div>
        );
    }

    return (

        <div className="processo-container">

            <h1>Processo encontrado</h1>

            <fieldset>

                <div className="info-container">

                    <div className="info-item">
                        <span>Nome</span>
                        <p>{processo.nome}</p>
                    </div>

                    <div className="info-item">
                        <span>Número</span>
                        <p>{processo.numero}</p>
                    </div>

                    <div className="info-item">
                        <span>Status</span>
                        <p>{processo.status}</p>
                    </div>

                    <div className="info-item">
                        <span>Senha</span>
                        <p>{processo.senha}</p>
                    </div>

                </div>

                <button
                    className="voltar"
                    onClick={() => navigate("/")}
                >
                    Nova consulta
                </button>

            </fieldset>

        </div>

    );

}

export default Processo;