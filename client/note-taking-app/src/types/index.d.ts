export declare interface Category {
    id: number | string;
    name: string;
    color: string;
}

export declare interface Note {
    id: number;
    title: string;
    content: string;
    categoryId: number | string;
}

export declare interface DateEntry {
    date: string;
    title: string;
}


export declare interface NoteCardProps {
    note: Note;
    color: string;
    onEdit: (note: Note) => void;
    onDelete: (id: number) => void;
}

export declare interface MiniCalendarProps {
    dateEntries: DateEntry[];
}

export declare interface FullScreenEditProps {
    note: Note;
    categories: Category[];
    onSave: (note: Note) => void;
    onClose: () => void;
}

export declare interface CategoryDialogProps {
    category?: Category;
    onSave: (category: Category) => void;
    onClose: () => void;
}
