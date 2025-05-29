import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, Tag, FileText, Eye, EyeOff, Image, Upload, Link } from 'lucide-react';

const CategoriasForm = ({ category, onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        status: category.status || 'active',
        image: category.image || ''
      });
      setImagePreview(category.image || '');
    }
  }, [category]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres';
    }

    if (!formData.status) {
      newErrors.status = 'El estado es requerido';
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

  const handleImageSelect = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
    setImagePreview(imageUrl);
    setShowImageMenu(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí llamarías a tu método que convierte imágenes a enlace
      // Por ahora simulo el proceso
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        handleImageSelect(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlInput = () => {
    const url = prompt('Ingresa la URL de la imagen:');
    if (url && url.trim()) {
      handleImageSelect(url.trim());
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
    setImagePreview('');
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

  const statusOptions = [
    { value: 'active', label: 'Activa', icon: Eye, color: 'text-green-600' },
    { value: 'inactive', label: 'Inactiva', icon: EyeOff, color: 'text-red-600' }
  ];

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
              <Tag className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {category ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
              <p className="text-gray-600 mt-1">
                {category ? 'Actualiza la información de la categoría' : 'Completa los datos de la nueva categoría'}
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
              <span className="text-sm font-semibold text-gray-700">Nombre de la Categoría *</span>
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
                placeholder="Ej: Tecnología, Deportes, Alimentación"
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

          {/* Description Field */}
          <div className="group">
            <label htmlFor="description" className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Descripción</span>
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-500 focus:ring-opacity-20 focus:border-green-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none ${
                  errors.description ? 'border-red-400 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Describe brevemente esta categoría y su propósito..."
              />
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-2xl transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ${errors.description ? 'from-red-500 to-pink-500' : ''}`}></div>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>Opcional - Ayuda a los usuarios a entender mejor la categoría</span>
              <span>{formData.description.length}/500</span>
            </div>
            {errors.description && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>{errors.description}</span>
                </p>
              </div>
            )}
          </div>

          {/* Status Field */}
          <div className="group">
            <label htmlFor="status" className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Eye className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Estado *</span>
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-20 focus:border-emerald-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer ${
                  errors.status ? 'border-red-400 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {statusOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-b-2xl transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ${errors.status ? 'from-red-500 to-pink-500' : ''}`}></div>
            </div>
            {errors.status && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>{errors.status}</span>
                </p>
              </div>
            )}
          </div>

          {/* Image Field */}
          <div className="group">
            <label className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Image className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Imagen de la Categoría</span>
            </label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-4 relative">
                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Vista previa:</span>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <img 
                    src={imagePreview} 
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border-2 border-white shadow-sm"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Image Selection Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowImageMenu(!showImageMenu)}
                className="w-full px-6 py-4 border-2 border-gray-200 hover:border-purple-300 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 bg-white shadow-sm hover:shadow-md group"
              >
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Upload className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-medium text-gray-700">
                  {imagePreview ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                </span>
              </button>

              {/* Image Menu */}
              {showImageMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-10 overflow-hidden">
                  <div className="p-2">
                    {/* Upload from device */}
                    <label className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Upload className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Subir desde dispositivo</p>
                        <p className="text-xs text-gray-500">JPG, PNG o GIF (máx. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    {/* URL input */}
                    <button
                      type="button"
                      onClick={handleImageUrlInput}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                        <Link className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-700">Usar URL de imagen</p>
                        <p className="text-xs text-gray-500">Pegar enlace de imagen externa</p>
                      </div>
                    </button>
                  </div>
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
                  <span>{category ? 'Actualizar' : 'Crear'} Categoría</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar el menú de imagen */}
      {showImageMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowImageMenu(false)}
        />
      )}
    </div>
  );
};

export default CategoriasForm;