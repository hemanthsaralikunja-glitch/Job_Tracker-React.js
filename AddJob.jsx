import { useState } from "react";
import { useJobs } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const { addJob } = useJobs();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    notes: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.company || !form.role) return;
    addJob(form);
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mt-6">
      <h2 className="text-xl font-semibold">Add New Job</h2>

      <input
        name="company"
        placeholder="Company name"
        value={form.company}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <input
        name="role"
        placeholder="Job role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <textarea
        name="notes"
        placeholder="Notes..."
        value={form.notes}
        onChange={handleChange}
        className="border p-2 rounded"
        rows={3}
      />

      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add Job
      </button>
    </form>
  );
}
