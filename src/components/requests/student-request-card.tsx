import { Send } from 'lucide-react';

export default function StudentRequestCard({ num }: { num: number }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm flex items-center space-x-3">
      <Send className="text-green-600 w-6 h-6" />
      <div>
        <p className="text-lg font-bold">{num}</p>
        <p className="text-sm text-gray-500">Requests from Tutors</p>
      </div>
    </div>
  );
}
