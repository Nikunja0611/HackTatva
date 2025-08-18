import '../styles/global.css';

export default function Landing(){
  return (
    <>
      <section style={{padding:'90px 0 40px', background:'radial-gradient(900px 400px at 70% -10%, rgba(108,99,255,.25), transparent 60%)'}}>
        <div className="container">
          <div className="card" style={{textAlign:'center',padding:60}}>
            <h1 style={{marginTop:0,fontSize:'clamp(2rem,4vw,3.2rem)'}}>Next-Gen Hackathon Platform</h1>
            <p style={{color:'var(--muted)'}}>Real-time judging • AI summaries • Chat • Certificates • POAP</p>
            <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:18}}>
              <a className="btn" href="/events">Explore Events</a>
              <a className="btn btn--ghost" href="/login">Host an Event</a>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',margin:'40px auto 70px'}}>
        {[
          ['Event Builder','Tracks • rules • prizes'],
          ['Teams & Registration','Easy signup, invites'],
          ['Submissions & Judging','Repos • docs • video'],
          ['Realtime & Chat','Announcements • Q&A'],
          ['AI Assist','Summaries • plagiarism'],
          ['Badges & Certs','PDF + on-chain POAP'],
        ].map(([t,d],i)=>(
          <div key={i} className="card"><h3 style={{margin:'6px 0 8px'}}>{t}</h3><p style={{color:'var(--muted)'}}>{d}</p></div>
        ))}
      </section>
    </>
  );
}
