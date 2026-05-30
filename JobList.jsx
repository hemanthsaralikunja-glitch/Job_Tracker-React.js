import JobCard from "./JobCard";
import { useJobs } from "../context/JobContext";
import { useState } from "react";

export default function JobList() {
  const { jobs } = useJobs();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = (jobs || []).filter((j) => {
    const company = (j.company || "").toString();
    const matchSearch = company.toLowerCase().includes(search.trim().toLowerCase());
    const matchFilter = filter === "All" || j.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="jobs-section">
      <div className="jobs-header">
        <h2 className="jobs-title">Recent applications</h2>
        <div className="search-bar">
          <input
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* THIS is where JobCard renders */}
      <div className="cards-grid">
        {filtered.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No jobs found. Add one!</p>
        ) : (
          filtered.map((job) =>
            <JobCard key={job.id} job={job} />
          )
        )}
      </div>
    </div>
  );
}