import api from '../api/axios';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState('');
  async function onSubmit(e){ e.preventDefault();
    try{ const r=await api.post('/auth/login',{email,password}); localStorage.setItem('token', r.data.token); setMsg('Logged in'); }
    catch(err){ setMsg(err?.response?.data?.message || 'Login failed'); }
  }
  return (
    <div className="container" style={{padding:'50px 0'}}>
      <div className="card" style={{maxWidth:420, margin:'0 auto'}}>
        <h2>Login</h2>
        <form onSubmit={onSubmit} style={{display:'grid',gap:12}}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
          <button className="btn">Login</button>
        </form>
      </div>
      <Toast text={msg}/>
    </div>
  );
}
