exports.name="Clone";exports.version="0.2";exports.group="Advanced";exports.sync=true;const{NestedPropertyAccessor,Expression}=C.expr;const cLogger=C.util.getLogger("func:clone");let clones=[];let cloneKeys=[];let cloneVals=[];exports.init=e=>{const n=e.conf||{};clones=n.clones||[];cloneKeys=clones.map((e=>Object.keys(e).map((e=>new NestedPropertyAccessor(e)))));cloneVals=clones.map((e=>Object.keys(e).map((n=>buildValueFunction(e[n])))))};function buildValueFunction(e){try{const n=new Expression(e);return s=>{try{const o=n.evalOn(s);return o==null||Number.isNaN(o)?e:o}catch{return e}}}catch{cLogger.warn(`Parsing of value expression ('${e}') failed.  Interpreting as a string literal.`);return n=>e}}exports.process=e=>{if(clones.length===0){return e}const n=new Array(clones.length+1);n[0]=e;const s=Object.keys(e);for(let o=0;o<clones.length;o++){const t=cloneKeys[o];const r=cloneVals[o];const c=e.__clone(false,s);for(let n=0;n<t.length;n++){t[n].set(c,r[n](e))}n[o+1]=c}return n};