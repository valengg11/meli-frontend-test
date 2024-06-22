const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Autor de la aplicación
const author = {
  name: "Valentina",
  lastname: "Gomez"
};

// Endpoint para búsqueda de items
app.get('/api/items', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'A search parameter is required' });
      }
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`);
    
    const items = response.data.results.slice(0, 4).map(item => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: (item.price % 1).toFixed(2).substring(2)
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping
    }));

    const categories = response.data.filters
      .find(filter => filter.id === "category")
      ?.values[0]?.path_from_root.map(category => category.name) || [];

    res.json({
      author,
      categories,
      items
    });
  } catch (error) {
    res.status(500).json({ error: 'Error searching for items' });
  }
});

// Endpoint para detalle de un item
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    ]);

    const item = itemResponse.data;
    const description = descriptionResponse.data;

    res.json({
      author,
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: (item.price % 1).toFixed(2).substring(2)
        },
        picture: item.pictures[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.plain_text
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching item details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});