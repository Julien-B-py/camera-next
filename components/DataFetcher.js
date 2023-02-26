import { useState, useCallback } from 'react';

import axios from 'axios';

import ProductCard from '@/components/ProductCard';
import { FOOD_SEARCH_API_ROUTE } from '@/constants';

export default function DataFetcher({ result }) {
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const fetchData = useCallback(async () => {

        setLoading(true);
        try {
            const response = await axios.post(FOOD_SEARCH_API_ROUTE, {
                searchQuery: result
            });
            setProductData(response.data);
        } catch (error) {
            console.error(error);
            setProductData(null);
        } finally {
            setLoading(false);
            setButtonClicked(true);
        }

    }, [result]);

    if (!result) return;

    return (
        <div>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Fetching data...' : 'Fetch data'}
            </button>
            {buttonClicked && (productData ? <ProductCard productData={productData} /> : <p>No data found</p>)}
        </div>
    );
}