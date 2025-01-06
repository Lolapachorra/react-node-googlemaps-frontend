import bus from '../../utils/bus';
import styles from './Message.module.css';
import { useState, useEffect } from 'react';

function Message() {
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        // Listener para eventos de flash
        bus.addListener('flash', ({ msg, type }) => {
            //console.log('Received flash event:', { msg, type });
            setVisibility(true);
            setMessage(msg); // Altera para usar 'msg' do evento corretamente
            setType(type);

            setTimeout(() => {
                setVisibility(false);
            }, 3000);
        });


        
    }, []);

    return (
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}>
                {message}
            </div>
        )
    );
}

export default Message;