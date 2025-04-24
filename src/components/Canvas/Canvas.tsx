import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useEditor } from '../../context/EditorContext';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const { setCanvas, zoom, canvas } = useEditor();

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || canvas) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      selection: true,
      selectionColor: 'rgba(100, 100, 255, 0.3)',
      selectionBorderColor: 'rgba(100, 100, 255, 0.5)',
      selectionLineWidth: 1,
      centeredScaling: true,
      uniformScaling: true,
      stopContextMenu: true,
      fireRightClick: true,
      targetFindTolerance: 4
    });

    // Set up event handlers
    const setupEventHandlers = (canvas: fabric.Canvas) => {
      canvas.on('object:moving', (e) => {
        const obj = e.target;
        if (!obj) return;

        const bound = obj.getBoundingRect(true, true);
        const padding = 1;
        
        if (bound.left < padding) {
          obj.left = obj.left - bound.left + padding;
        }
        if (bound.top < padding) {
          obj.top = obj.top - bound.top + padding;
        }
        if (bound.left + bound.width > canvas.width! - padding) {
          obj.left = canvas.width! - bound.width - padding;
        }
        if (bound.top + bound.height > canvas.height! - padding) {
          obj.top = canvas.height! - bound.height - padding;
        }

        canvas.setCursor('move');
      });

      canvas.on('mouse:up', () => {
        canvas.setCursor('default');
      });

      canvas.on('mouse:down', (e) => {
        if (e.target) {
          e.target.bringToFront();
          canvas.setCursor('move');
        }
      });

      canvas.on('mouse:over', (e) => {
        if (e.target) {
          e.target.set('hoverCursor', 'move');
        }
      });
    };

    setupEventHandlers(fabricCanvas);
    setCanvas(fabricCanvas);

    // Only clean up when component unmounts
    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
        setCanvas(null);
      }
    };
  }, []);

  // Handle zoom changes
  useEffect(() => {
    if (!canvas?.contextContainer) return;
    
    canvas.setZoom(zoom);
    canvas.renderAll();
  }, [zoom, canvas]);

  // Handle window resize
  useEffect(() => {
    if (!canvas?.contextContainer) return;

    const handleResize = () => {
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvas]);

  return (
    <div 
      ref={canvasContainerRef}
      className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center"
      style={{ minHeight: '400px' }}
    >
      <div 
        className="relative bg-white shadow-lg transform-gpu"
        style={{ 
          transform: `scale(${zoom})`,
          transformOrigin: 'center',
          transition: 'transform 0.2s ease-out',
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default CanvasComponent;