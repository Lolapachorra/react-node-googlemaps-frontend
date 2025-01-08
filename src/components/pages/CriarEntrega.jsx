// src/components/CriarEntrega.js
import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import Input from '../Form/Input';
import styles from "../Form/Form.module.css";
import api from '../../utils/api';

const libraries = ["places"];

function CriarEntrega() {
    const [submitButton, setSubmitButton] = useState(false);
    const [entrega, setEntrega] = useState({
        nome: '',
        pontoPartida: '',
        pontoDestino: ''
    });

    const [autocompletePartida, setAutocompletePartida] = useState(null);
    const [autocompleteDestino, setAutocompleteDestino] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_API_KEY,
        libraries,
    });

    const handleChange = (e) => {
        setEntrega({ ...entrega, [e.target.name]: e.target.value });
    };

    const handlePlaceChanged = (field) => {
        if (field === 'pontoPartida' && autocompletePartida) {
            const place = autocompletePartida.getPlace();
            setEntrega({ ...entrega, pontoPartida: place.formatted_address });
        }
        if (field === 'pontoDestino' && autocompleteDestino) {
            const place = autocompleteDestino.getPlace();
            setEntrega({ ...entrega, pontoDestino: place.formatted_address });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitButton(true);
        try {
            const response = await api.post('/entregas/create', entrega);
            console.log('Resposta do backend:', response.data);
            alert('Entrega criada com sucesso!');
            setSubmitButton(false);
            window.location.href = '/allentregas';
        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao tentar cadastrar a entrega.');
            setSubmitButton(false);
        }
    };

    if (!isLoaded) return <div>Carregando mapa...</div>;
    return (
        <section className={styles.form_container}>
            <h1>Criar Entrega</h1>
            <form onSubmit={handleSubmit}>
                <Input type='text' text="Nome Do Cliente" name="nome" handleOnChange={handleChange} />
                
                <Autocomplete
                    onLoad={(autocomplete) => setAutocompletePartida(autocomplete)}
                    onPlaceChanged={() => handlePlaceChanged('pontoPartida')}
                >
                    <Input type='text' text="Endereço atual" name="pontoPartida" handleOnChange={handleChange} />
                </Autocomplete>
                
                <Autocomplete
                    onLoad={(autocomplete) => setAutocompleteDestino(autocomplete)}
                    onPlaceChanged={() => handlePlaceChanged('pontoDestino')}
                >
                    <Input type='text' text="Endereço de entrega" name="pontoDestino" handleOnChange={handleChange} />
                </Autocomplete>

                <input type="submit" value="Enviar" disabled={submitButton} />
            </form>
        </section>
    );
}

export default CriarEntrega;
