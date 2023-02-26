import DataFetcher from '@/components/DataFetcher';
import BarcodeScanner from '@/components/BarcodeScanner';

import { useState } from 'react';

export default function BarcodeDataFetcher() {
    const [result, setResult] = useState('');

    return (
        <div>
            <BarcodeScanner {...{ result, setResult }} />
            <DataFetcher {...{ result }} />
        </div>
    );
}

