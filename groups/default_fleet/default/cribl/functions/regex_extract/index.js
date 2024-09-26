exports.name="Regex Extract";exports.version="0.3";exports.group="Standard";exports.sync=true;const{NamedGroupRegExp}=C.util;const{NestedPropertyAccessor,Expression}=C.expr;const DEFAULT_ITERATIONS=100;const KV_REGEX=/^_(KEY|NAME|VAL|VALUE)_(.+)$/;const DEFAULT_FIELD="_raw";let _iterations=DEFAULT_ITERATIONS;let regExList=[];let srcField;let fieldNameExp;let overwrite=false;const fieldNameFilter=new RegExp(/^[_0-9]+|[^a-zA-Z0-9_]+/g);function getRegExConf(e){if(!e||!e.regex){return undefined}const t=NamedGroupRegExp.parseRegexLiteral(e.regex);if(t.groups.length===1){return undefined}const r={};const s={};for(let e=0;e<t.groups.length;e++){const i=t.groups[e];if(i){const t=KV_REGEX.exec(i);if(t){if(t[1]==="KEY"||t[1]==="NAME"){r[t[2]]=e}else{s[t[2]]=e}}}}const i=new Array(t.groups.length);i.fill(-1,0,i.length);let n=0;Object.keys(r).forEach((e=>{const t=s[e];if(t!==undefined){i[r[e]]=t;i[t]=undefined;n++}}));let o=e.regex;let l=_iterations;const g=t.flags||"";if(n===0){if(g.includes("g")){l=_iterations}else{l=1}}else if(!g.includes("g")){o=`${o}g`}return{regex:new NamedGroupRegExp(o),kvPairCount:n,iterations:l,key2value:i}}function formatFieldName(e,t){if(fieldNameExp&&t){return fieldNameExp.evalOn(e,t)}else if(fieldNameFilter&&t){fieldNameFilter.lastIndex=0;return t.replace(fieldNameFilter,"")}return t}function processRegex(e,t,r){e.regex.lastIndex=0;let s=0;const i=e.regex.regex.flags.includes("g");for(let n=0;n<e.iterations;n++){const n=e.regex.exec(r);if(!n||i&&s===e.regex.lastIndex){break}s=e.regex.lastIndex;for(let r=1;r<e.key2value.length;r++){const s=e.key2value[r];const i=e.regex.groups[r];let o;let l;if(s===-1&&i){o=i;l=n[r]}else if(s>0){o=formatFieldName(t,n[r]);l=n[s]}else{continue}const g=t[o];if(!overwrite&&g!==undefined){if(Array.isArray(g)){g.push(l)}else{t[o]=[g,l]}}else{t[o]=l}}}return t}exports.init=e=>{const t=e.conf||{};srcField=new NestedPropertyAccessor(t.source||DEFAULT_FIELD);overwrite=t.overwrite||false;regExList=[];_iterations=t.iterations?t.iterations:DEFAULT_ITERATIONS;if(t.regex){const e=getRegExConf(t);if(e){regExList.push(e)}}if(t.regexList){for(let e=0;e<t.regexList.length;e++){const r=t.regexList[e];if(r){const e=getRegExConf(r);if(e){regExList.push(e)}}}}fieldNameExp=(t.fieldNameExpression||"").trim().length?fieldNameExp=new Expression(t.fieldNameExpression.trim(),{disallowAssign:true,args:["name"]}):undefined};exports.process=e=>{if(regExList.length===0){return e}const t=srcField.get(e);if(t==null){return e}const r=`${t}`;for(let t=0;t<regExList.length;t++){const s=regExList[t];processRegex(s,e,r)}return e};exports.getIterations=()=>_iterations;exports.getSrcField=()=>srcField.path;exports.getOverwrite=()=>overwrite;