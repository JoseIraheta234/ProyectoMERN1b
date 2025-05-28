// hooks/useProducts.js
import { useState, useEffect } from 'react';
import ProductsAPI from '../services/productsAPI';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductsAPI.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear producto
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      await ProductsAPI.createProduct(productData);
      await fetchProducts(); // Recargar lista
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      await ProductsAPI.updateProduct(id, productData);
      await fetchProducts(); // Recargar lista
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await ProductsAPI.deleteProduct(id);
      await fetchProducts(); // Recargar lista
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts
  };
};