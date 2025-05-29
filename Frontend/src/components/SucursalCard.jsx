import React from 'react';
import { Edit2, Trash2, Building, MapPin, Phone, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const SucursalCard = ({ sucursal, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCompletionStatus = (sucursal) => {
    const requiredFields = ['name', 'address', 'telephone', 'schedule'];
    const completedFields = requiredFields.filter(field => 
      sucursal[field] && sucursal[field].trim() !== ''
    ).length;
    
    const percentage = (completedFields / requiredFields.length) * 100;
    
    if (percentage === 100) return { 
      color: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white', 
      text: 'Completa',
      icon: TrendingUp,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      percentage: 100
    };
    if (percentage >= 75) return { 
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white', 
      text: 'Casi Lista',
      icon: Building,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      percentage
    };
    if (percentage >= 50) return { 
      color: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white', 
      text: 'En Progreso',
      icon: AlertTriangle,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      percentage
    };
    return { 
      color: 'bg-gradient-to-r from-red-500 to-red-600 text-white', 
      text: 'Incompleta',
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      percentage
    };
  };

  const completionStatus = getCompletionStatus(sucursal);
  const StatusIcon = completionStatus.icon;

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header with dynamic gradient */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-2xl border border-white border-opacity-30">
              <Building className="h-7 w-7 text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className={`px-4 py-2 rounded-2xl text-sm font-bold shadow-lg ${completionStatus.color} flex items-center space-x-2`}>
            <StatusIcon className="h-4 w-4" />
            <span>{completionStatus.text}</span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white from-10% to-transparent opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400 from-10% to-transparent opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Sucursal Name with gradient text */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent line-clamp-2 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
            {sucursal.name}
          </h3>
          
          {/* Category badge */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Sucursal</span>
          </div>
        </div>

        {/* Address */}
        {sucursal.address && (
          <div className="relative">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-1.5 bg-blue-500 rounded-lg mt-0.5">
                <MapPin className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block mb-1">Dirección</span>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                  {sucursal.address}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 gap-3">
          {/* Phone Card */}
          {sucursal.telephone && (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100 group-hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-1.5 bg-emerald-500 rounded-lg">
                  <Phone className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Teléfono</span>
              </div>
              <p className="text-sm font-bold text-emerald-700">
                {sucursal.telephone}
              </p>
            </div>
          )}

          {/* Schedule Card */}
          {sucursal.schedule && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 group-hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-1.5 bg-purple-500 rounded-lg">
                  <Clock className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Horario</span>
              </div>
              <p className="text-sm font-bold text-purple-700 line-clamp-2">
                {sucursal.schedule}
              </p>
            </div>
          )}
        </div>

        {/* Completion Progress Bar */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-600">Información Completa</span>
            <span className="text-xs font-bold text-gray-800">{Math.round(completionStatus.percentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                completionStatus.percentage === 100 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                completionStatus.percentage >= 75 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                completionStatus.percentage >= 50 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              style={{ width: `${completionStatus.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Timestamps */}
        {sucursal.createdAt && (
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Creada:</span>
                <span>{formatDate(sucursal.createdAt)}</span>
              </div>
              {sucursal.updatedAt && sucursal.updatedAt !== sucursal.createdAt && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Actualizada:</span>
                  <span>{formatDate(sucursal.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={() => onEdit(sucursal)}
            className="group/btn flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Edit2 className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-200" />
            <span className="text-sm font-semibold">Editar</span>
          </button>
          
          <button
            onClick={() => onDelete(sucursal._id)}
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

export default SucursalCard;