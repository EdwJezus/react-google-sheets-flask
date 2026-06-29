import { useLocation, useNavigate } from "react-router-dom";
import "../css/Processo.css";

function Processo() {

    const location = useLocation();
    const navigate = useNavigate();

    const processo = location.state;

    if (!processo) {

        return (
            <>
                <h2>Nenhum processo encontrado.</h2>

                <button onClick={() => navigate("/")}>
                    Voltar
                </button>
            </>
        );

    }

    return (

        <div className="processo-container">
            <h1>Processo escolhido</h1>

            <fieldset>

                <table>

                    <thead>

                        <tr>

                            <th>Representante</th>
                            <th>Número</th>
                            <th>Status</th>
                            <th>Senha</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>{processo.representante}</td>
                            <td>{processo.numero}</td>
                            <td>{processo.status}</td>
                            <td>{processo.senha}</td>

                        </tr>

                    </tbody>

                </table>

            </fieldset>
        </div>

    );

}

export default Processo;