import { useEffect, useState } from "react";
import EmpresasTabela from "../components/EmpresasTabela";
import GAME_API_BASE_URL from "../defs";

function Empresa() {
    const [empresas, setEmpresas] = useState(null);
    const [requestPending, setRequestPending] = useState(true);

    useEffect(() => {
        setRequestPending(true);

        fetch( `${GAME_API_BASE_URL}/empresas/`)
            .then((res) => res.json())
            .then((data) => setEmpresas(data))
            .catch((err) => console.error(err))
            .finally(() => setRequestPending(false));
    }, []);

    return (
        <main>
            {
                (requestPending)
                    ? <p></p>
                    : (empresas)
                        ? (
                            <div>
                                <h1>Empresas</h1>
                                <EmpresasTabela empresas={empresas}></EmpresasTabela>
                            </div>
                        )
                        : <p>Erro</p>
            }
        </main>
    );

}

export default Empresa;