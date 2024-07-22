import { Calendar } from "lucide-react";
import { MiniCalendarProps } from "../../types";
import React from "react";

const MiniCalendar: React.FC<MiniCalendarProps> = ({ dateEntries }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow overflow-auto max-h-48">
      <h3 className="font-semibold mb-2 flex items-center">
        <Calendar className="mr-2 h-4 w-4" />
        Upcoming Dates
      </h3>
      <ul className="space-y-2">
        {dateEntries.map((entry, index) => (
          <li key={index} className="text-md">
            <span className="font-bold text-md">{entry.date}</span>:{" "}
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCalendar;
