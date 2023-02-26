import { useState, useEffect } from 'react';
import Quagga from 'quagga';

import VideoPlayer from '@/components/VideoPlayer';

const BarcodeScanner = ({ result, setResult }) => {
    const [stream, setStream] = useState(null);

    useEffect(() => {

        const getStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' },
                });
                setStream(stream);
            } catch (error) {
                console.error(error);
            }
        };

        getStream();

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#video')
            },
            decoder: {
                readers: ["ean_reader"] // Barcode format to detect
            },
            locate: true, // Enable locate
        }, (error) => {
            if (error) {
                console.error(error);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            setResult(data.codeResult.code);
        });

    }, []);



    return (
        <div>
            <VideoPlayer  {...{ stream }} />
            {result && <p>Résultat: {result}</p>}
        </div>
    );
};

export default BarcodeScanner;