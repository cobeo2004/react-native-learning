import { useDeferredValue, useEffect, useState } from "react";
import { Search, Plus, Edit, X, Trash } from "lucide-react";
import { Button } from "./components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./components/ui/dialog";

import { Category, DateEntry, Note } from "./types";
import MiniCalendar from "./components/customs/MiniCalendar";
import NoteCard from "./components/customs/NoteCard";
import FullScreenEdit from "./components/customs/FullScreenEdit";
import CategoryDialog from "./components/customs/CategoryDialog";
import { initialCategories, initialNotes } from "./lib/testData";
import { Input } from "./components/ui/input";

const NoteApp = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all"
  );
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [calendarEntries, setCalendarEntries] = useState<DateEntry[]>([]);
  const [_searchQuery, setSearchQuery] = useState<string>("");
  const searchQuery = useDeferredValue(_searchQuery);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    const updateCalendarEntries = () => {
      const dateRegex = /\[(\d{2}\/\d{2})\]/g;
      const entries = notes.reduce<DateEntry[]>((acc, note) => {
        const matches = [...note.content.matchAll(dateRegex)];
        return [
          ...acc,
          ...matches.map((match) => ({
            date: match[1],
            title: note.title,
          })),
        ];
      }, []);

      // Sort entries by date
      entries.sort((a, b) => {
        const [monthA, dayA] = a.date.split("/").map(Number);
        const [monthB, dayB] = b.date.split("/").map(Number);
        return monthA - monthB || dayA - dayB;
      });

      setCalendarEntries(entries);
    };

    updateCalendarEntries();
  }, [notes]);

  const filteredNotes = notes.filter((note) => {
    const categoryMatch =
      selectedCategory === "all" || note.categoryId === selectedCategory;
    const searchMatch = note.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleSaveNote = (updatedNote: Note) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      categoryId:
        selectedCategory === "all" ? categories[1].id : selectedCategory,
    };
    setNotes([...notes, newNote]);
    setEditingNote(newNote);
    setIsAddingNote(false);
  };

  const handleSaveCategory = (updatedCategory: Category) => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
    } else {
      setCategories([...categories, updatedCategory]);
    }
    setEditingCategory(null);
    setIsAddingCategory(false);
  };

  const handleDeleteCategory = (categoryId: number) => {
    // Move notes from the deleted category to "All"
    setNotes(
      notes.map((note) =>
        note.categoryId === categoryId
          ? { ...note, categoryId: categories[1].id as number }
          : note
      )
    );

    // Remove the category
    setCategories(categories.filter((cat) => cat.id !== categoryId));

    // If the deleted category was selected, switch to "All"
    if (selectedCategory === categoryId) {
      setSelectedCategory("all");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left column - Categories and Mini Calendar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="mt-4 px-5">
          <h1 className="text-xl font-semibold">My Notes</h1>
        </div>
        <nav className="mt-6 flex-grow">
          <ul className="space-y-2 px-4">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`flex items-center justify-between px-0.5 py-0 rounded cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className="flex items-center space-x-2"
                  onClick={() =>
                    setSelectedCategory(category.id as number | "all")
                  }
                >
                  <div
                    className={`w-3 h-3 rounded-full ${category.color}`}
                  ></div>
                  <span className="text-sm">{category.name}</span>
                </div>
                {category.id !== "all" && (
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id as number);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-center">
          <Button
            className="w-50 mt-4"
            onClick={() => setIsAddingCategory(true)}
          >
            <p className="mr-3 mb-1 text-lg">+</p>Add Category
          </Button>
        </div>
        <MiniCalendar dateEntries={calendarEntries} />
      </div>

      {/* Right column - Notes */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 sticky top-0">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h2 className="font-semibold">Notes</h2>
            <div className="flex items-center space-x-2">
              {isSearching ? (
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                    className="mr-2"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSearching(false);
                      setSearchQuery("");
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="bg-green-100 text-green-700"
                    onClick={() => setIsAddingNote(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Note
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearching(true)}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => {
              const category = categories.find(
                (cat) => cat.id === note.categoryId
              );
              return (
                <NoteCard
                  key={note.id}
                  note={note}
                  color={category?.color || "bg-gray-200"}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              );
            })}
          </div>
        </main>
      </div>

      {/* Full-screen note editing */}
      {editingNote && (
        <FullScreenEdit
          note={editingNote}
          categories={categories}
          onSave={handleSaveNote}
          onClose={() => setEditingNote(null)}
        />
      )}

      {/* Category editing/adding dialog */}
      {(editingCategory || isAddingCategory) && (
        <CategoryDialog
          category={editingCategory!}
          onSave={handleSaveCategory}
          onClose={() => {
            setEditingCategory(null);
            setIsAddingCategory(false);
          }}
        />
      )}

      {/* Add note confirmation dialog */}
      {isAddingNote && (
        <Dialog open={true} onOpenChange={() => setIsAddingNote(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
            </DialogHeader>
            <p>Do you want to add a new note to the current category?</p>
            <DialogFooter>
              <Button onClick={handleAddNote}>Yes, Add Note</Button>
              <Button onClick={() => setIsAddingNote(false)} variant="outline">
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NoteApp;
