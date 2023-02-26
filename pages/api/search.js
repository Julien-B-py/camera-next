import axios from 'axios';

import { FOOD_SEARCH_API_URL } from '@/constants';

export default async function handler(req, res) {

  const { searchQuery } = req.body;

  const searchUrl = `${FOOD_SEARCH_API_URL}/${searchQuery}.json`;

  try {

    const { data: { product } } = await axios.get(searchUrl);

    const {
      code,
      brands,
      product_name,
      product_name_fr,
      product_name_fr_imported,
      categories,
      generic_name_fr,
      stores,
      quantity,
      image_url,
    } = product;

    res.status(200).json({ code, brands, product_name_fr, product_name, product_name_fr_imported, categories, generic_name_fr, stores, quantity, image_url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}