import { useEffect, useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import api from '../../utils/api';
import styles from '../Form/Form.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../Form/Input';

const libraries = ["places"];

function EditEntrega() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [entrega, setEntrega] = useState({});
    const [submitButton, setSubmitButton] = useState(false);
    
    const [autocompletePartida, setAutocompletePartida] = useState(null);
    const [autocompleteDestino, setAutocompleteDestino] = useState(null);

    // Carrega a API do Google Maps
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_API_KEY,
        libraries,
    });

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

    const handlePlaceChanged = (field) => {
        if (field === 'pontoPartida' && autocompletePartida) {
            const place = autocompletePartida.getPlace();
            if (place.formatted_address) {
                setEntrega({ ...entrega, pontoPartida: place.formatted_address });
            }
        }
        if (field === 'pontoDestino' && autocompleteDestino) {
            const place = autocompleteDestino.getPlace();
            if (place.formatted_address) {
                setEntrega({ ...entrega, pontoDestino: place.formatted_address });
            }
        }
    };

    const handleSubmit = (e) => {
        if (window.confirm('Tem certeza que quer editar?')) {
            e.preventDefault();
            setSubmitButton(true);
            const body = {
                nome: entrega.nome,
                pontoPartida: entrega.pontoPartida,
                pontoDestino: entrega.pontoDestino,
            };

            api.patch(`/entregas/edit/${id}`, body)
                .then(() => {
                    navigate('/allentregas');
                    alert('Entrega editada com sucesso!');
                })
                .catch((error) => {
                    console.error(error);
                    alert('Erro ao editar a entrega.');
                })
                .finally(() => {
                    setSubmitButton(false);
                });
        }
    };

    if (!isLoaded) return <div>Carregando mapa...</div>;

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

                {/* Autocomplete para ponto de partida */}
                <Autocomplete
                    onLoad={(autocomplete) => setAutocompletePartida(autocomplete)}
                    onPlaceChanged={() => handlePlaceChanged('pontoPartida')}
                >
                    <Input
                        type="text"
                        placeholder="Ex: Rio de Janeiro, RJ"
                        text="Endereço atual"
                        name="pontoPartida"
                        handleOnChange={handleChange}
                        value={entrega.pontoPartida || ''}
                    />
                </Autocomplete>

                {/* Autocomplete para ponto de destino */}
                <Autocomplete
                    onLoad={(autocomplete) => setAutocompleteDestino(autocomplete)}
                    onPlaceChanged={() => handlePlaceChanged('pontoDestino')}
                >
                    <Input
                        type="text"
                        placeholder="Ex: São Paulo, SP"
                        text="Endereço de entrega"
                        name="pontoDestino"
                        handleOnChange={handleChange}
                        value={entrega.pontoDestino || ''}
                    />
                </Autocomplete>

                <input type="submit" value="Enviar" disabled={submitButton} />
            </form>
        </section>
    );
}

export default EditEntrega;
