import React, { useState } from 'react';
import { useSucursales } from '../hooks/useSucursales';
import SucursalForm from '../components/SucursalForm.jsx';
import SucursalCard from '../components/SucursalCard.jsx';
import { Plus, MapPin, AlertCircle, Loader2, Sparkles, TrendingUp, Building } from 'lucide-react';

const SucursalesPage = () => {
  const { sucursales, loading, error, createSucursal, updateSucursal, deleteSucursal } = useSucursales();
  const [showForm, setShowForm] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState(null);

  const handleCreateSucursal = async (sucursalData) => {
    const result = await createSucursal(sucursalData);
    if (result.success) {
      setShowForm(false);
    }
    return result;
  };

  const handleUpdateSucursal = async (sucursalData) => {
    const result = await updateSucursal(editingSucursal._id, sucursalData);
    if (result.success) {
      setEditingSucursal(null);
      setShowForm(false);
    }
    return result;
  };

  const handleEditSucursal = (sucursal) => {
    setEditingSucursal(sucursal);
    setShowForm(true);
  };

  const handleDeleteSucursal = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta sucursal?')) {
      await deleteSucursal(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSucursal(null);
  };

  // Calculate stats
  const totalSucursales = sucursales.length;
  const sucursalesConTelefono = sucursales.filter(sucursal => sucursal.telephone && sucursal.telephone.trim() !== '').length;
  const sucursalesConHorario = sucursales.filter(sucursal => sucursal.schedule && sucursal.schedule.trim() !== '').length;
  const sucursalesCompletas = sucursales.filter(sucursal => 
    sucursal.name && sucursal.address && sucursal.telephone && sucursal.schedule
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-transparent opacity-20 rounded-full translate-y-40 -translate-x-40"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-200 to-transparent opacity-10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          {/* Header background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent opacity-30 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Gestión de Sucursales
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Administra tus sucursales de manera eficiente y moderna</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 font-medium">Sistema inteligente</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 font-medium">Tiempo real</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-3xl flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-semibold text-lg">Nueva Sucursal</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sucursales */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Sucursales</p>
                <p className="text-3xl font-bold text-blue-600">{totalSucursales}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Con Teléfono */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Con Teléfono</p>
                <p className="text-3xl font-bold text-emerald-600">{sucursalesConTelefono}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Con Horario */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Con Horario</p>
                <p className="text-3xl font-bold text-amber-600">{sucursalesConHorario}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-2xl">
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Completas */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Completas</p>
                <p className="text-3xl font-bold text-purple-600">{sucursalesCompletas}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-6 mb-8 rounded-r-2xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800">¡Error en el sistema!</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 flex items-center space-x-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <div>
                <p className="text-lg font-semibold text-gray-800">Cargando sucursales</p>
                <p className="text-gray-600">Preparando tu red de sucursales...</p>
              </div>
            </div>
          </div>
        )}

        {/* Sucursal Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
              <SucursalForm
                sucursal={editingSucursal}
                onSubmit={editingSucursal ? handleUpdateSucursal : handleCreateSucursal}
                onClose={handleCloseForm}
                loading={loading}
              />
            </div>
          </div>
        )}

        {/* Sucursales Grid */}
        {!loading && sucursales.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-50"></div>
            <div className="relative">
              <div className="mb-8">
                <div className="inline-flex p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
                  <Building className="h-16 w-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">¡Tu red de sucursales está vacía!</h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                Comienza agregando tu primera sucursal y expande tu negocio
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto font-semibold"
              >
                <Plus className="h-5 w-5" />
                <span>Agregar Primera Sucursal</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sucursales.map((sucursal) => (
              <SucursalCard
                key={sucursal._id}
                sucursal={sucursal}
                onEdit={handleEditSucursal}
                onDelete={handleDeleteSucursal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SucursalesPage;