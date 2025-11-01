import React, { useEffect } from 'react'
import { useState } from 'react';
import { io, Socket } from 'socket.io-client'

const socket = io("http://localhost:5000")

const App = () => {
const [message, setMessage] = useState("")
const [reply, setReply] = useState();


useEffect(()=>{
  socket.on("reply", (data)=>{
console.log("Server replied:", data);
setReply(data)
  })

return ()=>{
  socket.off("reply")
}
},[])

 const Sendmessage =()=>{
   if (message.trim()==="")  return 
  socket.emit("client:", message)   
  setMessage("")
 }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white'>
   <h1 className='text-2xl font-bold mb-4'> Socket.io Chart</h1>

<div className=' bg-gray-800 p-6 rounded-xl shadow-md w-80'>
<input type="text" placeholder='Type message..'
 value={message}
          onChange={(e) => setMessage(e.target.value)}
className='w-full p-2 mb-3 rounded text-white' />

 <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded"    onClick={Sendmessage}>
          Send
        </button>

 {reply && (
          <p className="mt-4 text-green-400">
            <strong>Server:</strong> {reply}
          </p>
        )}

</div>

    </div>
  )
}

export default App
       