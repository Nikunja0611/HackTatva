const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.POLYGON_RPC));
// For a real POAP, integrate contract ABI + mint call
async function mintBadge({ to, eventId }){
  // DEMO: return a fake tx id
  return { tx: '0x'+Math.random().toString(16).slice(2), to, eventId };
}
module.exports = { mintBadge };
