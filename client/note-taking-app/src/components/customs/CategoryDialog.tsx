import React, { useState } from "react";
import { CategoryDialogProps } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  category,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(category ? category.name : "");
  const [color, setColor] = useState(category ? category.color : "bg-gray-200");

  const handleSave = () => {
    onSave({ id: category ? category.id : Date.now(), name, color });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
          />
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bg-red-200">Red</SelectItem>
              <SelectItem value="bg-blue-200">Blue</SelectItem>
              <SelectItem value="bg-green-200">Green</SelectItem>
              <SelectItem value="bg-yellow-200">Yellow</SelectItem>
              <SelectItem value="bg-purple-200">Purple</SelectItem>
              <SelectItem value="bg-pink-200">Pink</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
