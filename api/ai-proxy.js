export default async function handler(req, res){
  res.setHeader("Access-Control-Allow-Origin","*");
  if(req.method==="OPTIONS") return res.status(200).end();
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const apiKey=(process.env.OPENAI_API_KEY||"").trim();
  if(!apiKey) return res.status(500).json({error:"Missing OPENAI_API_KEY"});
  let body=req.body; if(typeof body==="string") body=JSON.parse(body);
  const r=await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${apiKey}`},
    body:JSON.stringify(body)
  });
  const data=await r.json();
  return res.status(r.status).json(data);
}