import Input from '../Form/Input'
import styles from "../Form/Form.module.css";
import { useState } from 'react';
import api from '../../utils/api'

function CriarEntrega() {

    // Função para envio do formulário

    const [submitButton, setSubmitButton] = useState(false)
    //create userState
    const [entrega, setEntrega] = useState({});

    function handleChange(e) {
        setEntrega({ ...entrega, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitButton(true)
        console.log(entrega)
        try {
            await api.post('/entregas/create', entrega).then((response) => {
                console.log('Resposta do backend:', response.data);
                alert('Entrega criada com sucesso!')
                setSubmitButton(false)
                //windows to allEntregas
                window.location.href = '/allentregas'
            }).catch((error) => {
                console.error(error)
                console.log(error.message || error.response)
                alert('Ocorreu um erro ao tentar cadastrar a entrega. Verifique os dados e tente novamente.')
                setSubmitButton(false)
            })

        }
        catch (error) {
            console.error("erro completo", error.message || error.response)
            alert('Ocorreu um erro ao tentar criar a entrega. Verifique os dados e tente novamente.')
            setSubmitButton(false)
        }

    }
    return (
        <section className={styles.form_container}>
            <div>
                <h1>
                    Criar Entrega
                </h1>
            </div>
            {/* Formulário para criação de entrega */}
            <form onSubmit={handleSubmit}>
                <Input type='text' placeholder="Ex: " text="Nome Do Cliente" name="nome" handleOnChange={handleChange} />
                <Input type='text' placeholder="Ex: Rio De Janeiro, RJ" text="Endereço atual" name="pontoPartida" handleOnChange={handleChange} />
                <Input type='text' placeholder="Ex: São Paulo, SP" text="Endereço de entrega" name="pontoDestino" handleOnChange={handleChange} />
                <input type="submit" value="Enviar" disabled={submitButton} />
            </form>
        </section>
    )
}

export default CriarEntrega;