import Input from './Form/Input'
import styles from "./Form/Form.module.css";
import { Link } from "react-router-dom";
import { useState } from 'react';
import api from '../utils/api'

function CriarEntrega(){
      
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
        //  console.log(entrega)
        try {
            const response = await fetch('http://localhost:3000/entregas/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entrega),
            });
    
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Resposta do backend:', data);
        } catch (error) {
            alert('Erro ao tentar cadastrar a entrega: ' + error.message);
        } finally {
            setSubmitButton(false);
        }
         
          
        }
    return(
        <section className={styles.form_container}>
            <div>
                <h1>
                    Criar Entrega
                </h1>
            </div>
            {/* Formulário para criação de entrega */}
            <form onSubmit={handleSubmit}>
                <Input type='text'  placeholder="Insira o nome do cliente" text="Nome Do Cliente" name="nome" handleOnChange={handleChange} />
                <Input type='text'  placeholder="Endereço atual" text="Endereço atual" name="PontoPartida" handleOnChange={handleChange} />
                <Input type='text'  placeholder="Endereço de entrega" text="Endereço de entrega" name="PontoDestino" handleOnChange={handleChange} />
                <input type="submit" value="Enviar" disabled={submitButton} />
            </form>
        </section>
    )
}

export default CriarEntrega;