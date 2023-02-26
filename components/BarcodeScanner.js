import { useState, useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ result, setResult }) => {
    const [stream, setStream] = useState(null);

    useEffect(() => {

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
                setStream(stream);
            })
            .catch((err) => {
                console.error(err);
            });

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
        }, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            setResult(data.codeResult.code);
        });

    }, []);

    useEffect(() => {
        if (stream) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    width: stream.getTracks()[0].getSettings().width,
                    height: stream.getTracks()[0].getSettings().height,
                }),
            };

            fetch('/api/media', options)
                .then((res) => res.json())
                .then((data) => {
                    setResult(data.result);
                })
                .catch((err) => {
                    console.error(err);
                });

        }
    }, [stream]);

    return (
        <div>
            <video
                ref={(video) => {
                    if (video && stream) {
                        video.srcObject = stream;
                    }
                }}
                autoPlay
                playsInline
                muted
                id="video"
                style={{ width: '100%', maxWidth: '400px', maxHeight: '400px' }}
            />
            {result && <p>Résultat: {result}</p>}

        </div>
    );
};

export default BarcodeScanner;