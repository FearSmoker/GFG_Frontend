import React, { useEffect, useState } from "react";
import { fetchEvents, deleteEvent } from "../api/Events_api.js";
import { useNavigate } from "react-router-dom";

const DeleteEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvents = async () => {
      const allEvents = await fetchEvents();
      const formatted = allEvents.map((e) => ({
        id: e._id || e.id,
        title: e.title,
        date: new Date(e.date).toDateString(),
      }));
      setEvents(formatted);
    };

    loadEvents();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    for (const id of selectedIds) {
      await deleteEvent(id);
    }

    const updated = events.filter(e => !selectedIds.includes(e.id));
    setEvents(updated);
    setSelectedIds([]);
    alert("Selected events deleted.");
    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Select Events to Delete</h2>

      <div className="grid gap-4">
        {events.map((event) => (
          <label
            key={event.id}
            className="flex items-center gap-4 bg-[#1f2937] p-4 rounded shadow hover:bg-[#374151] transition"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(event.id)}
              onChange={() => handleCheckboxChange(event.id)}
              className="w-5 h-5"
            />
            <span className="font-medium">{event.title}</span>
            <span className="text-sm text-gray-400">({event.date})</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleDeleteSelected}
        disabled={selectedIds.length === 0}
        className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md text-white font-bold disabled:opacity-50"
      >
        Delete Selected Events
      </button>
    </div>
  );
};

export default DeleteEvents;
