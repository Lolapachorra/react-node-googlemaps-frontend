import { useEffect, useState } from 'react';
import api from '../../utils/api';
import styles from '../Form/Form.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../Form/Input';

function EditEntrega() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [entrega, setEntrega] = useState({});
    const [submitButton, setSubmitButton] = useState(false);
  

    useEffect(() => {
        api.get(`/entregas/${id}`)
            .then((response) => {
                setEntrega(response.data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleChange = (e) => {
        setEntrega({ ...entrega, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        if(window.confirm('Tem certeza que quer editar?')){
        e.preventDefault();
        setSubmitButton(true);
        // Criar um objeto apenas com os campos necessários
        const body = {
            nome: entrega.nome,
            pontoPartida: entrega.pontoPartida,
            pontoDestino: entrega.pontoDestino,
        };

        api.patch(`/entregas/edit/${id}`, body)
            .then(() => {
               
                    
                    navigate('/allentregas'); // Redireciona após sucesso
                    window.confirm('Tarefa Editada com Sucesso')
            })
            .catch((error) => {
                console.error(error);
              
            })
            .finally(() => {
                setSubmitButton(false);
            });
        }
    };

    return (
        <section className={styles.form_container}>
            <div>
                <h1>Editar entrega</h1>
             
            </div>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Ex: Nome do cliente"
                    text="Nome Do Cliente"
                    name="nome"
                    handleOnChange={handleChange}
                    value={entrega.nome || ''}
                />
                <Input
                    type="text"
                    placeholder="Ex: Rio De Janeiro, RJ"
                    text="Endereço atual"
                    name="pontoPartida"
                    handleOnChange={handleChange}
                    value={entrega.pontoPartida || ''}
                />
                <Input
                    type="text"
                    placeholder="Ex: São Paulo, SP"
                    text="Endereço de entrega"
                    name="pontoDestino"
                    handleOnChange={handleChange}
                    value={entrega.pontoDestino || ''}
                />
                <input type="submit" value="Enviar" disabled={submitButton} />
            </form>
        </section>
    );
}

export default EditEntrega;
