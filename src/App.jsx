import React, {useEffect, useState} from 'react'
import Auth from './components/Auth'
import Chat from './components/Chat'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'


export default function App(){
const [user,setUser] = useState(null)
useEffect(()=>{
return onAuthStateChanged(auth, u=> setUser(u))
},[])


return (
<div className="app">
<div className="sidebar">
<h2>Chat App</h2>
<Auth user={user} />
<hr style={{margin:'12px 0',borderColor:'rgba(255,255,255,0.03)'}} />
<div className="small">This is a demo. Replace rules & security before public use.</div>
</div>
<div style={{flex:1}}>
{user ? <Chat user={user} /> : (
<div style={{padding:20}}>Sign in to join the global chat.</div>
)}
</div>
</div>
)
}
