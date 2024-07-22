import { Category, Note } from "../types";

const initialCategories: Category[] = [
  { id: "all", name: "All", color: "bg-gray-200" },
  { id: 1, name: "Category 1", color: "bg-red-200" },
  { id: 2, name: "Category 2", color: "bg-blue-200" },
  { id: 3, name: "Category 3", color: "bg-green-200" },
  { id: 4, name: "Category 4", color: "bg-yellow-200" },
  { id: 5, name: "Category 5", color: "bg-purple-200" },
  { id: 6, name: "Category 6", color: "bg-pink-200" },
];

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Note 1",
    content: "This is the content of Note 1.",
    categoryId: 1,
  },
  {
    id: 2,
    title: "Note 2",
    content: "Content for Note 2 goes here.",
    categoryId: 1,
  },
  {
    id: 3,
    title: "Note 3",
    content: "Note 3 has some interesting information.",
    categoryId: 2,
  },
  {
    id: 4,
    title: "Note 4",
    content: "Here's what Note 4 is all about.",
    categoryId: 2,
  },
  {
    id: 5,
    title: "Note 5",
    content: "Note 5 contains important details.",
    categoryId: 3,
  },
  {
    id: 6,
    title: "Note 6",
    content: "The content of Note 6 is quite extensive.",
    categoryId: 4,
  },
];

export { initialCategories, initialNotes };
