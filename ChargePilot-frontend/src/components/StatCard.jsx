export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6
      hover:-translate-y-1 transition-all">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">
        {value}
      </p>
    </div>
  );
}
