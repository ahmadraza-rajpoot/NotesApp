
type NoteProps = {
  title: string;
  description: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function Note({
  title,
  description,
  date,
  onEdit,
  onDelete,
}: NoteProps) {
  return (
    <div className="w-100 rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg transition hover:border-indigo-500/50 hover:shadow-indigo-950/30">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-indigo-300">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-700 pt-4">
        <span className="text-xs font-medium text-slate-400">
          {date}
        </span>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg bg-indigo-500/15 px-3 py-1.5 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/25 hover:text-indigo-200"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-blue-500/15 px-3 py-1.5 text-sm font-medium text-blue-300 transition hover:bg-blue-500/25 hover:text-blue-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
