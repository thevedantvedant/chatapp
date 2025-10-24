import React, {useEffect, useState, useRef} from 'react'


useEffect(()=>{
const q = query(collection(db,'messages'), orderBy('createdAt', 'asc'))
const unsub = onSnapshot(q, snap =>{
const arr = snap.docs.map(d=>({id:d.id, ...d.data()}))
setMessages(arr)
bottomRef.current?.scrollIntoView({behavior:'smooth'})
})
return unsub
},[])


async function sendImage(file){
if(!file) return
const storageRef = ref(storage, `images/${Date.now()}_${file.name}`)
await uploadBytes(storageRef, file)
const url = await getDownloadURL(storageRef)
await addDoc(collection(db,'messages'),{
text:'',
image:url,
uid:user.uid,
displayName:user.displayName||user.email,
createdAt: serverTimestamp()
})
}


async function send(e){
e?.preventDefault()
if(!text.trim()) return
await addDoc(collection(db,'messages'),{
text,
uid:user.uid,
displayName:user.displayName||user.email,
createdAt: serverTimestamp()
})
setText('')
setShowEmoji(false)
}


function onEmojiClick(event, emojiObject){
setText(prev => prev + emojiObject.emoji)
}


return (
<div className="chat">
<div className="header">
<div>Global Chat</div>
<div className="small">Signed in as {user.displayName || user.email}</div>
</div>
<div className="messages">
{messages.map(m=> (
<div key={m.id} className={`msg ${m.uid===user.uid? 'me':''}`}>
<div style={{fontSize:12,opacity:0.8}}>{m.displayName}</div>
{m.text && <div style={{marginTop:6}}>{m.text}</div>}
{m.image && <img src={m.image} style={{maxWidth:260,marginTop:8,borderRadius:8}} />}
</div>
))}
<div ref={bottomRef} />
</div>


<form className="inputRow" onSubmit={send}>
<button type="button" className="btn" onClick={()=>fileRef.current.click()}>📎</button>
<input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>sendImage(e.target.files[0])} />
<button type="button" className="btn" onClick={()=>setShowEmoji(s=>!s)}>😊</button>
<input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message..." />
<button className="btn" type="submit">Send</button>
</form>
{showEmoji && <div style={{position:'absolute',right:20,bottom:84}}><Picker onEmojiClick={onEmojiClick} /></div>}
</div>
)
}
