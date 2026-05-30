import { useJobs } from "../context/JobContext";

export default function JobCard({ job }) {
  const { updateStatus, deleteJob } = useJobs();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-sm text-gray-800">{job.role}</p>
          <p className="text-xs text-gray-500 mt-1">{job.company}</p>
        </div>
        <button
          onClick={() => deleteJob(job.id)}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
      <div className="flex items-center justify-between gap-3">
        <select
          value={job.status}
          onChange={(e) => updateStatus(job.id, e.target.value)}
          className="border p-2 rounded text-sm"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        {job.date && <span className="text-xs text-gray-400">{job.date}</span>}
      </div>
    </div>
  );
}
