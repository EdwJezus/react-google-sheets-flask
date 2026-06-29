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

                <button onClick={() => navigate("/")}>
                    Voltar
                </button>

            </div>
        );
    }

    return (

        <div className="processo-container">

            <h1>Processo encontrado</h1>

            <fieldset>

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Nome</th>
                                <th>Número</th>
                                <th>Status</th>
                                <th>Senha</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>{processo.nome}</td>
                                <td>{processo.numero}</td>
                                <td>{processo.status}</td>
                                <td>{processo.senha}</td>

                            </tr>

                        </tbody>

                    </table>

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