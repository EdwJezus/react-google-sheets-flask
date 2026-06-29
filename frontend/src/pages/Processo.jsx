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

                {/* ======== DESKTOP ======== */}

                <div className="desktop-view">

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

                </div>

                {/* ======== MOBILE ======== */}

                <div className="mobile-view">

                    <div className="info-item">
                        <span>Representante</span>
                        <p>{processo.representante}</p>
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