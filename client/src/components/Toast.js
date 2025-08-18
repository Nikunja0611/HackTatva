export default function Toast({ text }) {
  if(!text) return null;
  return <div style={{
    position:'fixed',right:16,bottom:16,background:'#111826',border:'1px solid rgba(255,255,255,.12)',
    padding:'10px 14px',borderRadius:10
  }}>{text}</div>;
}
