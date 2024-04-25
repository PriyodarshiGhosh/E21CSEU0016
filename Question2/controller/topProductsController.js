import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { top, minPrice, maxPrice, page, sortBy } = req.query;
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(400).json({ error: 'Bearer token is required.' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/:companyname/categories/${categoryname}/products`, {
      headers: {
        Authorization: `${token}`,
      },
      params: {
        top,
        minPrice,
        maxPrice,
        page,
        sortBy,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top products.' });
  }
});

router.get('/categories/:categoryname/products/:productid', async (req, res) => {
  const { categoryname, productid } = req.params;
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(400).json({ error: 'Bearer token is required.' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/:companyname/categories/${categoryname}/products/${productid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details.' });
  }
});

export default router;
