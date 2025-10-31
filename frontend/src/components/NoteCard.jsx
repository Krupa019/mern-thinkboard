import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note,setNotes}) => {  
const handleDelete = async(e,id)=>{
  e.preventDefault();

  if(!window.confirm("Are you  sure want to delete this Note?"))return;

  try {
    await api.delete(`/notes/${id}`)
    setNotes((prev) => prev.filter((note) => note._id !== id));
    toast.success("Note deleted successfully")
  } catch (error) {
    console.log("Error in deleting Note",error);
    toast.error("Failed to delete note")
  }
}

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#2654a4]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-2">
            <Link to={`/note/${note._id}`} className="btn btn-ghost btn-xs text-primary">
              <PenSquareIcon className="size-4" />
            </Link>
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
