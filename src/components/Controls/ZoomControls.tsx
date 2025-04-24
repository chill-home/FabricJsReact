import React from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { ZoomControlsProps } from '../../types';

const ZoomControls: React.FC<ZoomControlsProps> = ({ 
  zoom, 
  onZoomIn, 
  onZoomOut, 
  onZoomReset 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onZoomOut}
        className="p-1 text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>
      
      <div className="text-sm text-gray-700 font-medium min-w-14 text-center">
        {Math.round(zoom * 100)}%
      </div>
      
      <button
        onClick={onZoomIn}
        className="p-1 text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      
      <button
        onClick={onZoomReset}
        className="p-1 text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Reset Zoom"
      >
        <Maximize className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ZoomControls;