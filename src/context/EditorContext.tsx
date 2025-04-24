import React, { createContext, useState, useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { EditorContextType } from '../types';
import { useHistory } from '../hooks/useHistory';

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedElement, setSelectedElement] = useState<fabric.Object | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  
  const { states, currentStateIndex, saveState, undo, redo } = useHistory();
  
  const canUndo = currentStateIndex > 0;
  const canRedo = currentStateIndex < states.length - 1;

  useEffect(() => {
    if (canvas) {
      canvas.on('object:modified', () => {
        saveState(canvas);
      });
      
      canvas.on('object:added', () => {
        saveState(canvas);
      });
      
      canvas.on('selection:created', (e) => {
        setSelectedElement(e.selected?.[0] || null);
      });
      
      canvas.on('selection:updated', (e) => {
        setSelectedElement(e.selected?.[0] || null);
      });
      
      canvas.on('selection:cleared', () => {
        setSelectedElement(null);
      });

      
      canvas.on('object:moved', () => {
        saveState(canvas);
      });
      
      
      saveState(canvas);
    }
    
    return () => {
      if (canvas) {
        canvas.off();
      }
    };
  }, [canvas, saveState]);

  const addShape = (type: string) => {
    if (!canvas || !canvas.contextContainer) {
      console.warn('Canvas or canvas context not ready');
      return;
    }
    
    let shape: fabric.Object;
    
    switch (type) {
      case 'rect':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: '#f0f0f0',
          stroke: '#333333',
          width: 100,
          height: 100,
          strokeWidth: 2,
          hasControls: true, 
          hasBorders: true, 
          selectable: true, 
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          fill: '#f0f0f0',
          stroke: '#333333',
          radius: 50,
          strokeWidth: 2,
          hasControls: true,
          hasBorders: true,
          selectable: true,
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          left: 100,
          top: 100,
          fill: '#f0f0f0',
          stroke: '#333333',
          width: 100,
          height: 100,
          strokeWidth: 2,
          hasControls: true,
          hasBorders: true,
          selectable: true,
        });
        break;
      default:
        return;
    }
    
    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
  };

  const addText = () => {
    if (!canvas || !canvas.contextContainer) {
      console.warn('Canvas or canvas context not ready');
      return;
    }
    
    const text = new fabric.Textbox('Double-click to edit', {
      left: 100,
      top: 100,
      fontFamily: 'sans-serif',
      fill: '#333333',
      fontSize: 20,
      width: 200,
      hasControls: true,
      hasBorders: true,
      selectable: true,
      editable: true,
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const addImage = async (url: string) => {
    if (!canvas || !canvas.contextContainer) {
      console.warn('Canvas or canvas context not ready');
      return;
    }
    
    try {
      fabric.Image.fromURL(url, (img) => {
        
        const maxSize = 300;
        if (img.width && img.height) {
          if (img.width > maxSize || img.height > maxSize) {
            const scale = Math.min(maxSize / img.width, maxSize / img.height);
            img.scale(scale);
          }
        }
        
        
        img.set({
          hasControls: true,
          hasBorders: true,
          selectable: true,
        });
        
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  const saveAsSvg = (): string => {
    if (!canvas || !canvas.contextContainer) {
      console.warn('Canvas or canvas context not ready');
      return '';
    }
    return canvas.toSVG();
  };
  
  const handleUndo = () => {
    if (canvas && canUndo) {
      undo(canvas);
    }
  };
  
  const handleRedo = () => {
    if (canvas && canRedo) {
      redo(canvas);
    }
  };

  const value = {
    canvas,
    setCanvas,
    selectedElement,
    setSelectedElement,
    zoom,
    setZoom,
    addShape,
    addText,
    addImage,
    undo: handleUndo,
    redo: handleRedo,
    canUndo,
    canRedo,
    saveAsSvg,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};