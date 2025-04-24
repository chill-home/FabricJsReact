import React, { useState } from 'react';
import { Save, Download } from 'lucide-react';
import { EditorProvider } from './context/EditorContext';
import Canvas from './components/Canvas/Canvas';
import Sidebar from './components/Sidebar/Sidebar';
import ZoomControls from './components/Controls/ZoomControls';
import UndoRedoControls from './components/Controls/UndoRedoControls';
import Modal from './components/Modal/Modal';
import { useEditor } from './context/EditorContext';

const Toolbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [svgCode, setSvgCode] = useState('');
  const { zoom, setZoom, undo, redo, canUndo, canRedo, saveAsSvg } = useEditor();

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  const handleSave = () => {
    const svg = saveAsSvg();
    setSvgCode(svg);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4">
        <div className="flex-1 text-xl font-semibold text-gray-800">Design Editor</div>
        
        <div className="flex items-center space-x-6">
          <UndoRedoControls 
            onUndo={undo} 
            onRedo={redo} 
            canUndo={canUndo} 
            canRedo={canRedo} 
          />
          
          <ZoomControls 
            zoom={zoom} 
            onZoomIn={handleZoomIn} 
            onZoomOut={handleZoomOut} 
            onZoomReset={handleZoomReset} 
          />
          
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="SVG Code"
      >
        <div className="flex flex-col">
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 overflow-auto max-h-96">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-all">
                {svgCode}
              </pre>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => {
                const blob = new Blob([svgCode], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'design.svg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download SVG</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Canvas />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <EditorProvider>
      <AppContent />
    </EditorProvider>
  );
};

export default App;