/*!
  * tram.js v0.5.6-global
  * Cross-browser CSS3 transitions in JavaScript.
  * https://github.com/bkwld/tram
  * MIT License
  */
window.tram=function(t){function i(t,i){var e=new T.Bare;return e.init(t,i)}function e(t){return t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})}function n(t){var i=parseInt(t.slice(1),16),e=255&i>>16,n=255&i>>8,r=255&i;return[e,n,r]}function r(t,i,e){return"#"+(1<<24|t<<16|i<<8|e).toString(16).slice(1)}function s(){}function a(t,i){W("Type warning: Expected: ["+t+"] Got: ["+typeof i+"] "+i)}function o(t,i,e){W("Units do not match ["+t+"]: "+i+", "+e)}function u(t){for(var i=-1,e=t?t.length:0,n=[];e>++i;){var r=t[i];r&&n.push(r)}return n}var c=function(t,i,e){function n(t){return"object"==typeof t}function r(t){return"function"==typeof t}function s(){}function a(o,u){function c(){var t=new h;return r(t.init)&&t.init.apply(t,arguments),t}function h(){}u===e&&(u=o,o=Object),c.Bare=h;var l,f=s[t]=o[t],d=h[t]=c[t]=new s;return d.constructor=c,c.mixin=function(i){return h[t]=c[t]=a(c,i)[t],c},c.open=function(t){if(l={},r(t)?l=t.call(c,d,f,c,o):n(t)&&(l=t),n(l))for(var e in l)i.call(l,e)&&(d[e]=l[e]);return r(d.init)||(d.init=o),c},c.open(u)}return a}("prototype",{}.hasOwnProperty),h={ease:["ease",function(t,i,e,n){var r=(t/=n)*t,s=r*t;return i+e*(-2.75*s*r+11*r*r+-15.5*s+8*r+.25*t)}],"ease-in":["ease-in",function(t,i,e,n){var r=(t/=n)*t,s=r*t;return i+e*(-1*s*r+3*r*r+-3*s+2*r)}],"ease-out":["ease-out",function(t,i,e,n){var r=(t/=n)*t,s=r*t;return i+e*(.3*s*r+-1.6*r*r+2.2*s+-1.8*r+1.9*t)}],"ease-in-out":["ease-in-out",function(t,i,e,n){var r=(t/=n)*t,s=r*t;return i+e*(2*s*r+-5*r*r+2*s+2*r)}],linear:["linear",function(t,i,e,n){return e*t/n+i}],"ease-in-quad":["cubic-bezier(0.550, 0.085, 0.680, 0.530)",function(t,i,e,n){return e*(t/=n)*t+i}],"ease-out-quad":["cubic-bezier(0.250, 0.460, 0.450, 0.940)",function(t,i,e,n){return-e*(t/=n)*(t-2)+i}],"ease-in-out-quad":["cubic-bezier(0.455, 0.030, 0.515, 0.955)",function(t,i,e,n){return 1>(t/=n/2)?e/2*t*t+i:-e/2*(--t*(t-2)-1)+i}],"ease-in-cubic":["cubic-bezier(0.550, 0.055, 0.675, 0.190)",function(t,i,e,n){return e*(t/=n)*t*t+i}],"ease-out-cubic":["cubic-bezier(0.215, 0.610, 0.355, 1)",function(t,i,e,n){return e*((t=t/n-1)*t*t+1)+i}],"ease-in-out-cubic":["cubic-bezier(0.645, 0.045, 0.355, 1)",function(t,i,e,n){return 1>(t/=n/2)?e/2*t*t*t+i:e/2*((t-=2)*t*t+2)+i}],"ease-in-quart":["cubic-bezier(0.895, 0.030, 0.685, 0.220)",function(t,i,e,n){return e*(t/=n)*t*t*t+i}],"ease-out-quart":["cubic-bezier(0.165, 0.840, 0.440, 1)",function(t,i,e,n){return-e*((t=t/n-1)*t*t*t-1)+i}],"ease-in-out-quart":["cubic-bezier(0.770, 0, 0.175, 1)",function(t,i,e,n){return 1>(t/=n/2)?e/2*t*t*t*t+i:-e/2*((t-=2)*t*t*t-2)+i}],"ease-in-quint":["cubic-bezier(0.755, 0.050, 0.855, 0.060)",function(t,i,e,n){return e*(t/=n)*t*t*t*t+i}],"ease-out-quint":["cubic-bezier(0.230, 1, 0.320, 1)",function(t,i,e,n){return e*((t=t/n-1)*t*t*t*t+1)+i}],"ease-in-out-quint":["cubic-bezier(0.860, 0, 0.070, 1)",function(t,i,e,n){return 1>(t/=n/2)?e/2*t*t*t*t*t+i:e/2*((t-=2)*t*t*t*t+2)+i}],"ease-in-sine":["cubic-bezier(0.470, 0, 0.745, 0.715)",function(t,i,e,n){return-e*Math.cos(t/n*(Math.PI/2))+e+i}],"ease-out-sine":["cubic-bezier(0.390, 0.575, 0.565, 1)",function(t,i,e,n){return e*Math.sin(t/n*(Math.PI/2))+i}],"ease-in-out-sine":["cubic-bezier(0.445, 0.050, 0.550, 0.950)",function(t,i,e,n){return-e/2*(Math.cos(Math.PI*t/n)-1)+i}],"ease-in-expo":["cubic-bezier(0.950, 0.050, 0.795, 0.035)",function(t,i,e,n){return 0===t?i:e*Math.pow(2,10*(t/n-1))+i}],"ease-out-expo":["cubic-bezier(0.190, 1, 0.220, 1)",function(t,i,e,n){return t===n?i+e:e*(-Math.pow(2,-10*t/n)+1)+i}],"ease-in-out-expo":["cubic-bezier(1, 0, 0, 1)",function(t,i,e,n){return 0===t?i:t===n?i+e:1>(t/=n/2)?e/2*Math.pow(2,10*(t-1))+i:e/2*(-Math.pow(2,-10*--t)+2)+i}],"ease-in-circ":["cubic-bezier(0.600, 0.040, 0.980, 0.335)",function(t,i,e,n){return-e*(Math.sqrt(1-(t/=n)*t)-1)+i}],"ease-out-circ":["cubic-bezier(0.075, 0.820, 0.165, 1)",function(t,i,e,n){return e*Math.sqrt(1-(t=t/n-1)*t)+i}],"ease-in-out-circ":["cubic-bezier(0.785, 0.135, 0.150, 0.860)",function(t,i,e,n){return 1>(t/=n/2)?-e/2*(Math.sqrt(1-t*t)-1)+i:e/2*(Math.sqrt(1-(t-=2)*t)+1)+i}],"ease-in-back":["cubic-bezier(0.600, -0.280, 0.735, 0.045)",function(t,i,e,n,r){return void 0===r&&(r=1.70158),e*(t/=n)*t*((r+1)*t-r)+i}],"ease-out-back":["cubic-bezier(0.175, 0.885, 0.320, 1.275)",function(t,i,e,n,r){return void 0===r&&(r=1.70158),e*((t=t/n-1)*t*((r+1)*t+r)+1)+i}],"ease-in-out-back":["cubic-bezier(0.680, -0.550, 0.265, 1.550)",function(t,i,e,n,r){return void 0===r&&(r=1.70158),1>(t/=n/2)?e/2*t*t*(((r*=1.525)+1)*t-r)+i:e/2*((t-=2)*t*(((r*=1.525)+1)*t+r)+2)+i}]},l={"ease-in-back":"cubic-bezier(0.600, 0, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1)","ease-in-out-back":"cubic-bezier(0.680, 0, 0.265, 1)"},f=document,d=window,p="bkwld-tram-js",b=/[\-\.0-9]/g,m=/[A-Z]/,v="number",g=/^(rgb|#)/,y=/(em|cm|mm|in|pt|pc|px)$/,w=/(em|cm|mm|in|pt|pc|px|%)$/,k=/(deg|rad|turn)$/,x="unitless",z=" ",q=f.createElement("a"),$=["Webkit","Moz","O","ms"],M=["-webkit-","-moz-","-o-","-ms-"],A=function(t){if(t in q.style)return{dom:t,css:t};var i,e,n="",r=t.split("-");for(i=0;r.length>i;i++)n+=r[i].charAt(0).toUpperCase()+r[i].slice(1);for(i=0;$.length>i;i++)if(e=$[i]+n,e in q.style)return{dom:e,css:M[i]+t}},B=i.support={bind:Function.prototype.bind,transform:A("transform"),transition:A("transition"),backface:A("backface-visibility"),timing:A("transition-timing-function")};if(B.transition){var R=B.timing.dom;if(q.style[R]=h["ease-in-back"][0],!q.style[R])for(var F in l)h[F][0]=l[F]}var j=i.frame=function(){return d.requestAnimationFrame||d.webkitRequestAnimationFrame||d.mozRequestAnimationFrame||d.oRequestAnimationFrame||d.msRequestAnimationFrame||function(t){d.setTimeout(t,16)}}(),U=i.now=function(){var t=d.performance,i=t&&(t.now||t.webkitNow||t.msNow||t.mozNow);return i&&B.bind?i.bind(t):Date.now||function(){return+new Date}}(),G=c(function(i){function n(t,i){var e=u((""+t).split(z)),n=e[0];i=i||{};var r=L[n];if(!r)return W("Unsupported property: "+n);if(!i.weak||!this.props[n]){var s=r[0],a=this.props[n];return a||(a=this.props[n]=new s.Bare),a.init(this.$el,e,r,i),a}}function r(t,i){if(t){var e=typeof t;if(i||(this.timer&&this.timer.destroy(),this.queue=[]),"string"==e&&E[t])return r.call(this,E[t]);if("function"==e)return t.call(this,this),void 0;if("object"==e){var n=0;d.call(this,t,function(t,i){t.span>n&&(n=t.span),t.stop(),t.animate(i)}),f.call(this),n>0&&(this.timer=new P({duration:n,context:this}),i&&(this.timer.complete=a));var s=this,o=!1,u={};j(function(){d.call(s,t,function(t){t.active&&(o=!0,u[t.name]=t.nextStyle)}),o&&s.$el.css(u)})}}}function s(t){return this.timer&&this.timer.active?(this.queue.push(t),this.timer.complete=a,void 0):W("No active transition timer. Use start() before then().")}function a(){if(this.timer&&this.timer.destroy(),this.queue.length){var t=this.queue.shift();r.call(this,t,!0)}}function o(t){this.timer&&this.timer.destroy(),this.queue=[];var i;"string"==typeof t?(i={},i[t]=1):i="object"==typeof t?t:this.props,d.call(this,i,p),f.call(this)}function c(t){o.call(this,t),d.call(this,t,b,v)}function h(t){"string"!=typeof t&&(t="block"),this.el.style.display=t}function l(){o.call(this),this.el.style.display="none"}function f(){var t,i,e=[];for(t in this.props)i=this.props[t],i.active&&e.push(i.string);e=e.join(","),this.style!==e&&(this.style=e,this.el.style[B.transition.dom]=e)}function d(t,i,r){var s,a,o,u,c=i!==p,h={};for(s in t)o=t[s],s in Q?(h.transform||(h.transform={}),h.transform[s]=o):(m.test(s)&&(s=e(s)),s in L?h[s]=o:(u||(u={}),u[s]=o));for(s in h){if(o=h[s],a=this.props[s],!a){if(!c)continue;a=n.call(this,s)}i.call(this,a,o)}r&&u&&r.call(this,u)}function p(t){t.stop()}function b(t,i){t.set(i)}function v(t){this.$el.css(t)}function g(t,e){i[t]=function(){return this.children?y.call(this,e,arguments):(e.apply(this,arguments),this)}}function y(t,i){var e,n=this.children.length;for(e=0;n>e;e++)t.apply(this.children[e],i);return this}i.init=function(i){this.$el=t(i),this.el=this.$el[0],this.props={},this.queue=[],this.style="",B.backface&&Y.hideBackface&&H(this.el,B.backface.css,"hidden")},g("add",n),g("start",r),g("then",s),g("next",a),g("stop",o),g("set",c),g("show",h),g("hide",l)}),T=c(G,function(i){function e(i,e){var n=t.data(i,p)||t.data(i,p,new G.Bare);return n.el||n.init(i),e?n.start(e):n}i.init=function(i,n){var r=t(i);if(!r.length)return this;if(1===r.length)return e(r[0],n);var s=[];return r.each(function(t,i){s.push(e(i,n))}),this.children=s,this}}),I=c(function(t){function i(t,i,e){if(void 0!==i&&(e=i),void 0===t)return e;var n=e;return o.test(t)||!u.test(t)?n=parseInt(t,10):u.test(t)&&(n=1e3*parseFloat(t)),0>n&&(n=0),n===n?n:e}function e(t,i,e){return void 0!==i&&(e=i),t in h?t:e}function n(t){var i=/rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(t);return(i?r(i[1],i[2],i[3]):t).replace(/#(\w)(\w)(\w)$/,"#$1$1$2$2$3$3")}var s={duration:500,ease:"ease",delay:0};t.init=function(t,n,r,a){this.$el=t,this.el=t[0];var o=n[0];r[2]&&(o=r[2]),D[o]&&(o=D[o]),this.name=o,this.type=r[1],this.duration=i(n[1],this.duration,s.duration),this.ease=e(n[2],this.ease,s.ease),this.delay=i(n[3],this.delay,s.delay),this.span=this.duration+this.delay,this.active=!1,Y.fallback||a.fallback?this.animate=this.fallback:(this.animate=this.transition,this.string=this.name+z+this.duration+"ms"+("ease"!=this.ease?z+h[this.ease][0]:"")+(this.delay?z+this.delay+"ms":""))},t.set=function(t){t=this.convert(t,this.type),this.update(t),this.redraw()},t.transition=function(t){this.active=!0,this.nextStyle=this.convert(t,this.type)},t.fallback=function(t){this.tween=new O({from:this.convert(this.get(),this.type),to:this.convert(t,this.type),duration:this.duration,delay:this.delay,ease:this.ease,update:this.update,context:this})},t.get=function(){return C(this.el,this.name)},t.update=function(t){H(this.el,this.name,t)},t.stop=function(){this.tween&&this.tween.destroy(),this.active&&(this.active=!1,H(this.el,this.name,this.get()))},t.convert=function(t,i){var e,r="number"==typeof t,s="string"==typeof t;switch(i){case v:if(r)return t;if(s&&""===t.replace(b,""))return+t;e="number(unitless)";break;case g:if(s){if(""===t&&this.original)return this.original;if(i.test(t))return"#"==t.charAt(0)&&7==t.length?t:n(t)}e="hex or rgb string";break;case y:if(r)return t+Y.defaultUnit;if(s&&i.test(t))return t;e="number(px) or string(unit)";break;case w:if(r)return t+Y.defaultUnit;if(s&&i.test(t))return t;e="number(px) or string(unit or %)";break;case k:if(r)return t+Y.defaultAngle;if(s&&i.test(t))return t;e="number(deg) or string(angle)";break;case x:if(r)return t;if(s&&w.test(t))return t;e="number(unitless) or string(unit or %)"}return a(e,t),t},t.redraw=function(){this.el.offsetHeight};var o=/ms/,u=/s|\./}),S=c(I,function(t,i){t.init=function(){i.init.apply(this,arguments),this.original||(this.original=this.convert(this.get(),g))}}),Z=c(I,function(t,i){t.init=function(){i.init.apply(this,arguments),this.animate=this.fallback},t.get=function(){return this.$el[this.name]()},t.update=function(t){this.$el[this.name](t)}}),N=c(I,function(t,i){function e(t,i){var e,n,r,s,a;for(e in t)s=Q[e],r=s[0],n=s[1]||e,a=this.convert(t[e],r),i.call(this,n,a,r)}t.init=function(){i.init.apply(this,arguments),this.current||(this.current={},Q.perspective&&(this.current.perspective="1000px",H(this.el,this.name,this.style(this.current)),this.redraw()))},t.set=function(t){e.call(this,t,function(t,i){this.current[t]=i}),H(this.el,this.name,this.style(this.current)),this.redraw()},t.transition=function(t){var i=this.values(t);this.tween=new X({current:this.current,values:i,duration:this.duration,delay:this.delay,ease:this.ease});var e,n={};for(e in this.current)n[e]=e in i?i[e]:this.current[e];this.active=!0,this.nextStyle=this.style(n)},t.fallback=function(t){var i=this.values(t);this.tween=new X({current:this.current,values:i,duration:this.duration,delay:this.delay,ease:this.ease,update:this.update,context:this})},t.update=function(){H(this.el,this.name,this.style(this.current))},t.style=function(t){var i,e="";for(i in t)e+=i+"("+t[i]+") ";return e},t.values=function(t){var i,n={};return e.call(this,t,function(t,e,r){n[t]=e,void 0===this.current[t]&&(i=0,~t.indexOf("scale")&&(i=1),this.current[t]=this.convert(i,r))}),n}}),O=c(function(i){function e(t){1===d.push(t)&&j(a)}function a(){var t,i,e,n=d.length;if(n)for(j(a),i=U(),t=n;t--;)e=d[t],e&&e.render(i)}function u(i){var e,n=t.inArray(i,d);n>=0&&(e=d.slice(n+1),d.length=n,e.length&&(d=d.concat(e)))}function c(t){return Math.round(t*p)/p}function l(t,i,e){return r(t[0]+e*(i[0]-t[0]),t[1]+e*(i[1]-t[1]),t[2]+e*(i[2]-t[2]))}var f={ease:h.ease[1],from:0,to:1};i.init=function(t){this.duration=t.duration||0,this.delay=t.delay||0;var i=t.ease||f.ease;h[i]&&(i=h[i][1]),"function"!=typeof i&&(i=f.ease),this.ease=i,this.update=t.update||s,this.complete=t.complete||s,this.context=t.context||this,this.name=t.name;var e=t.from,n=t.to;void 0===e&&(e=f.from),void 0===n&&(n=f.to),this.unit=t.unit||"","number"==typeof e&&"number"==typeof n?(this.begin=e,this.change=n-e):this.format(n,e),this.start=U(),t.autoplay!==!1&&this.play()},i.play=function(){this.active||(this.start||(this.start=U()),this.active=!0,e(this))},i.stop=function(){this.active&&(this.active=!1,u(this))},i.render=function(t){var i,e=t-this.start;if(this.delay){if(this.delay>=e)return;e-=this.delay}if(this.duration>e){var n=this.ease(e,0,1,this.duration);return i=this.startRGB?l(this.startRGB,this.endRGB,n):c(this.begin+n*this.change),this.unit&&(i+=this.unit),this.value=i,this.update.call(this.context,i),void 0}i=this.endHex||this.begin+this.change,this.unit&&(i+=this.unit),this.value=i,this.update.call(this.context,i),this.complete.call(this.context),this.destroy()},i.format=function(t,i){if(i+="",t+="","#"==t.charAt(0))return this.startRGB=n(i),this.endRGB=n(t),this.endHex=t,this.begin=0,this.change=1,void 0;if(!this.unit){var e=i.replace(b,""),r=t.replace(b,"");e!==r&&o("tween",i,t),this.unit=e}i=parseFloat(i),t=parseFloat(t),this.begin=this.value=i,this.change=t-i},i.destroy=function(){this.stop(),this.ease=this.update=this.complete=this.context=null};var d=[],p=1e3}),P=c(O,function(t){t.init=function(t){this.duration=t.duration||0,this.complete=t.complete||s,this.context=t.context,this.play()},t.render=function(t){var i=t-this.start;this.duration>i||(this.complete.call(this.context),this.destroy())}}),X=c(O,function(t,i){t.init=function(t){this.context=t.context,this.update=t.update,this.tweens=[],this.current=t.current;var i,e;for(i in t.values)e=t.values[i],this.current[i]!==e&&this.tweens.push(new O({name:i,from:this.current[i],to:e,duration:t.duration,delay:t.delay,ease:t.ease,autoplay:!1}));this.play()},t.render=function(t){var i,e,n=this.tweens.length,r=!1;for(i=n;i--;)e=this.tweens[i],e.ease&&(e.render(t),this.current[e.name]=e.value,r=!0);return r?(this.update&&this.update.call(this.context),void 0):this.destroy()},t.destroy=function(){if(i.destroy.call(this),this.tweens){var t,e=this.tweens.length;for(t=e;t--;)this.tweens[t].destroy();this.tweens=null,this.current=null}}}),Y=i.config={defaultUnit:"px",defaultAngle:"deg",hideBackface:!0,fallback:!B.transition,agentTests:[]};i.fallback=function(t){if(!B.transition)return Y.fallback=!0;Y.agentTests.push("("+t+")");var i=RegExp(Y.agentTests.join("|"),"i");Y.fallback=i.test(navigator.userAgent)},i.fallback("6.0.(2|3) Safari");var E={};i.macro=function(t,i){E[t]=i},i.tween=function(t){return new O(t)},i.delay=function(t,i,e){return new P({complete:t,duration:i,context:e})},t.fn.tram=function(t){return new T(this,t),this};var H=t.style,C=t.css,D={transform:B.transform&&B.transform.css},L={color:[S,g],background:[S,g,"background-color"],"outline-color":[S,g],"border-color":[S,g],"border-top-color":[S,g],"border-right-color":[S,g],"border-bottom-color":[S,g],"border-left-color":[S,g],"border-width":[I,y],"border-top-width":[I,y],"border-right-width":[I,y],"border-bottom-width":[I,y],"border-left-width":[I,y],"border-spacing":[I,y],"letter-spacing":[I,y],margin:[I,y],"margin-top":[I,y],"margin-right":[I,y],"margin-bottom":[I,y],"margin-left":[I,y],padding:[I,y],"padding-top":[I,y],"padding-right":[I,y],"padding-bottom":[I,y],"padding-left":[I,y],"outline-width":[I,y],opacity:[I,v],top:[I,w],right:[I,w],bottom:[I,w],left:[I,w],"font-size":[I,w],"text-indent":[I,w],"word-spacing":[I,w],width:[I,w],"min-width":[I,w],"max-width":[I,w],height:[I,w],"min-height":[I,w],"max-height":[I,w],"line-height":[I,x],"scroll-top":[Z,v,"scrollTop"],"scroll-left":[Z,v,"scrollLeft"]},Q={};B.transform&&(L.transform=[N],Q={x:[w,"translateX"],y:[w,"translateY"],rotate:[k],rotateX:[k],rotateY:[k],scale:[v],scaleX:[v],scaleY:[v],skew:[k],skewX:[k],skewY:[k]}),B.transform&&B.backface&&(Q.z=[w,"translateZ"],Q.rotateZ=[k],Q.scaleZ=[v],Q.perspective=[y]);var W=function(){var t="warn",i=window.console;return i&&i[t]?function(e){i[t](e)}:s}();return t.tram=i}(window.jQuery);