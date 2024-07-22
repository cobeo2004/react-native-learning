import { MoreVertical, Trash } from "lucide-react";
import { NoteCardProps } from "../../types";
import { Button } from "../ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  color,
  onEdit,
  onDelete,
}) => {
  const handleEdit: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-sm ${color} flex flex-col h-48 cursor-pointer`}
      onClick={handleEdit}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm">{note.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm line-clamp-5 flex-grow">{note.content}</p>
    </div>
  );
};

export default NoteCard;
