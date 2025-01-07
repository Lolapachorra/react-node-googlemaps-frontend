import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import api from "../utils/api";
import styles from "./EntregaMap.module.css";

function EntregaMap() {
    const [directions, setDirections] = useState(null);
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const [entrega, setEntrega] = useState({});
    const { id } = useParams();

    useEffect(() => {
        
        api.get(`/entregas/${id}`).then((response) => {
            setEntrega(response.data);
        });
    }, [id]);

    useEffect(() => {
        if (isApiLoaded && entrega.pontoPartida && entrega.pontoDestino) {
            calculateRoute(entrega.pontoPartida, entrega.pontoDestino);
        }
    }, [isApiLoaded, entrega]);

    const calculateRoute = (origin, destination) => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result); 
                } else {
                    console.error(`Error fetching directions: ${status}`);
                }
            }
        );
    };

    return (
        <div>
            <h1>Mapa do {entrega.nome}</h1>
            <LoadScript
                googleMapsApiKey="AIzaSyAt9k8qa5H-QGbdRrV0mDWvflXmxZHBNYk"
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
            {directions ? (
                <div className={styles.route_details}>
                    <h3>Endereço de partida: {entrega.pontoPartida}</h3>
                    <h3>Endereço de destino: {entrega.pontoDestino}</h3>
                    <h3>Distância da viagem: {directions.routes[0].legs[0].distance.text}</h3>
                    <h3>Duração da viagem: {directions.routes[0].legs[0].duration.text}</h3>
                </div>
            ) : (
                <p>Rota inválida ou não encontrada</p>
            )}
        </div>
    );
}

export default EntregaMap;
