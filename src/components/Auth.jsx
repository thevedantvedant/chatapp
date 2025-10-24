import React, {useState, useEffect} from 'react'
import { auth, googleProvider } from '../firebase'
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'


export default function Auth({user}){
const [email,setEmail]=useState('');
const [pass,setPass]=useState('');
const [registerMode,setRegisterMode]=useState(false);


async function withGoogle(){
await signInWithPopup(auth, googleProvider)
}
async function submit(e){
e.preventDefault();
if(registerMode) await createUserWithEmailAndPassword(auth,email,pass)
else await signInWithEmailAndPassword(auth,email,pass)
}
if(user) return (
<div>
<div className="profile"><div className="avatar"/> <div>
<div>{user.displayName||user.email}</div>
<div className="small">{user.uid}</div>
</div></div>
<button className="btn" onClick={() => signOut(auth)}>Sign out</button>
</div>
)


return (
<div>
<h3>Sign in</h3>
<form onSubmit={submit} style={{display:'grid',gap:8}}>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
<input value={pass} type="password" onChange={e=>setPass(e.target.value)} placeholder="Password" />
<div style={{display:'flex',gap:8}}>
<button className="btn" type="submit">{registerMode? 'Register':'Sign in'}</button>
<button className="btn" type="button" onClick={withGoogle}>Google</button>
</div>
</form>
<div style={{marginTop:8}}>
<button className="btn" onClick={()=>setRegisterMode(!registerMode)}>{registerMode ? 'Have an account? Sign in' : "Don't have an account? Register"}</button>
</div>
</div>
)
}
