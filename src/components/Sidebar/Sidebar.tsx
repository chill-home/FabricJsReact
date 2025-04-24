import React from 'react';
import { 
  Type, 
  Square, 
  Circle, 
  Triangle, 
  Image as ImageIcon, 
  Info 
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import { useEditor } from '../../context/EditorContext';

const Sidebar: React.FC = () => {
  const { addShape, addText, addImage } = useEditor();

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          addImage(result);
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const handleAddImage = () => {
    
    const url = prompt('Enter image URL (JPEG/PNG):', 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg');
    if (url) {
      addImage(url);
    }
  };

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center">
      <div className="py-4">
        <Info className="w-6 h-6 text-blue-600" />
      </div>
      
      <div className="flex-1 w-full flex flex-col items-center gap-2 p-2">
        <SidebarItem 
          icon={<Type className="w-6 h-6" />} 
          label="Text" 
          onClick={addText}
        />
        <SidebarItem 
          icon={<Square className="w-6 h-6" />} 
          label="Rectangle" 
          onClick={() => addShape('rect')}
        />
        <SidebarItem 
          icon={<Circle className="w-6 h-6" />} 
          label="Circle" 
          onClick={() => addShape('circle')}
        />
        <SidebarItem 
          icon={<Triangle className="w-6 h-6" />} 
          label="Triangle" 
          onClick={() => addShape('triangle')}
        />
        <SidebarItem 
          icon={<ImageIcon className="w-6 h-6" />} 
          label="Image" 
          onClick={handleAddImage}
        />
      </div>
    </div>
  );
};

export default Sidebar;