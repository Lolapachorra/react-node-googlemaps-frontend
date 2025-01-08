import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import api from "../../utils/api";
import styles from "../css/EntregaMap.module.css";

import { Link } from "react-router-dom";

function EntregaMap() {
    const [directions, setDirections] = useState(null);
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const [entrega, setEntrega] = useState({});
    const [erro, setErro] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        async function pegarRota() {
            try {
                const response = await api.get(`/entregas/calculateroute/${id}`);
                const data = response.data;
                
                setEntrega({
                    nome: data.nome,
                    pontoPartida: data.pontoPartida,
                    pontoDestino: data.pontoDestino,
                    distancia: data.distancia,
                    duracao: data.duracao,
                });

                if (isApiLoaded) {
                    calculateRoute(data.pontoPartida, data.pontoDestino);
                }
            } catch (error) {
                setErro(true)
                console.error("Erro ao buscar rota:", error);
            }
        }
        pegarRota();
    }, [id, isApiLoaded]);

    const calculateRoute = (origin, destination) => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === "OK") {
                    setDirections(result);
                } else {
                    console.error("Erro ao calcular rota:", status);
                }
            }
        );
    };
if(erro) return <h1>Rota não encontrada</h1>
    return (
        <div>
            <h1>Mapa da Entrega: {entrega.nome}</h1>
             
              
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_API_KEY}
                onLoad={() => setIsApiLoaded(true)}
            >
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "500px" }}
                    center={{ lat: -22.9068, lng: -43.1729 }} 
                    zoom={10}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </LoadScript>
               
                <div className={styles.route_details}>
                    <h3>📍 Partida: {entrega.pontoPartida}</h3>
                    <h3>📍 Destino: {entrega.pontoDestino}</h3>
                    <h3>🛣 Distância: {entrega.distancia }</h3>
                    <h3>⏳ Duração: {entrega.duracao}</h3>
                </div>
               
        </div>
    );
}

export default EntregaMap;
