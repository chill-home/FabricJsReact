export interface HistoryState {
  canvas: fabric.Canvas | null;
  states: string[];
  currentStateIndex: number;
  maxStates: number;
}

export interface EditorContextType {
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas | null) => void;
  selectedElement: fabric.Object | null;
  setSelectedElement: (element: fabric.Object | null) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  addShape: (type: string) => void;
  addText: () => void;
  addImage: (url: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  saveAsSvg: () => string;
}

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export interface UndoRedoControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}