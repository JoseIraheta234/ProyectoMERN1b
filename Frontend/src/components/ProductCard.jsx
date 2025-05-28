import React from 'react';
import { Edit2, Trash2, Package, DollarSign, Archive, TrendingUp, AlertTriangle } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { 
      color: 'bg-gradient-to-r from-red-500 to-red-600 text-white', 
      text: 'Agotado',
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    };
    if (stock <= 10) return { 
      color: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white', 
      text: 'Stock Bajo',
      icon: AlertTriangle,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    };
    return { 
      color: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white', 
      text: 'Disponible',
      icon: TrendingUp,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    };
  };

  const stockStatus = getStockStatus(product.stock);
  const StockIcon = stockStatus.icon;

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header with dynamic gradient */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-2xl border border-white border-opacity-30">
              <Package className="h-7 w-7 text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className={`px-4 py-2 rounded-2xl text-sm font-bold shadow-lg ${stockStatus.color} flex items-center space-x-2`}>
            <StockIcon className="h-4 w-4" />
            <span>{stockStatus.text}</span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white from-10% to-transparent opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400 from-10% to-transparent opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Product Name with gradient text */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent line-clamp-2 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
            {product.name}
          </h3>
          
          {/* Category badge (if you want to add categories later) */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Producto</span>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="relative">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">
              {product.description}
            </p>
            <div className="absolute bottom-0 right-0 w-8 h-4 bg-gradient-to-l from-white to-transparent"></div>
          </div>
        )}

        {/* Price and Stock Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Price Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100 group-hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1.5 bg-emerald-500 rounded-lg">
                <DollarSign className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Precio</span>
            </div>
            <p className="text-lg font-bold text-emerald-700">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Stock Card */}
          <div className={`rounded-2xl p-4 border transition-all duration-300 group-hover:shadow-md ${stockStatus.bgColor} border-opacity-50`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`p-1.5 rounded-lg ${stockStatus.textColor.replace('text-', 'bg-')}`}>
                <Archive className="h-3 w-3 text-white" />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wide ${stockStatus.textColor}`}>Stock</span>
            </div>
            <p className={`text-lg font-bold ${stockStatus.textColor}`}>
              {product.stock} unid.
            </p>
          </div>
        </div>

        {/* Timestamps */}
        {product.createdAt && (
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Creado:</span>
                <span>{formatDate(product.createdAt)}</span>
              </div>
              {product.updatedAt && product.updatedAt !== product.createdAt && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Actualizado:</span>
                  <span>{formatDate(product.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={() => onEdit(product)}
            className="group/btn flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Edit2 className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-200" />
            <span className="text-sm font-semibold">Editar</span>
          </button>
          
          <button
            onClick={() => onDelete(product._id)}
            className="group/btn flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
            <span className="text-sm font-semibold">Eliminar</span>
          </button>
        </div>
      </div>

      {/* Floating action indicator */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
    </div>
  );
};

export default ProductCard;