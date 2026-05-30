import { useJobs } from "../context/JobContext";

const COLUMNS = ["Applied", "Interview", "Offer", "Rejected"];

const colColors = {
  Applied: "border-t-blue-500",
  Interview: "border-t-yellow-500",
  Offer: "border-t-green-500",
  Rejected: "border-t-red-500",
};

const badgeColors = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function KanbanBoard() {
  const { jobs, updateStatus, deleteJob } = useJobs();

  function handleDrop(e, newStatus) {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("jobId"));
    updateStatus(id, newStatus);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(e, id) {
    e.dataTransfer.setData("jobId", id);
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Kanban Board</h2>
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colJobs = jobs.filter((job) => job.status === col);

          return (
            <div
              key={col}
              onDrop={(e) => handleDrop(e, col)}
              onDragOver={handleDragOver}
              className={`bg-gray-50 rounded-xl p-3 min-h-[400px] border-t-4 ${colColors[col]}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-gray-700">{col}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColors[col]}`}>
                  {colJobs.length}
                </span>
              </div>

              {colJobs.length === 0 ? (
                <p className="text-xs text-gray-400 text-center mt-8">Drop cards here</p>
              ) : (
                colJobs.map((job) => (
                  <div
                    key={job.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job.id)}
                    className="bg-white border border-gray-200 rounded-lg p-3 mb-2 cursor-grab active:cursor-grabbing active:opacity-60"
                  >
                    <p className="font-medium text-sm text-gray-800">{job.role}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{job.company}</p>
                    {job.date && <p className="text-xs text-gray-400 mt-1">{job.date}</p>}
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="text-xs text-red-400 hover:text-red-600 mt-2"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
