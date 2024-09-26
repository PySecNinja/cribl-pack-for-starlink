exports.name="Flatten";exports.version="0.1";exports.disabled=false;exports.group="Formatters";exports.sync=true;const cLogger=C.util.getLogger("func:flatten");const DEFAULT_DEPTH=5;let prefix="";let depth=DEFAULT_DEPTH;let delimiter="_";let nonInternalWCL=undefined;let internalWcl=undefined;exports.init=e=>{const t=e.conf;const n=[...t.fields];nonInternalWCL=undefined;internalWcl=undefined;const i=[];const r=[];n.forEach((e=>{if(e.startsWith("__")){if(e.indexOf("*")>-1){cLogger.warn("Internal fields with wildcards are not supported, ignoring field",{field:e})}else{r.push(e)}}else{i.push(e)}}));if(r.length>0){internalWcl=new C.util.WildcardList(r)}if(i.length===0&&r.length===0){cLogger.info("No fields specified, defaulting to all");nonInternalWCL=new C.util.WildcardList(["*"])}else if(i.length){nonInternalWCL=new C.util.WildcardList(i)}prefix=t.prefix;depth=t.depth>=1?t.depth:DEFAULT_DEPTH;delimiter=t.delimiter};exports.process=e=>{e.__traverseForFlatten(e,depth,((t,n,i,r,l)=>{if(l===depth&&e.__isInternalField(r)&&(!internalWcl?.test(r)||internalWcl==null)){return true}if(l===depth&&!e.__isInternalField(r)&&!nonInternalWCL?.test(r)){return true}if(l===1&&typeof n==="object"){n=JSON.stringify(n)}if(l===depth){delete e[r]}if(typeof n!=="object"){e[t]=n}return typeof n!=="object"}),prefix,delimiter);return e};