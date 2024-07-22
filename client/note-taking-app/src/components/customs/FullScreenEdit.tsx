import React, { useState } from "react";
import { FullScreenEditProps } from "../../types";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Textarea } from "../ui/textarea";

const FullScreenEdit: React.FC<FullScreenEditProps> = ({
  note,
  categories,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [categoryId, setCategoryId] = useState(note.categoryId);

  const handleSave = () => {
    onSave({ ...note, title, content, categoryId });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <header className="bg-gray-100 p-4 flex justify-between items-center">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold w-1/3"
        />
        <div className="flex items-center space-x-2">
          <Select
            value={categoryId.toString()}
            onValueChange={(value) => setCategoryId(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={onClose} variant="outline">
            <X className="h-4 w-4 mr-2" /> Close
          </Button>
        </div>
      </header>
      <Textarea
        className="flex-grow resize-none p-4 text-lg"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note here..."
      />
    </div>
  );
};

export default FullScreenEdit;
