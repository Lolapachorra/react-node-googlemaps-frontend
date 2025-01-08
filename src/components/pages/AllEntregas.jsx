import { useEffect, useState } from 'react';
import styles from '../css/AllEntregas.module.css'
import api from '../../utils/api';
import { Link } from 'react-router-dom'

function AllEntregas() {
    const [entregas, setEntregas] = useState([])

    useEffect(() => {
        api.get('/entregas').then((response) => {
            console.log(response.data.entregas)  // Mostra os dados das entregas no console
            setEntregas(response.data.entregas)
        })
    }, [])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (

        <div>
            <div className={styles.container_header}>
                <h1>Todas as Entregas</h1>
            </div>
            {entregas.length > 0 ? (
                <div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ponto de Partida</th>
                                <th>Ponto de Destino</th>
                                <th>Data de Entrega</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody className={styles.table}>
                            {entregas.map((entrega) => (
                                <tr key={entrega._id}>
                                    <td>{entrega.nome}</td>
                                    <td>{entrega.pontoPartida}</td>
                                    <td>{entrega.pontoDestino}</td>
                                    <td>{formatDate(entrega.createdAt)}</td>
                                    <td>
                                        <button onClick={() => {
                                            if (window.confirm("tem certeza que deseja deletar essa entrega?")) {
                                                api.delete(`/entregas/delete/${entrega._id}`)
                                                    .then(() => {
                                                        setEntregas(entregas.filter((e) => e._id !== entrega._id));
                                                    })
                                                    .catch((error) => console.error(error));
                                            }
                                        }}>Deletar</button>
                                        <button onClick={() => {
                                            window.location.href = `/entrega/${entrega._id}`;
                                        }}> Ver Rota</button>
                                        <button>
                                            <Link to={`/entrega/edit/${entrega._id}`}>    Alterar</Link>
                                        </button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Nenhuma entrega cadastrada. <Link to="/create/entrega">Faça uma agora!</Link></div>
            )}
        </div>
    )
}

export default AllEntregas;