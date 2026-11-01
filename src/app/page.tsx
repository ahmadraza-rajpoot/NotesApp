'use client'

import { useState } from "react";

export default function Home() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e:React.ChangeEvent)=>{
    e.preventDefault()
    
    if(!title || !description){
      alert("Please enter title and description");
      return;
    }


    try {
      setIsLoading(true)
      const res = await fetch("/api/notes",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({title, description})
    })

    if(res.ok){
   
      alert("notes has been created")
    }
  
    } catch (error) {
      alert("Something went wrong")
    }finally
    {
      setIsLoading(false)
    }
  }


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
      <button disabled={isLoading} type="submit" className="px-4 py-2 bg-indigo-600 w-40 self-center rounded-md">Create Note</button>
    </form>
  </div>
</div>
  );
}
