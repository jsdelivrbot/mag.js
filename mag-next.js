/* MagJS Next - Temp: will remove */
(function(b,f){'use strict';function h(S,T){if(y[S]&&!T)return y[S];var U=mag.doc.getElementById(S);return U&&(y[S]=U),y[S]}var j='KEY',l=0,n=['#'+j,'.'+j,j],o=function(S,T){var U;for(var V in n){var W=n[V].replace(j,T);if(U=S.querySelector(W),U)break}return U},q=function(S){var T=mag.utils.items.getItemVal(S),U=mag.getNode(T);return U},r=function(S){if('string'==typeof S){var T=q(~mag.mod.runningViewInstance||mag.utils.runningEventInstance),U=o(T||mag.doc,S);if(U)return U}return S},t=function(S,T,U){var Z,V=[],W=S.cloneNode(1),Y=[],$=[],_=function(aa){var ba=S;aa=aa||{};var ca;aa.key&&(ca=aa.key+'-'+_.id);var da=aa.key?aa.key+'-'+_.id:_.id;if($[da]||($[da]='object'==typeof U?mag.utils.copy(U):U),'object'==typeof aa&&(aa=mag.utils.extend($[da],aa)),ca&&!V[ca]?ba=V[ca]=W.cloneNode(1):ca&&V[ca]&&(ba=V[ca]),Z&&Z==ba[u].scid)throw Error('MagJS Error - recursive call:'+Z);ba[u]=ba[u]||{},mag._cprops[da]&&'object'==typeof aa&&(aa.children=mag._cprops[da]),_.props=aa,_.key=ca;var ea;if(Y[da]!=mag.utils.toJson(aa))try{ea=T(aa),Z=ba[u].scid=da,Y[da]=mag.utils.toJson(aa);var fa=mag.fill.id;fa&&fa[u]&&fa[u].scid&&(ba[u].pscid=fa[u].scid),mag.fill.setId(ba),mag.fill.run(ba,ea)}finally{mag.fill.setId(fa),Z=0}return ba};return _.id=++l,_.element=W,_};b.mag=function(S,T,U){if(S=r(S),T=r(T),U=U||{},mag.utils.isHTMLEle(T)&&mag.utils.isHTMLEle(S))T[u]||mag.fill.run(T,S);else{if('function'==typeof T&&mag.utils.isHTMLEle(S)){try{t(S.cloneNode(1),T,U)()}catch(V){}return t(S,T,U)}return K(-1,h(mag._isNode(S)),T,U)}};var u='__magnum__';mag.MAGNUM=u,mag.rafBounceIds=[],mag._cprops=[],mag.doc=f;var w={values:[],attributes:[],elementMatcher:[]},y=[],l=0;mag._isNode=function(S){return mag.utils.isHTMLEle(S)&&(!S.id&&(S.id=++l),y[S.id]=S,S=S.id),S};var z=function(S,T){var U,V=T?S+'-'+T:S;return U=mag.utils.items.isItem(V)?mag.utils.items.getItem(V):mag.utils.getItemInstanceId(V),U};mag.module=function(S,T,U){U=U||{},S=mag._isNode(S);var V=z(S,U.key),W=A(U,V,T,S);return W?K(V,W,T,mag.utils.copy(U)):void 0};var A=function(S,T,U,V){S.retain||mag.mod.clear(T);var W=h(V);if(mag.mod.submodule(V,T,U,S),L(T,V),!Q(T,W))return mag.redraw(W,T,1).then(function(){R(T,W)}),W},B=function(S,T){return 0>T||T!=mag.utils.items.getItem(S)?S==mag.mod.getId(T):!0},C=[];mag.begin=function(S){'undefined'==typeof C[S]?C[S]=1:C[S]++},mag.end=function(S){if(1<C[S])C[S]--;else{C[S]=0;var T=mag.utils.items.getItemVal(S);mag.redraw(h(T),S)}},mag.redraw=function(S,T,U){if(!C[T]){if(!S||'undefined'==typeof T)throw Error('Mag.JS - Id or node invalid: '+mag.utils.items.getItemVal(T));if(!B(S.id,T))return{then:V=>V()};if(U&&mag.fill.configs.splice(0,mag.fill.configs.length),U&&mag.mod.clear(T),mag.mod.runningViewInstance==T)throw Error('Mag.JS - recursive call:'+T);return mag.utils.scheduleFlush(T,M(S,T,U))}},mag.hookin=function(S,T,U){w[S].push({context:{},handler:U,key:T})},mag.hook=function(S,T,U){for(var V=0,W=w[S].length;V<W;V++)mag.utils.callHook(w,T,S,V,U)};var D={},E=[],F=[],G=function(S,T,U){var V=mag.getNode(mag.mod.getId(S)),W=function(){mag.utils.callLCEvent('onunload',mag.mod.getState(S),V,S)||(mag.clear(S),P(S,V),T[S]&&(T[S].length=0),U&&(mag.fill.removeNode(V),mag.mod.remove(S)))};mag.mod.getState(S).onbeforeunload?mag.utils.callLCEvent('onbeforeunload',mag.mod.getState(S),V,S,0,function(){W()}):W()},H=function(S,T){F[S]=F[S]||[];var U=F[S].push(T);return mag.utils.onLCEvent('didupdate',S,function(V,W){var X=[mag.utils.copy(W),mag.utils.copy(V)];if(mag.utils.toJson(X)!=mag.utils.toJson(E[S])){for(var Y of F[S])Y(V,W,h(mag.mod.getId(S)),E[S]);E[S]=X}}),function(){return F[S].splice(U-1,1)}},I=[],J=function(S,T,U,V,W){var X=mag.utils.items.getItem(T);T=mag._isNode(S);var Y=mag.utils.toJson(mag.mod.getProps(X));(R(X,S),!(mag.mod.exists(X)&&mag.utils.callLCEvent('willgetprops',mag.mod.getState(X),S,X,0,U)))&&(mag.mod.submodule(S.id,X,V,U),Y!=mag.utils.toJson(mag.mod.getProps(X))&&(W=1),L(X,S.id),Q(X,S)||mag.redraw(S,X,W).then(function(){R(X,S)}))},K=function(S,T,U,V){I[S]=I[S]||[];var W=function(X,Y,Z,$,_){'object'==typeof _&&($=mag.utils.merge(mag.utils.copy($),_),_=0),0>X&&!_&&(_=1);var aa=Y.id+($.key?'.'+$.key+'.':'')+(_||'');!D[aa]||$.key||~W._id||(aa+=++l);var ba=D[aa]=D[aa]||Y.cloneNode(1);if(ba.id=aa,mag.utils.items.isItem(aa))return J(ba,aa,$,Z),ba;var ca=mag.utils.getItemInstanceId(ba.id);return 0>X?X=W._id=ca:I[X].push({instanceId:ca,subscribe:H.bind({},ca)}),J(ba,aa,$,Z),ba}.bind({},S,T,U,V);return W._id=S,W.clones=function(){return I[W._id]},W.destroy=function(X){G(W._id,W.clones,X)},W.getId=function(){return W._id},W.rafBounce=function(X){return X?mag.rafBounceIds[W._id]=1:!1===X&&(mag.rafBounceIds[W._id]=0),!!mag.rafBounceIds[W._id]},W.draw=function(X){return mag.redraw(T,W._id,X)},W.getState=function(){return mag.mod.getState(W._id)},W.getProps=function(){return mag.mod.getProps(W._id)},W.subscribe=function(X){return H(W._id,X)},W},L=function(S,T){var U=function(V,W){h(W)?mag.redraw(h(W),V):mag.utils.items.isItem(W)&&mag.clear(V)}.bind({},S,T);mag.mod.setFrameId(S,U)};mag.clear=function(S){mag.utils.items.removeItem(S),mag.mod.clear(S),mag.fill.clearCache(mag.mod.getId(S))};var M=function(S,T,U){return function(V,W,X){if(h(V.id,1),B(V.id,W)&&V){var Y=mag.mod.getState(W);if(!mag.utils.callLCEvent('isupdate',Y,V,W)){if(mag.mod.iscached(W)&&!X)return 0;if(!mag.utils.callLCEvent('willupdate',Y,V,W)){mag.mod.callView(V,W);var Z=mag.fill.id;mag.fill.setId(V.id),mag.fill.run(V,Y),mag.fill.setId(Z),N(V.id,mag.fill.configs),mag.utils.callLCEvent('didupdate',Y,V,W),X||mag.mod.iscached(W)}}}}.bind({},S,T,U)},N=function(S,T){for(var U in T)U.startsWith('id("'+S+'")/')&&T[U]()},O=function(S){var U=[];for(var V in mag.fill.cached)-1<V.indexOf('id("'+S+'")/')&&-1<V.indexOf('-config')&&mag.fill.cached[V].configContext&&U.push({path:V.split('-config')[0],controller:mag.fill.cached[V].configContext,handler:mag.fill.cached[V].configContext.onunload});return U},P=function(S,T){for(var W,U=O(T.id,S),V=0,X=U;W=X&&X[V];V++)W.controller.onunload&&(W.handler.call(W.controller,T,W.path),W.controller.onunload=0)},Q=function(S,T){return mag.utils.callLCEvent('willload',mag.mod.getState(S),T,S,1)},R=function(S,T){var U=mag.utils.items.getItemVal(S);if(h(U)&&mag.mod.exists(S))return mag.utils.callLCEvent('didload',mag.mod.getState(S),T,S,1)};mag.getNode=h})(window||global||this,document),function(b){'use strict';function f(u,w){var y=u.name;if('undefined'==typeof u.object[u.name]&&'_'!=y[0]){var z=b.fill.find(w,y),A='$'===y[0],B=[];return z.length?(z.forEach(function(G){var H;if(!(G&&G.type&&!~['submit','button'].indexOf(G.type)))'undefined'==typeof u.oldValue&&'undefined'==typeof u.object[u.name]&&G&&!~['submit','button'].indexOf(G.type)&&1==G.childNodes.length&&G.childNodes[0].textContent.trim()&&(H={_text:G.childNodes[0].textContent.trim()});else if(G.value&&0<G.value.length)if('checkbox'!=G.type&&'radio'!=G.type){var K=G.multiple&&Array.prototype.map.call(G.selectedOptions,L=>L.value);H={_value:K||G.value}}else if(G.checked&&(H={},H._checked=!0),!A){var I=w.querySelectorAll('[name='+G.name+']');if(I.length)for(var J of I)J.checked&&(H?H._value=J.value:H={_value:J.value})}else H?H._value=G.value:H={_value:G.value};H?B.push(H):G&&!G.hasChildNodes()&&B.push(j)}),0===B.length?void 0:A?B:B[0]&&'undefined'!=typeof B[0]._value?B[0]._value:B[0]&&B[0]._text?B[0]._text:B[0]):j}if('_'==y[0]){var C=y.substr(1);if(w.length){var B=[];for(var D in w){var E=w[D],F=E[C];'undefined'==typeof F&&(F=E.getAttribute(C)),B.push(F)}return B}var F=w[C];return'undefined'==typeof F&&(F=w.getAttribute(C)),F}}function g(u,w){return new u(b.proxy({},t.bind({},'state',w)))}var h=[],j=b.MAGNUM,n={runningViewInstance:-1,innerMods:[],cache:[]};n.getState=function(u){return h[u][1]},n.setState=function(u,w){h[u][1]=w},n.getView=function(u){return h[u][0]},n.getProps=function(u){return h[u]&&h[u][2]},n.setProps=function(u,w){return h[u][2]=w},n.remove=function(u){h[u]&&(h[u]=0)},n.getId=function(u){return h[u]&&h[u][3]},n.exists=function(u){return'undefined'!=typeof h[u]},n.setFrameId=function(u,w){h[u][4]=w},n.getFrameId=function(u){return h[u][4]},n.getMod=function(u){return h[u][5]};var o=(u,w)=>{for(var y in w=w||u,u){var z=u[y];'function'!=typeof z||~['controller','view'].indexOf(y)||(u[y]=z.bind(w))}return u};n.submodule=function(u,w,y,z){if(h[w])return z.key&&z.key==n.getProps(w).key?n.setProps(w,b.utils.copy(b.utils.merge(n.getProps(w),z))):n.setProps(w,z),h[w];y=b.utils.copy(y),o(y,y),h[w]=[0,0,0,0,0,0],n.setProps(w,z);var B=function(D,E,F){y.element=F,y.state=E,y.props=n.getProps(D),y.view&&y.view.call(y,E,y.props,F)}.bind({},w),C={controller:function(D){return y.props=n.getProps(w),y.state=D,y.element=b.getNode(u),(y.controller||function(){}).call(D,y.props)||D},view:B};return h[w][0]=C.view,h[w][3]=u,h[w][1]=g(C.controller,w,u),h[w][5]=y,h[w]};var q=[],r=function(u,w){var y=u,z=w.split('/');for(var A of z)if(A){var B=b.fill.find(y,A);B.length&&(y=B)}return y},t=function(u,w,y){if('get'==y.type&&'props'!=u&&!~b.fill.ignorekeys.indexOf(y.name.toString())&&'undefined'==typeof y.oldValue){var z=b.getNode(n.getId(w));if(y.path&&'/'==y.path[0])var A=r(z,y.path);A&&'$'!=y.path.split('/').pop()[0]&&(A=A[0]);var B=f(y,A?A:z);if(null!==B&&'object'==typeof B&&y.object&&b.utils.merge(B,y.object[y.name]),B)return n.cached[w]=0,B}else'set'==y.type&&'props'!=u&&y.object[y.name]&&y.object[y.name].draw&&'function'==typeof y.object[y.name].draw&&(n.innerMods[n.getId(w)]=[y.name,y.object[y.name]]);var C=n.getFrameId(w);'function'==typeof C&&'set'==y.type&&(cancelAnimationFrame(q[w]),q[w]=requestAnimationFrame(C))};n.iscached=function(u){var w=b.utils.toJson([n.getProps(u),n.getState(u)]);return u in n.cache&&n.cache[u]==w||void(n.cache[u]=w)},n.clear=function(u){~u&&n.cache[u]&&n.cache.splice(u,1)},n.cached=[],n.callView=function(u,w){n.runningViewInstance=w,n.cached[w]||(b.props.attachToArgs(w,n.getState(w),u),n.cached[w]=1);try{n.getView(w)(n.getState(w),u)}finally{n.runningViewInstance=-1}},b.mod=n}(mag),function(b){'use strict';function g(y,z,A,B){var C=[];for(var D in y){var E=y[D];j(E)&&(C.push(E),h(E,z,A,B))}return!!C.length&&(1==C.length?C[0]:C)}function h(y,z,A,B){if(y[q]=y[q]||{},!y[q].eventOnFocus){var C=function(D,E,F){var H=~['radio','checkbox'].indexOf(y.type);if(this[q].dirty||(this[q].dirty=1),y.selectedOptions)var I=Array.prototype.map.call(y.selectedOptions,J=>J.value);H?'_checked'in E||o in E?E._checked=this.checked:this.checked&&(E[F]=this.value):void 0===E[o]?void 0!==E._text&&(E._text=I||this.value):E[o]=I||this.value,b.redraw(D,b.utils.items.getItem(D.id))}.bind(y,B,z,A);y.addEventListener('click',C),y.addEventListener('input',C),y.addEventListener('change',C),y.addEventListener('focus',C),y[q].eventOnFocus=1}}function j(y){return y&&~['INPUT','SELECT','TEXTAREA'].indexOf(y.tagName)}function l(y){for(var z in y)if(j(y[z]))return y[z];return!1}var n={},o='_value',q=b.MAGNUM,r=function(y,z){for(var A=1;A<y.length;A++){var B=y[A],C=y[A+1],D=b.fill.find(Array.isArray(z)?z[0]:z,B);if(C&&!isNaN(+C))z=D[C];else if(D&&D.length&&C&&A+2<y.length)z=b.fill.find(D[0],C);else if(D&&D.length&&(z=D,A+2==y.length))break}return Array.isArray(z)?z[0]:z},t=function(y,z,A,B){var D,C=A.toString().split('.');if(3<=C.length)B=r(C,B),D=b.fill.find(B,z);else{var E=parseInt(C.pop()),F=isNaN(E)?0:E;D=b.fill.find(B[F]?B[F]:B,z)}return g(D,y,z,B)},u=function(y,z,A,B){var C=A[z];~[o,'_checked','_text'].indexOf(z)&&'string'==typeof y&&(z=y.split('.').pop());var D=b.fill.find(B,z),E=l(D);if('function'!=typeof C&&E){var F=t.bind({},A,z,y,B);F(),Object.defineProperty(A,z,{configurable:!0,get:function(){var G=F();return G&&'undefined'!==G.value&&G[q]&&G[q].dirty&&G.value!==C?(C=G.value,b.redraw(B,y,1),G.value):C},set:function(G){var H=F();H&&'undefined'!==H.value&&H.value!==G&&G!==C&&(H.value=G,C=G)}})}},w=function(y,z,A){for(var B in z)if(z.hasOwnProperty(B)){var C=z[B];B==o||'object'!=typeof C||b.utils.isHTMLEle(C)?u.bind({},y,B,z,A)():(b.utils.isObject(C)&&b.utils.isEmpty(C)&&(C[o]=''),w(y+'.'+B,C,A))}};n.attachToArgs=w,b.props=n}(mag),function(b){'use strict';var f={};f.copy=q=>Object.assign({},q),f.merge=function(){return Object.assign.apply({},arguments)},f.extend=function(q,r,t){for(var u in r)if(r[u]===void 0)delete r[u];else if(t&&f.isObject(r[u]))return f.extend(q[u],r[u]);return f.merge(q,r)},f.isObject=q=>'Object]'==Object.prototype.toString.call(q).substr(-7);var g=(q,r)=>'function'==typeof r?''+r:r;f.toJson=q=>JSON.stringify(q,g),f.isEmpty=q=>{for(var r in q)if(q.hasOwnProperty(r))return 0;return 1},f.isHTMLEle=q=>q&&1===q.nodeType,f.callHook=function(q,r,t,u,w,y){q[t][u].key==r&&(y={v:w.value,k:w.key},w.change=!1,q[t][u].handler.call(q[t][u].context,w),{v:w.value,k:w.key}!==y&&(w.change=!0))};var j,h=[],l=[];f.scheduleFlush=function(q,r){return new Promise(function(t){b.rafBounce||b.rafBounceIds[q]?(cancelAnimationFrame(l[q]),l[q]=requestAnimationFrame(()=>{r(),t(),l[q]=0})):(r&&h.push(r),!j&&h.length?j=requestAnimationFrame(u=>{for(j=0;h.length&&!(16.6<performance.now()-u);)h.shift()();h.length?f.scheduleFlush(q):t()}):t())})};var n=[];f.onLCEvent=function(q,r,t){var u=q+'-'+r;n[u]=n[u]||[];var w=n[u].push(t);return function(){return n[u].splice(w-1,1)}},f.callLCEvent=function(q,r,t,u,w,y){var z;f.runningEventInstance=u;var A=b.mod.getProps(u),B=b.mod.getMod(u),C=B[q]?B:r[q]&&r;C&&(z=C[q].call(B,t,A,u,y),w&&(C[q]=0));var D=q+'-'+u;if(n[D]){for(var E of n[D])E(r,A);w&&(n[D]=0)}return(f.runningEventInstance=-1,!1===z)||void 0};var o={i:[],isItem:q=>~o.i.indexOf(q),setItem:q=>o.i[o.i.length]=q,getItem:q=>o.i.indexOf(q),getItemVal:q=>o.i[q],removeItem:q=>o.i.splice(o.i.indexOf(q),1)};f.items=o,f.getItemInstanceIdAll=()=>o.i,f.getItemInstanceId=q=>{return o.isItem(q)?o.getItem(q):(o.setItem(q),o.getItem(q))},b.utils=f}(mag),function(b,f,g){'use strict';function h(ga){return Array.isArray(ga)}function j(ga,ha){return ga[X]=ga[X]||{},(!ga[X].uid||ha)&&(ga[X].uid=++ca),ga[X].uid}function n(ga){for(var ha=1;ga=ga.previousElementSibling;)++ha;return ha}function o(ga,ha,ia){var ja=j(ga,ia);return aa[V.id]=aa[V.id]||[],aa[V.id][ja]&&aa[V.id][ja]==ha?1:void(aa[V.id][ja]=ha)}function q(ga){return ga.id&&b.utils.items.isItem(ga.id)?ga:ga.parentNode?q(ga.parentNode):void 0}function r(ga,ha){if(ga[X]&&ga[X].scid&&!ga[X].pscid)ha=ga;else if(ha)return ha;return ga.parentNode?r(ga.parentNode,ha):void 0}function t(ga){var ha='',ia=q(ga),ja=n(ga);return ia&&(ha+='id("'+(ia.id||ia.tagName)+'")'),ha+='/'+ga.tagName+'['+ja+']',ha}function u(ga){if(ga.id&&V.id===ga.id||V.id===ga)return'id("'+(ga.id||ga.tagName)+'")';if(ga===b.doc.body)return ga.tagName;var ha=0;if(ga.parentNode)for(var la,ia=ga.parentNode.childNodes,ja=0,ka=ia.length;ja<ka;ja++){if(la=ia[ja],la===ga)return u(ga.parentNode)+(ga.tagName?'/'+ga.tagName+'['+(ha+1)+']':'');1===la.nodeType&&la.tagName===ga.tagName&&ha++}}function w(ga){var ha=u(ga);ga&&W[ha+'-config']&&W[ha+'-config'].configContext&&typeof W[ha+'-config'].configContext.onunload==='function'&&(W[ha+'-config'].configContext.onunload(W[ha+'-config'].configContext,ga,ha),delete W[ha+'-config'],delete V.configs[ha]),ga.parentNode&&ga.parentNode.removeChild(ga),b.mod.cached[b.utils.items.getItem(V.id)]=0}function y(ga){var ha=ga&&parseInt(ga.split('[').pop().slice(0,-1));return ha?parseInt(ha)-1:0}function z(ga){var ha=[];return ga.replace(/\[(.+?)\]/g,function(ia,ja){ha.push(ja)}),ha}function A(ga){return ga&&~ga.indexOf('id(')&&ga.split('id("')[1].split('")')[0]}function B(ga,ha,ia){var ja=j(ga);if(_[ja])return _[ja];if(da[ja])return da[ja];var ka=+ia==+ia?ha+ia:ha,la='object'==typeof V.id?V.id.tagName:V.id,ma='string'==typeof ia?ia.split(la)[1]:'',na=la+'/'+ga.tagName+'['+ka+']'+ma;return da[ja]=ga[X].xpath=na}function C(ga){if(ga&&ga[X]&&ga[X].isItem)return ga;return ga.parentNode?C(ga.parentNode):void 0}function D(ga,ha,ia){if(!o(ga,ha.outerHTML,ia)&&(!ha.id&&!ga.childNodes[0]||ha.id&&!b.doc.getElementById(ha.id)||ga.firstChild&&!ga.firstChild.isEqualNode(ha))){var ja=b.utils.items.getItem(ha.id);if(~ja&&ga.hasChildNodes()){var ka=b.utils.items.getItem(V.id),la=ga.cloneNode(1);la[X]={childof:ka},b.mod.getProps(ja).children=la}else ha[X]&&ha[X].scid&&(la=ga.cloneNode(1),la[X]={childof:ha[X].scid},b._cprops[ha[X].scid]=la);for(;ga.lastChild;)ga.removeChild(ga.lastChild);if(ha[X]&&ha[X].childof!==g){ga.innerHTML=ha.innerHTML;var ma=ha[X].childof;b._cprops[ma]||(E(ga,ma),b.utils.onLCEvent('willupdate',ma,()=>{E(ga,ma)}))}else ga.appendChild(ha)}}function E(ga,ha){var ia=V.id;V.setId(b.mod.getId(ha)),V.run(ga,b.mod.getState(ha)),V.setId(ia)}function F(ga,ha){var ia;for(var ja in ha){var ka=ha[ja];ka===g?ka='':null===ka&&-1===['onunload'].indexOf(ja)?(ga[X].detached=ga[X].detached||[],ga[X].detached[ja]=1,J(ga,ja)):ga[X].detached&&ga[X].detached[ja]&&(I(ga,ja),ga[X].detached[ja]=0),'_'===ja[0]&&'_'!==ja[1]&&(ia=ia||{},ia[ja.substr(1)]=ka)}return ia}function G(ga,ha,ia){var ja;for(var ka in ha){var la=ha[ka];if(!~V.ignorekeys.indexOf(ka)&&'_'!==ka[0]){ja=R(ga,ka);var ma={key:ka,value:la,node:ga};b.hook('values','*',ma),ma.change&&(la=ma.value),V.run(ja,la,ia+'/'+ka)}}}function H(ga,ha,ia,ja){var ka,oa=y(ia);return ha&&b.utils.isHTMLEle(ha)?void D(ga,ha):'function'==typeof ha?ea(ha,ga,oa,ia):'object'==typeof ha?void(b.mod.innerMods[V.id]&&ha[b.mod.innerMods[V.id][0]]&&!ha[b.mod.innerMods[V.id][0]].draw&&b.mod.innerMods[V.id][1].destroy(),ka=F(ga,ha),ka&&O(ga,ka,ia,ja),G(ga,ha,ia)):H(ga,{_text:ha},ia)}function I(ga,ha){var ia=R(ga,ha);ia.forEach(function(ja){var ka=j(ja);if(ka in fa){for(var la in fa[ka])ja.appendChild(fa[ka][la]);delete fa[ka]}})}function J(ga,ha){var ia=0,ja=1,ka=function(na){if(++ia==ja)for(;na.lastChild;)w(na.lastChild)},la=function(na,oa){var pa;na.id&&b.utils.items.isItem(na.id)&&(pa=b.utils.items.getItem(na.id)),pa&&b.mod.getState(pa).onbeforeunload?(ja++,b.utils.callLCEvent('onbeforeunload',b.mod.getState(pa),na,pa,0,function(){pa&&b.utils.callLCEvent('onunload',b.mod.getState(pa),na,pa),oa()})):(pa&&b.utils.callLCEvent('onunload',b.mod.getState(pa),na,pa),oa())},ma=R(ga,ha);ma.forEach(function(na){var oa=j(na);na.children.length&&(fa[oa]=K(na.children));for(var qa in fa[oa]){var ra=fa[oa][qa];la(ra,function(){ka(na)})}ka(na)})}function K(ga){var ha;if(null==ga.length&&(ga=[ga]),!h(ga)){ha=[];for(var ia=0;ia<ga.length;ia+=1)ga[ia]&&ha.push(ga[ia]);ga=ha}return ga}function L(ga,ha){var ia=function(ja,ka,la){var ma=t(ka),na=A(ma);na||(na=r(ka));var oa=V.id;V.setId(na);var pa=C(ka),qa=pa&&u(pa),ra=y(qa),ma=ma,sa=y(ma),ta={path:qa,node:pa,data:((pa||{})[X]||[]).dataPass,index:ra};V.setId(oa);var ua=b.doc.getElementById(na),va=b.utils.items.getItem(na),wa=ja.call(~va?b.mod.getMod(va):ua,la,sa,ka,ta);if(na&&ua){var xa=function(){b.redraw(ua,va,1)};wa&&wa.then?wa.then(function(ya){return xa(),ya}):xa()}return wa}.bind({},ha,ga);return ia}function M(ga,ha){function ia(ja){var ka=ga[X].eventHandlers[ha];for(var la in ka){var ma=ka[la],na=L(ga,ma),oa=na(ja);!1===oa&&ja.preventDefault()}}ga.removeEventListener(ha,ia),ga.addEventListener(ha,ia)}function N(ga,ha,ia,ja){var ka=ha.substr(2).toLowerCase(),la=('string'==typeof ja?ja.split('/')[0]:'')+'-'+ia[X].uid,ma=ia[X].events=ia[X].events||[],na=ia[X].eventHandlers=ia[X].eventHandlers||[];na[ka]=na[ka]||[],na[ka][la]=ga,ma[ka]||(ma[ka]=1,M(ia,ka))}function O(ga,ha,ia,ja){var ka=y(ia);for(var la in W[j(ga)]=W[j(ga)]||[],ha)if('text'!==la&&'html'!==la)if(0==la.indexOf('on'))N(ha[la],la,ga,ja);else{if('config'==la){var ia=u(ga),ka=y(ia),ma=!0;W[ia+'-config']?ma=!1:W[ia+'-config']={};var na=W[ia+'-config'].configContext=W[ia+'-config'].configContext||{},oa=function(sa,ta){return function(){return sa.apply(sa,ta)}};f[ia]=oa(ha[la],[ga,ma,na,ka]);continue}var pa={key:la,value:ha[la],node:ga};if(b.hook('attributes',la,pa),pa.change&&(la=pa.key,ha[la]=pa.value),W[j(ga)]&&W[j(ga)][la]==ha[la])continue;null===ha[la]?ga.removeAttribute(la):'value'==la&&ga.multiple&&ga.selectedOptions&&Array.isArray(ha[la])?(ga.value=ha[la],ha[la].forEach(function(sa){Array.from(ga.options).find(ta=>ta.value==sa).selected=!0})):la in ga?'style'==la?ga[la].cssText=ha[la]:ga[la]=ha[la]:ga.setAttribute(la,ha[la]+''),W[j(ga)][la]=ha[la]}P(ga,ha.text),Q(ga,ha.html)}function P(ga,ha){if(ga&&null!=ha&&!o(ga,ha)){var ia=ha+'';if('INPUT'!==ga.nodeName)'SELECT'!==ga.nodeName&&(ga.firstChild?ga.firstChild.textContent=ia:ga.appendChild(ga.ownerDocument.createTextNode(ia)));else if(!~['radio','checkbox'].indexOf(ga.type))ia!=ga.value&&(ga.value=ia);else if(ga.name){var ja=b.getNode(V.id).querySelectorAll('[name='+ga.name+']');if(1<ja.length)for(var ka of ja)if(ka.value==ia){ka.checked=!0;break}}'SELECT'===ga.nodeName&&ia&&(ga.value=ia)}}function Q(ga,ha){var ia='';if(Array.isArray(ha)){for(var ja in ha)o(ha[ja],ha[ja].outerHTML)||(ga.children[ja]?ga.replaceChild(ha[ja],ga.children[ja]):ga.appendChild(ha[ja]));return}return b.utils.isHTMLEle(ha)?(ia=ha.outerHTML,o(ga,ia))?void 0:void ga.appendChild(ha):void(!ga||null==ha||o(ga,ha)||(ga.innerHTML=ha))}function R(ga,ha,ia){var ja=T(ga),ka=[],la=ha,ma='$'===ha[0];'$'===la[0]&&(la=la.substr(1));for(var na=0;na<ja.length;na+=1)U(ja[na],la)&&ka.push(ja[na]);if(!ka.length||ma)for(var na=0;na<ja.length&&(ka=ka.concat(R(ja[na],ha,!0)),!ka.length||ma);na++);if(!ia&&!ka.length){var oa={key:ha,value:ka,node:ga};b.hook('elementMatcher',ha,oa),oa.change&&(ka=oa.value)}return ka}function S(ga){return V.id&&(b.utils.isHTMLEle(V.id)&&ga[X]&&ga[X].scid||ga.id&&ga.id!=V.id&&b.utils.items.isItem(ga.id))?0:1}function T(ga){var ha=[];if(ga){var ia=ga.childNodes;if(ia)for(var ja=0;ja<ia.length;ja+=1)1===ia[ja].nodeType&&S(ia[ja])&&ha.push(ia[ja])}return ha}function U(ga,ha){var ia=' '+ga.className+' ';return ga.id===ha||~ia.indexOf(' '+ha+' ')||ga.name===ha||ga.nodeName.toLowerCase()===ha.toLowerCase()||ga.getAttribute('data-bind')===ha}var V={cached:[],ignorekeys:['toString','draw','then','hasOwnProperty','willgetprops','onbeforeunload','Symbol(Symbol.toStringTag)','nodeType','toJSON','onunload','willupdate','didupdate','didload','willload','isupdate']},W=V.cached,X=b.MAGNUM,Z='undefined',$='_key',_=[],aa=[],ba={},ca=0;V.run=function(ga,ha,ia){var ja,ka;if(ga){null==ha&&(ha={_text:''});var la=K(ga);if(ka=h(ha),ka){if(ba[ia]&&0===la.length&&(ba[ia].parent.insertAdjacentHTML('beforeend',ba[ia].node),la=K(ba[ia].parent.children)),!la.length)return;var ma=la[0].parentNode;ba[ia]||(ba[ia]={node:la[0].cloneNode(1).outerHTML,parent:ma});for(var na=b.doc.createDocumentFragment(),oa=0;la.length<ha.length;)ba[ia]?(ma.insertAdjacentHTML('beforeend',ba[ia].node),ja=ma.lastChild):ja=la[0].cloneNode(1),B(ja,++oa,ia),la.push(ja),na.appendChild(ja);ma.appendChild(na);var pa=ha.map(function(ua){return ua&&ua[$]});if((la.length==ha.length||-1!==pa.indexOf(g))&&(ha=ha.map(function(ua,va){if('object'==typeof ua){if(la[va][X]=la[va][X]||{},la[va][X].__key&&typeof ua[$]==Z)return ua[$]=la[va][X].__key,ua;typeof ua[$]==Z&&(ua[$]=X+va),la[va][X].__key=ua[$]}return ua})),la.length>ha.length)if(0===ha.length||'object'!=typeof ha[0])for(;la.length>ha.length;)ja=la.pop(),ma=ja.parentNode,ma&&w(ja);else{var qa=[],ra=ha.map(function(ua){return ua[$]});la=la.filter(function(ua){var wa;return(typeof ua[X]==Z?wa=1:(!~ra.indexOf(ua[X].__key)||~qa.indexOf(ua[X].__key))&&(qa.push(ua[X].__key),wa=1),wa)?(w(ua),!1):(qa.push(ua[X].__key),!0)})}}for(var sa=0;sa<la.length;sa++)if(ka)la[sa]&&V.run(la[sa],ha[sa],sa);else{var ta=B(la[sa],sa+1,ia);ha&&'object'==typeof ha&&ha.hasOwnProperty($)&&!b.utils.isHTMLEle(ha)&&(la[sa][X].isItem=!0,la[sa][X].dataPass=ha),H(la[sa],ha,ta,ia)}}};var da=[],ea=function(ga,ha,ia,ja){var ka=j(ha),la=_[ka];la?ja=la:(ja=t(ha),_[ka]=ja),ia=z(ja);var ma=ga(ia.join('.'),ja);return ma&&b.utils.isHTMLEle(ma)?void(D(ha,ma),ha[X]=ha[X]||{},ha[X].isItem=!0,ha[X].dataPass={index:ia},ga.draw&&ga.draw()):H(ha,ma,ja)},fa=[];V.removeNode=w,V.configs=f,V.find=R,V.setId=ga=>{V.id=ga},V.clearCache=ga=>{aa[ga]&&delete aa[ga]},b.fill=V}(mag,[]),function(b){function g(j,l,n,o){function q(t){return r.has(t)}var r=new WeakSet;return new Proxy(j,{get:function(t,u,w){var y=t[u];if('symbol'==typeof u)return y;if('object'!=typeof y||'symbol'==typeof y||null===y||'function'==typeof y||Array.isArray(y)||!b.utils.isObject(y)||y.then||y.draw)u in t||~b.fill.ignorekeys.indexOf(u.toString())||n||'_'==u[0]||(y=b.proxy({},l,n,o+h+u));else if(!q(y))return r.add(y),b.proxy(y,l,n,o+h+u);var z=l({type:'get',object:t,name:u,path:o,oldValue:Reflect.get(t,u,w)});return'undefined'!=typeof z&&(y=z==b.MAGNUM?void 0:z),y},deleteProperty:function(t,u){return l({type:'delete',name:u,object:t,oldValue:Reflect.get(t,u)}),Reflect.deleteProperty(t,u)},set:function(t,u,w,y){var z=Reflect.get(t,u,y);return z===w&&'length'!==u||(l({type:'set',name:u,object:t,oldValue:z}),Reflect.set(t,u,w,y))}})}var h='/';b.proxy=function(j,l,n,o){for(var q in j){var r=typeof j[q];Array.isArray(j[q])&&101>j[q].length?j[q]=g(j[q],l):'object'==r&&null!==j[q]&&'symbol'!=typeof q&&'symbol'!=r&&'function'!=r&&b.utils.isObject(j[q])&&(j[q]=b.proxy(j[q],l,n,o+h+q))}return g(j,l,n,o||h)}}(mag,window||global||this);