// hooks/useSucursales.js
import { useState, useEffect, useCallback } from 'react';
import SucursalesAPI from '../services/sucursalesAPI';

export const useSucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar sucursales
  const fetchSucursales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await SucursalesAPI.getSucursales();
      setSucursales(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al cargar sucursales:', err);
      setError(err.message || 'Error al cargar sucursales');
      setSucursales([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear sucursal
  const createSucursal = async (sucursalData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await SucursalesAPI.createSucursal(sucursalData);
      console.log('Sucursal creada:', response);
      await fetchSucursales(); // Recargar lista
      return { success: true, data: response };
    } catch (err) {
      console.error('Error al crear sucursal:', err);
      const errorMessage = err.message || 'Error al crear sucursal';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar sucursal
  const updateSucursal = async (id, sucursalData) => {
    if (!id) {
      const errorMessage = 'ID de la sucursal es requerido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    try {
      const response = await SucursalesAPI.updateSucursal(id, sucursalData);
      console.log('Sucursal actualizada:', response);
      await fetchSucursales(); // Recargar lista
      return { success: true, data: response };
    } catch (err) {
      console.error('Error al actualizar sucursal:', err);
      const errorMessage = err.message || 'Error al actualizar sucursal';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar sucursal
  const deleteSucursal = async (id) => {
    if (!id) {
      const errorMessage = 'ID de la sucursal es requerido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    try {
      const response = await SucursalesAPI.deleteSucursal(id);
      console.log('Sucursal eliminada:', response);
      await fetchSucursales(); // Recargar lista
      return { success: true, data: response };
    } catch (err) {
      console.error('Error al eliminar sucursal:', err);
      const errorMessage = err.message || 'Error al eliminar sucursal';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Efecto para cargar sucursales al montar el componente
  useEffect(() => {
    fetchSucursales();
  }, [fetchSucursales]);

  return {
    sucursales,
    loading,
    error,
    createSucursal,
    updateSucursal,
    deleteSucursal,
    refreshSucursales: fetchSucursales,
    clearError
  };
};