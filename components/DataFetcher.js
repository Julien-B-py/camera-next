import { useState, useCallback } from 'react';

import axios from 'axios';

import { FOOD_SEARCH_API_ROUTE } from '@/constants';

export default function DataFetcher({ result }) {
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.post(FOOD_SEARCH_API_ROUTE, { searchQuery: result });
            setProductData(response.data);
        } catch (error) {
            console.error(error);
            setProductData(null);
        }
        setLoading(false);
    }, [result]);

    return (
        <div>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Fetching Data...' : 'Fetch Data'}
            </button>
            {productData ? (
                <div className="card">
                    <h1>{productData.product_name_fr || productData.product_name || productData.product_name_fr_imported}</h1>
                    <img src={productData.image_url} style={{ height: "200px" }} />
                    <p>Code: {productData.code}</p>
                    <p>Brands: {productData.brands}</p>
                    <p>Categories: {productData.categories}</p>
                    <p>Generic Name: {productData.generic_name_fr}</p>
                    <p>Stores: {productData.stores}</p>
                    <p>Quantity: {productData.quantity}</p>
                </div>
            ) : (
                <p>{loading ? 'Loading...' : 'No data found'}</p>
            )}
        </div>
    );
}
