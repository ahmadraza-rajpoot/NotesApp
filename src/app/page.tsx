'use client'

import { useEffect, useState } from "react";
import Note from "./components/Note";

export default function Home() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async(e:React.ChangeEvent)=>{
    e.preventDefault()
    
    if(!title || !description){
      alert("Please enter title and description");
      return;
    }


    try {

      setIsLoading(true)

      if(editingId !== null){
        console.log("work")
        const res = await fetch(`/api/notes/${editingId}`,{
          method:"PUT",
          headers:{
            "content-type":"application/json",
            
          },
          body:JSON.stringify({title, description})
        })

        if(res.ok){
          setTitle("");
          setDescription("");
          setEditingId(null);
          getNotes();
        }

        return;
      }

      const res = await fetch("/api/notes",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({title, description})
    })

    if(res.ok){
      getNotes()
      alert("notes has been created")
      setTitle("");
      setDescription("")
    }
  
    } catch (error) {
      alert("Something went wrong")
    }finally
    {
      setIsLoading(false)
    }
  }

  async function getNotes(){
    
    try {

      const res = await fetch("/api/notes");
      const data = await res.json();
  
      setNotes(data.data);
      
    } catch (error) {
      alert("Something went wrong.");
    }
  }

  async function handleEdit(note:note){
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
  }

  async function handleDelete(id:string){

    try {

      if(!confirm("Are you sure?")) return;

      const res = await fetch(`/api/notes/${id}`, {
        method:"DELETE"
      })

      if(res.ok){
        getNotes();
      }  
    
    } catch (error) {
      alert("Something went wrong while deleting the note.")  
    }
    

  }

  async function handleCancelEdit(){
    setEditingId(null);
    setTitle("");
    setDescription("")
  }

  useEffect(()=>{
    getNotes()
  },[])


  return (
   <div className="flex min-h-screen flex-col items-center px-4 pt-16">
  <h1 className="mb-10 text-4xl font-bold text-indigo-500">
    My Notes App
  </h1>

  <div className="w-full max-w-2xl rounded-xl border border-gray-700 bg-gray-900/70 p-8 shadow-lg">
    <form onSubmit={handleSubmit} action="" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-lg font-semibold text-gray-200">
          Title
        </label>
        <input
          id="title"
          className="h-12 w-full rounded-lg border border-gray-600 bg-transparent px-4 text-gray-200 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          type="text"
          name="title"
          value={title}
          required = {true}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Please enter note title"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-lg font-semibold text-gray-200"
        >
          Description
        </label>

        <textarea
          name="description"
          id="description"
          rows={5}
          value={description}
          required={true}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-y rounded-lg border border-gray-600 bg-transparent p-4 text-gray-200 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          placeholder="Please enter note description"
        />
      </div>
       <div className="self-center flex gap-5">
        <button disabled={isLoading} type="submit" className="px-4 py-2 bg-indigo-600 w-40 self-center rounded-md">{isLoading?"Saving...":editingId?"Update Note":"Create Note"}</button>
          {editingId&& <button onClick={handleCancelEdit} className="px-3 py-2 bg-gray-500 rounded-md">Cancel</button>}  
        </div> 
    </form>

   
  </div>

   <div className="flex flex-wrap my-10 gap-4 justify-start items-center">
      
      {notes?.length == 0?(
        <h1 className="text-3xl text-gray-300">No notes, please create new one!</h1>
      ):(
        notes.map((note:note) =>(
          <Note key={note.id} date={note.created_at.split("T")[0]} title={note.title} description={note.description} onEdit={()=>handleEdit(note)} onDelete={()=>handleDelete(note.id)} />
        ))
      )}
      
    </div>
</div>
  );
}

type note = {
  id:string,
  title:string,
  description:string,
  created_at:string,
}