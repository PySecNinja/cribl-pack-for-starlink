exports.disabled=0;exports.name="Numerify";exports.version="0.4";exports.group="Standard";exports.sync=true;const{Expression}=C.expr;let conf={};let WLIgnoreList=null;let formatter;let filter;let depth=5;exports.init=e=>{conf=(e||{}).conf||{};WLIgnoreList=null;conf.ignoreFields=(conf.ignoreFields||[]).map((e=>e.trim())).filter((e=>e.length));if(conf.ignoreFields.length>0){WLIgnoreList=new C.util.WildcardList(conf.ignoreFields)}filter=()=>true;conf.filterExpr=(conf.filterExpr||"").trim();if(conf.filterExpr){const e=new Expression(`${conf.filterExpr}`,{disallowAssign:true,args:["name","value"]});filter=(r,t,o)=>Boolean(e.evalOn(r,t,o))}if(typeof conf.depth==="number"&&conf.depth>=0&&conf.depth<=10){depth=conf.depth}else{depth=5}conf.digits=Number(conf.digits);const r=Number.isNaN(conf.digits)?2:conf.digits;switch(conf.format){case"fix":formatter=e=>Number(e.toFixed(r));break;case"floor":formatter=e=>Math.floor(e);break;case"ceil":formatter=e=>Math.ceil(e);break;default:formatter=e=>e}};exports.process=e=>{if(!e)return e;e.__traverseAndUpdate(depth,((r,t)=>{let o;try{o=Number(t)}catch(e){return t}if(Number.isNaN(o))return t;if(WLIgnoreList&&WLIgnoreList.test(r))return t;if(filter(e,r,t))return formatter(o);return t}));return e};