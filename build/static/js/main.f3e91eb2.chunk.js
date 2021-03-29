(this["webpackJsonpchat-react"]=this["webpackJsonpchat-react"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n(1),r=n.n(i),s=n(13),a=n.n(s),c=n(12),u=(n(21),n(4)),l=n(5),m=n(7),p=n(6),h=n(2),d=(n(22),function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var o;return Object(u.a)(this,n),(o=t.call(this,e)).unsubscribe=e.store.subscribe((function(){document.querySelector(".loading")&&h.a.fromTo(".loading",{opacity:1},{opacity:0,duration:.15})})),o}return Object(l.a)(n,[{key:"componentDidMount",value:function(){h.a.from(".loading",{opacity:0,duration:.25})}},{key:"componentWillUnmount",value:function(){this.unsubscribe()}},{key:"render",value:function(){return Object(o.jsx)("div",{className:"loading"})}}]),n}(r.a.Component)),g=n(9),b=(n(23),function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.querySelector(".".concat(this.props.type.replace(" ","-").toLowerCase()+"-btn")).addEventListener("click",this.props.onClick),("Log In"===this.props.type||"Submit"===this.props.type)&&document.addEventListener("keydown",this.props.enterPress)}},{key:"componentWillUnmount",value:function(){document.querySelector(".".concat(this.props.type.replace(" ","-").toLowerCase()+"-btn")).removeEventListener("click",this.props.onClick),("Log In"===this.props.type||"Submit"===this.props.type)&&document.removeEventListener("keydown",this.props.enterPress)}},{key:"render",value:function(){return Object(o.jsx)("button",{className:this.props.type.replace(" ","-").toLowerCase()+"-btn",children:this.props.type})}}]),n}(r.a.Component)),O=(n(24),function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.querySelector("#".concat(this.props.placeholder.toLowerCase())).addEventListener("input",this.inputChange.bind(this))}},{key:"componentWillUnmount",value:function(){document.querySelector("#".concat(this.props.placeholder.toLowerCase())).removeEventListener("input",this.inputChange.bind(this))}},{key:"inputChange",value:function(e){0!==e.target.value.length?h.a.to("#".concat(e.target.id),{borderColor:"#04bc00",duration:.15}):h.a.to("#".concat(e.target.id),{borderColor:"#c40021",duration:.15})}},{key:"render",value:function(){return Object(o.jsx)("input",{type:this.props.placeholder.toLowerCase(),placeholder:this.props.placeholder,id:this.props.placeholder.toLowerCase(),className:"input-form",maxLength:35})}}]),n}(r.a.Component)),y=(n(25),function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var o;return Object(u.a)(this,n),(o=t.call(this,e)).state={isLoginForm:e.store.getState().wasLogin,isSignInForm:!1,errorMessage:void 0},o.logOrSignInClick=o.logOrSignInClick.bind(Object(g.a)(o)),o.submitClick=o.submitClick.bind(Object(g.a)(o)),o.enterPress=o.enterPress.bind(Object(g.a)(o)),o}return Object(l.a)(n,[{key:"logOrSignInClick",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return function(){var n=this,o=this.props.authTimeoutDuration;if(this._opacityAnimation(o),this.logOrSignInClickTimeoit=setTimeout((function(){n.setState((function(){return{isLoginForm:"login"===e,isSignInForm:"signIn"===e,errorMessage:void 0}})),clearTimeout(n.logOrSignInClickTimeoit)}),1e3*o),t){var i={email:document.querySelector("#email"),password:document.querySelector("#password"),username:document.querySelector("#username")};this._inputsToDefault(i)}}.bind(this)}},{key:"submitClick",value:function(){var e=this,t=this._getInfo();if(this.state.isLoginForm)if(t.email&&t.password){this.props.store.getState().api.logIn(t.email,t.password),this.logInAnimationUnsubscribe=this.props.store.subscribe((function(){e.props.store.getState().auth&&e._opacityAnimation(.2,!0)})),{email:document.querySelector("#email"),password:document.querySelector("#password"),username:document.querySelector("#username")}.email.focus()}else this._inputsToRed(t);else if(this.state.isSignInForm)if(t.email&&t.password&&t.username){this._opacityAnimation(.2),this.signInTimeout=setTimeout((function(){e.props.store.getState().api.signIn(t.email,t.password,t.username);var n={email:document.querySelector("#email"),password:document.querySelector("#password"),username:document.querySelector("#username")};n.email.focus(),e._clearInputs(n),e._inputsToDefault(n),e.setState((function(){return{isLoginForm:!0,isSignInForm:!1}})),clearTimeout(e.signInTimeout)}),200)}else this._inputsToRed(t)}},{key:"enterPress",value:function(e){"Enter"!==e.key||this.state.isLoginForm||this.state.isSignInForm?"Enter"===e.key&&(this.state.isLoginForm||this.state.isSignInForm)&&this.submitClick():this.logOrSignInClick("login")()}},{key:"componentDidMount",value:function(){var e=this;this.unsubscribeError=this.props.store.subscribe((function(){e.setState((function(e,t){return{errorMessage:t.store.getState().errorForm}}))})),h.a.from(".form",{opacity:0,duration:.75})}},{key:"componentWillUnmount",value:function(){this.opacityTimeout&&clearTimeout(this.opacityTimeout),this.signInTimeout&&clearTimeout(this.signInTimeout),this.logOrSignInClickTimeoit&&clearTimeout(this.logOrSignInClickTimeoit),this.logInAnimationUnsubscribe(),this.unsubscribeError()}},{key:"_opacityAnimation",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];h.a.fromTo(".form",{opacity:1},{opacity:0,duration:e}),n||(this.opacityTimeout=setTimeout((function(){h.a.fromTo(".form",{opacity:0},{opacity:1,duration:e}),clearTimeout(t.opacityTimeout)}),1e3*e))}},{key:"_getInfo",value:function(){return{email:document.querySelector("#email").value,password:document.querySelector("#password").value,username:this.state.isSignInForm?document.querySelector("#username").value:void 0}}},{key:"_inputsToRed",value:function(e){e.email||h.a.to("#email",{borderColor:"#c40021"}),e.password||h.a.to("#password",{borderColor:"#c40021"}),this.state.isSignInForm&&(e.username||h.a.to("#username",{borderColor:"#c40021"}))}},{key:"_inputsToDefault",value:function(e){for(var t in e)e.hasOwnProperty(t)&&e[t]&&(e[t].value||(e[t].style.borderColor="#e0e0e0"))}},{key:"_clearInputs",value:function(e){for(var t in e)e.hasOwnProperty(t)&&e[t]&&e[t].value&&(e[t].value="")}},{key:"_getInfoForm",value:function(e){return Object(o.jsxs)("div",{className:"form",children:[Object(o.jsx)("h2",{className:"title",children:"login"===e?"Log In":"Sign In"}),this.state.errorMessage?Object(o.jsx)("h3",{className:"errorMessage",children:this.state.errorMessage}):"","signIn"===e?Object(o.jsx)(O,{placeholder:"UserName"}):"",Object(o.jsx)(O,{placeholder:"Email"}),Object(o.jsx)(O,{placeholder:"Password"}),Object(o.jsx)(b,{type:"Submit",onClick:this.submitClick,enterPress:this.enterPress}),"signIn"===e?"":Object(o.jsx)(b,{type:"Sign In",onClick:this.logOrSignInClick("signIn",!0)}),"login"===e?"":Object(o.jsx)(b,{type:"Log In",onClick:this.logOrSignInClick("login",!0)})]})}},{key:"render",value:function(){return this.state.isLoginForm?this._getInfoForm("login"):this.state.isSignInForm?this._getInfoForm("signIn"):Object(o.jsxs)("div",{className:"form",children:[Object(o.jsx)("h2",{className:"title",children:"Chat-React"}),Object(o.jsx)(b,{type:"Log In",onClick:this.logOrSignInClick("login"),enterPress:this.enterPress}),Object(o.jsx)(b,{type:"Sign In",onClick:this.logOrSignInClick("signIn")})]})}}]),n}(r.a.Component));function f(e){var t=Object(i.useState)(e.store.getState().connectionOpened),n=Object(c.a)(t,2),r=n[0],s=n[1],a=Object(i.useState)(e.store.getState().auth),u=Object(c.a)(a,2),l=u[0],m=u[1],p=e.store.subscribe((function(){var t=setTimeout((function(){s(e.store.getState().connectionOpened),clearTimeout(t)}),150),n=setTimeout((function(){m(e.store.getState().auth),clearTimeout(n)}),200)}));return Object(i.useEffect)((function(){return function(){p()}})),Object(o.jsx)(o.Fragment,{children:r?Object(o.jsx)("div",{className:"App",children:l?Object(o.jsx)("p",{children:"MainPage"}):Object(o.jsx)(y,{store:e.store,authTimeoutDuration:.2})}):Object(o.jsx)(d,{store:e.store})})}var j=n(14),v=n(3);var S=function(e,t){switch(t.type){case"LOGIN":return Object(v.a)(Object(v.a)({},e),{},{auth:!0,errorForm:void 0});case"SIGN_IN":return Object(v.a)(Object(v.a)({},e),{},{errorForm:void 0});case"CONNECTION_OPENED":return Object(v.a)(Object(v.a)({},e),{},{connectionOpened:!0});case"WRONG_EMAIL_OR_PASSWORD":return Object(v.a)(Object(v.a)({},e),{},{errorForm:"Wrong Email or Password"});case"ALREADY_EXIST":return Object(v.a)(Object(v.a)({},e),{},{errorForm:"User with this Email is already exist"});default:return e}},k=n(8),I=n.n(k),C={api:new(function(){function e(t){Object(u.a)(this,e),this.messageList=[];try{this.socket=new WebSocket(t),this.socket.onopen=function(){T.dispatch({type:"CONNECTION_OPENED"})}}catch(n){console.log("Server-Error. ".concat(n))}}return Object(l.a)(e,[{key:"signIn",value:function(e,t,n){var o={command:"user_create",name:n,email:e,password:t};this.socket.send(JSON.stringify(o)),this.socket.onmessage=function(e){1===JSON.parse(e.data).status?T.dispatch({type:"SIGN_IN"}):T.dispatch({type:"ALREADY_EXIST"})}}},{key:"logIn",value:function(e,t){var n={command:"user_login",email:e,password:t};this.socket.send(JSON.stringify(n)),this.socket.onmessage=function(e){var t=JSON.parse(e.data);1===t.status?(I.a.set("user_key",t.user_key,{path:"/",expires:7}),I.a.set("name",t.name,{path:"/",expires:7}),T.dispatch({type:"LOGIN"})):T.dispatch({type:"WRONG_EMAIL_OR_PASSWORD"})}}}]),e}())("ws://127.0.0.1:5025"),auth:!(!I.a.get("name")||!I.a.get("user_key")),wasLogin:!!I.a.get("wasLogin"),connectionOpened:!1,errorForm:void 0,errorServer:void 0},T=Object(j.a)(S,C);a.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(f,{store:T})}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.f3e91eb2.chunk.js.map