import { useJobs } from "../context/JobContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"];
const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export default function Dashboard() {
  const { jobs } = useJobs();

  const data = STATUSES.map((status) => ({
    name: status,
    value: jobs.filter((job) => job.status === status).length,
  }));

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {data.map((item) => (
          <div key={item.name} className="bg-gray-50 rounded-lg p-4 text-center border">
            <p className="text-2xl font-semibold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.name}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-8">
        <PieChart width={250} height={250}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <BarChart width={350} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </div>
    </div>
  );
}
