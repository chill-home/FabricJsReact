import { useCallback, useState } from 'react';
import { fabric } from 'fabric';

export const useHistory = (maxStates = 30) => {
  const [states, setStates] = useState<string[]>([]);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(-1);

  const saveState = useCallback((canvas: fabric.Canvas) => {
    if (!canvas) return;

    
    const json = JSON.stringify(canvas.toJSON(['id']));
    
    
    if (currentStateIndex < states.length - 1) {
      setStates(prev => prev.slice(0, currentStateIndex + 1));
    }
    
    
    setStates(prev => {
      const newStates = [...prev, json];
      
      if (newStates.length > maxStates) {
        return newStates.slice(newStates.length - maxStates);
      }
      return newStates;
    });
    
    setCurrentStateIndex(prev => {
      const newIndex = prev + 1;
      
      if (newIndex >= maxStates && states.length >= maxStates) {
        return maxStates - 1;
      }
      return newIndex;
    });
  }, [currentStateIndex, states, maxStates]);

  const undo = useCallback((canvas: fabric.Canvas) => {
    if (currentStateIndex <= 0 || !canvas) return;

    const newIndex = currentStateIndex - 1;
    const stateToRestore = states[newIndex];
    
    canvas.loadFromJSON(JSON.parse(stateToRestore), () => {
      canvas.renderAll();
      setCurrentStateIndex(newIndex);
    });
  }, [currentStateIndex, states]);

  const redo = useCallback((canvas: fabric.Canvas) => {
    if (currentStateIndex >= states.length - 1 || !canvas) return;

    const newIndex = currentStateIndex + 1;
    const stateToRestore = states[newIndex];
    
    canvas.loadFromJSON(JSON.parse(stateToRestore), () => {
      canvas.renderAll();
      setCurrentStateIndex(newIndex);
    });
  }, [currentStateIndex, states]);

  return {
    states,
    currentStateIndex,
    saveState,
    undo,
    redo
  };
};