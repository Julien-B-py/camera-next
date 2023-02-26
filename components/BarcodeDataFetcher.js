import { useState } from 'react';

import BarcodeScanner from '@/components/BarcodeScanner';
import DataFetcher from '@/components/DataFetcher';

export default function BarcodeDataFetcher() {
    const [result, setResult] = useState('');
    const [started, setStarted] = useState(false);

    const handleScannerStart = () => setStarted(true);

    return (
        <div>
            {!started ?
                <button onClick={handleScannerStart}>Scan a barcode</button>
                :
                <>
                    <BarcodeScanner {...{ result, setResult }} />
                    <DataFetcher {...{ result }} />
                </>
            }
        </div>
    );
}

