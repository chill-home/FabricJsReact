import React from 'react';
import { Undo2, Redo2 } from 'lucide-react';
import { UndoRedoControlsProps } from '../../types';

const UndoRedoControls: React.FC<UndoRedoControlsProps> = ({ 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`p-1 rounded transition-colors ${
          canUndo 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title="Undo"
      >
        <Undo2 className="w-5 h-5" />
      </button>
      
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`p-1 rounded transition-colors ${
          canRedo 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title="Redo"
      >
        <Redo2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UndoRedoControls;