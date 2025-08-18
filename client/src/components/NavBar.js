export default function NavBar(){
  return (
    <header style={{position:'sticky',top:0,background:'rgba(6,12,20,.65)',backdropFilter:'blur(8px)'}}>
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0'}}>
        <div style={{fontWeight:900}}>HackSphere</div>
        <nav style={{display:'flex',gap:'14px'}}>
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/login" className="btn">Get Started</a>
        </nav>
      </div>
    </header>
  );
}
