import api from '../api/axios';
import { useEffect, useState } from 'react';

export default function Events(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ api.get('/events').then(r=>setItems(r.data)); },[]);
  return (
    <div className="container" style={{padding:'30px 0'}}>
      <h2>Events</h2>
      <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
        {items.map(e=>(
          <div key={e.id} className="card">
            <h3 style={{marginTop:0}}>{e.name}</h3>
            <p style={{color:'var(--muted)'}}>{e.description}</p>
            <a className="btn btn--ghost" href={`/events/${e.id}`}>Open</a>
          </div>
        ))}
      </div>
    </div>
  );
}
