import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import { useEffect } from 'react';
import api from '../lib/axios';
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound'


import { UserButton } from "@clerk/clerk-react";





const Homepage = () => {
  const [isRateLimited,setIsRateLimited] = useState(true );
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchNotes = async()=>{
      try{
      const res = await api.get("/notes");
     
      console.log(res.data);
      setNotes(res.data);
      setIsRateLimited(false);

    }
    catch(error){
      console.log("Error Fetching Notes",error); 
      if(error.response && error.response.status === 429){
        setIsRateLimited(true)
      }
      else{
        toast.error("Failed to load notes...")
      }
    }
    finally{
      setLoading(false)
    }
    }
    
    fetchNotes();
  },[]);
   return (
    <div className='min-h-screen'>
      <Navbar/>
<div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>ThinkBoard</h1>
        <UserButton afterSignOutUrl="/sign-in" />
      </header>
      {/* rest of your homepage */}
    </div>
      {isRateLimited && <RateLimitedUI/>}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound/>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note)=>(
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Homepage;
