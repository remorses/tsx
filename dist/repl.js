import c from"repl";import{transform as l}from"@esbuild-kit/core-utils";import{v as m}from"./package-5a2461d7.js";console.log(`Welcome to tsx v${m} (Node.js ${process.version}).
Type ".help" for more information.`);const o=c.start(),{eval:i}=o,f=async function(e,r,t,s){const n=await l(e,".ts").catch(a=>(console.log(a.message),{code:`
`}));return i.call(this,n.code,r,t,s)};o.eval=f;
