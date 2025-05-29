import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, Building, MapPin, Phone, Clock, FileText } from 'lucide-react';

const SucursalForm = ({ sucursal, onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    telephone: '',
    schedule: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sucursal) {
      setFormData({
        name: sucursal.name || '',
        address: sucursal.address || '',
        telephone: sucursal.telephone || '',
        schedule: sucursal.schedule || ''
      });
    }
  }, [sucursal]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (formData.address && formData.address.length > 200) {
      newErrors.address = 'La dirección no puede exceder 200 caracteres';
    }

    if (formData.telephone && !/^[\d\s\-\+\(\)]+$/.test(formData.telephone)) {
      newErrors.telephone = 'El teléfono solo puede contener números, espacios y los caracteres: - + ( )';
    }

    if (formData.schedule && formData.schedule.length > 100) {
      newErrors.schedule = 'El horario no puede exceder 100 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await onSubmit(formData);
    if (!result.success && result.error) {
      setErrors({ submit: result.error });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent opacity-30 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100 to-transparent opacity-30 rounded-full translate-y-24 -translate-x-24"></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Building className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {sucursal ? 'Editar Sucursal' : 'Nueva Sucursal'}
              </h2>
              <p className="text-gray-600 mt-1">
                {sucursal ? 'Actualiza la información de la sucursal' : 'Completa los datos de la nueva sucursal'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-200 text-gray-400 hover:shadow-lg group"
          >
            <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name Field */}
          <div className="group">
            <label htmlFor="name" className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Nombre de la Sucursal *</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md ${
                  errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Ej: Sucursal Centro Comercial"
              />
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-2xl transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ${errors.name ? 'from-red-500 to-pink-500' : ''}`}></div>
            </div>
            {errors.name && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>{errors.name}</span>
                </p>
              </div>
            )}
          </div>

          {/* Address Field */}
          <div className="group">
            <label htmlFor="address" className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Dirección</span>
            </label>
            <div className="relative">
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                maxLength={200}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-500 focus:ring-opacity-20 focus:border-green-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none ${
                  errors.address ? 'border-red-400 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Ej: Avenida Principal #123, Centro Comercial Plaza Norte, Local 45"
              />
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-2xl transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ${errors.address ? 'from-red-500 to-pink-500' : ''}`}></div>
            </div>
            {errors.address && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>{errors.address}</span>
                </p>
              </div>
            )}
          </div>

          {/* Phone and Schedule Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Field */}
            <div className="group">
              <label htmlFor="telephone" className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Phone className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Teléfono</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-20 focus:border-emerald-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md ${
                    errors.telephone ? 'border-red-400 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Ej: +503 2234-5678"
                />
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-b-2xl transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ${errors.telephone ? 'from-red-500 to-pink-500' : ''}`}></div>
              </div>
              {errors.telephone && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600 flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>{errors.telephone}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Schedule Field */}
            <div className="group">
              <label htmlFor="schedule" className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Horario</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  maxLength={100}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:ring-opacity-20 focus:border-purple-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md ${
                    errors.schedule ? 'border-red-400 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Ej: Lun-Vie: 8:00-18:00, Sáb: 9:00-17:00"
                />
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-2xl transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ${errors.schedule ? 'from-red-500 to-pink-500' : ''}`}></div>
              </div>
              {errors.schedule && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600 flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>{errors.schedule}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <X className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">¡Ups! Algo salió mal</h4>
                  <p className="text-red-700 text-sm mt-1">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold hover:shadow-lg"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>{sucursal ? 'Actualizar' : 'Crear'} Sucursal</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SucursalForm;