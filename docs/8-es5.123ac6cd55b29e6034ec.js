!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var i=0;i<t.length;i++){var e=t[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function i(n,i,e){return i&&t(n.prototype,i),e&&t(n,e),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{CAGU:function(t,e,o){"use strict";o.r(e),o.d(e,"routes",function(){return k}),o.d(e,"AuthenticationModule",function(){return j});var a=o("ofXK"),c=o("tyNb"),r=o("bGsp"),s=o("3Pt+"),g=o("fXoL"),d=o("Gj1m"),u=o("XiUz"),f=o("6NWb"),l=o("sYmb");function _(n,t){1&n&&g.Ob(0,"fa-icon",15)}function h(n,t){1&n&&(g.Ob(0,"input",16),g.fc(1,"translate")),2&n&&g.jc("placeholder",g.gc(1,1,"COMMON.FIRST_NAME"))}function p(n,t){1&n&&g.Ob(0,"fa-icon",15)}function m(n,t){1&n&&(g.Ob(0,"input",17),g.fc(1,"translate")),2&n&&g.jc("placeholder",g.gc(1,1,"COMMON.LAST_NAME"))}function b(n,t){1&n&&(g.Sb(0,"span"),g.Cc(1),g.fc(2,"translate"),g.Rb()),2&n&&(g.Db(1),g.Dc(g.gc(2,1,"AUTHENTICATION.ERRORS.EMAIL_REQUIRED")))}function O(n,t){1&n&&(g.Sb(0,"span"),g.Cc(1),g.fc(2,"translate"),g.Rb()),2&n&&(g.Db(1),g.Dc(g.gc(2,1,"AUTHENTICATION.ERRORS.EMAIL_INVALID")))}function C(n,t){1&n&&(g.Sb(0,"span"),g.Cc(1),g.fc(2,"translate"),g.Rb()),2&n&&(g.Db(1),g.Dc(g.gc(2,1,"AUTHENTICATION.ERRORS.PASSWORD_REQUIRED")))}function I(n,t){1&n&&(g.Sb(0,"span"),g.Cc(1),g.fc(2,"translate"),g.Rb()),2&n&&(g.Db(1),g.Ec(" ",g.gc(2,1,"AUTHENTICATION.ERRORS.PASSWORD_INVALID"),""))}function x(n,t){1&n&&(g.Sb(0,"button"),g.Cc(1),g.fc(2,"translate"),g.Rb()),2&n&&(g.Db(1),g.Ec(" ",g.gc(2,1,"COMMON.SIGN_IN")," "))}function v(n,t){1&n&&(g.Sb(0,"button"),g.Cc(1),g.fc(2,"translate"),g.Rb()),2&n&&(g.Db(1),g.Ec(" ",g.gc(2,1,"COMMON.SIGN_UP")," "))}function M(n,t){if(1&n){var i=g.Tb();g.Sb(0,"div",18),g.Cc(1),g.fc(2,"translate"),g.Sb(3,"span",19),g.ac("click",function(){return g.tc(i),g.ec().isSignIn=!1}),g.Cc(4),g.fc(5,"translate"),g.Rb(),g.Rb()}2&n&&(g.Db(1),g.Ec(" ",g.gc(2,2,"AUTHENTICATION.ERRORS.DO_NOT_HAVE_ACCOUNT")," "),g.Db(3),g.Ec(" ",g.gc(5,4,"COMMON.SIGN_UP"),""))}function P(n,t){if(1&n){var i=g.Tb();g.Sb(0,"div",18),g.Cc(1),g.fc(2,"translate"),g.Sb(3,"span",19),g.ac("click",function(){return g.tc(i),g.ec().isSignIn=!0}),g.Cc(4),g.fc(5,"translate"),g.Rb(),g.Rb()}2&n&&(g.Db(1),g.Ec(" ",g.gc(2,2,"AUTHENTICATION.ERRORS.ALREADY_HAVE_ACCOUNT")," "),g.Db(3),g.Dc(g.gc(5,4,"COMMON.SIGN_IN")))}var R,w=((R=function(){function t(i,e){n(this,t),this.fb=i,this.authService=e,this.isEmailInvalid=!1,this.isEmailRequired=!1,this.isPasswordInvalid=!1,this.isPasswordRequired=!1,this.isSignIn=!0,this.signInForm=this.fb.group({email:["samvelgevorgyan87@gmail.com",[s.n.required,s.n.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],password:["asdasdsad",[s.n.required,s.n.minLength(6)]],firstName:[""],lastName:[""]})}return i(t,[{key:"ngOnInit",value:function(){}},{key:"email",get:function(){return this.signInForm.get("email")}},{key:"password",get:function(){return this.signInForm.get("password")}},{key:"firstName",get:function(){return this.signInForm.get("firstName")}},{key:"lastName",get:function(){return this.signInForm.get("lastName")}},{key:"validation",value:function(){return this.email.errors?(this.email.errors.required?(this.isEmailRequired=!0,this.isEmailInvalid=!1):this.email.errors.pattern&&(this.isEmailRequired=!1,this.isEmailInvalid=!0),!1):(this.isEmailInvalid=!1,this.isEmailRequired=!1,this.password.errors?(this.password.errors.required?(this.isPasswordRequired=!0,this.isPasswordInvalid=!1):this.password.errors.minlength&&(this.isPasswordRequired=!1,this.isPasswordInvalid=!0),!1):(this.isPasswordRequired=!1,this.isPasswordInvalid=!1,!0))}},{key:"authenticate",value:function(){if(this.validation())if(this.isSignIn)this.authService.signIn(this.email.value,this.password.value);else{var n={email:this.email.value,emailVerified:!1,firstName:this.firstName.value,lastName:this.lastName.value,password:this.password.value.trim(),uid:""};this.authService.signUp(n).then(function(n){console.log("result arden componentum",n)})}}},{key:"restorePassword",value:function(){this.email.value&&this.authService.forgotPassword(this.email.value.trim())}}]),t}()).\u0275fac=function(n){return new(n||R)(g.Nb(s.b),g.Nb(d.a))},R.\u0275cmp=g.Hb({type:R,selectors:[["jungle-auth"]],decls:26,vars:22,consts:[["fxLayout","column","fxLayoutAlign","center center",1,"auth_cont"],[1,"sing_in_main"],[1,"sing_in_main_form_div"],["fxLayout","column","fxLayoutAlign","center start",3,"formGroup","ngSubmit"],["icon","user",4,"ngIf"],["type","text","formControlName","firstName",3,"placeholder",4,"ngIf"],["type","text","formControlName","lastName",3,"placeholder",4,"ngIf"],["icon","envelope"],["type","text","formControlName","email",3,"placeholder"],["icon","lock"],["type","text","formControlName","password",3,"placeholder"],[1,"error_div"],[4,"ngIf"],["class","helper_text",4,"ngIf"],[1,"forgot_password",3,"click"],["icon","user"],["type","text","formControlName","firstName",3,"placeholder"],["type","text","formControlName","lastName",3,"placeholder"],[1,"helper_text"],[3,"click"]],template:function(n,t){1&n&&(g.Sb(0,"div",0),g.Sb(1,"div",1),g.Sb(2,"div",2),g.Sb(3,"form",3),g.ac("ngSubmit",function(){return t.authenticate()}),g.Bc(4,_,1,0,"fa-icon",4),g.Bc(5,h,2,3,"input",5),g.Bc(6,p,1,0,"fa-icon",4),g.Bc(7,m,2,3,"input",6),g.Ob(8,"fa-icon",7),g.Ob(9,"input",8),g.fc(10,"translate"),g.Ob(11,"fa-icon",9),g.Ob(12,"input",10),g.fc(13,"translate"),g.Sb(14,"div",11),g.Bc(15,b,3,3,"span",12),g.Bc(16,O,3,3,"span",12),g.Bc(17,C,3,3,"span",12),g.Bc(18,I,3,3,"span",12),g.Rb(),g.Bc(19,x,3,3,"button",12),g.Bc(20,v,3,3,"button",12),g.Rb(),g.Bc(21,M,6,6,"div",13),g.Bc(22,P,6,6,"div",13),g.Sb(23,"div",14),g.ac("click",function(){return t.restorePassword()}),g.Cc(24),g.fc(25,"translate"),g.Rb(),g.Rb(),g.Rb(),g.Rb()),2&n&&(g.Db(3),g.jc("formGroup",t.signInForm),g.Db(1),g.jc("ngIf",!t.isSignIn),g.Db(1),g.jc("ngIf",!t.isSignIn),g.Db(1),g.jc("ngIf",!t.isSignIn),g.Db(1),g.jc("ngIf",!t.isSignIn),g.Db(2),g.jc("placeholder",g.gc(10,16,"FOOTER.EMAIL")),g.Db(3),g.jc("placeholder",g.gc(13,18,"COMMON.PASSWORD")),g.Db(3),g.jc("ngIf",t.isEmailRequired),g.Db(1),g.jc("ngIf",t.isEmailInvalid),g.Db(1),g.jc("ngIf",t.isPasswordRequired),g.Db(1),g.jc("ngIf",t.isPasswordInvalid),g.Db(1),g.jc("ngIf",t.isSignIn),g.Db(1),g.jc("ngIf",!t.isSignIn),g.Db(1),g.jc("ngIf",t.isSignIn),g.Db(1),g.jc("ngIf",!t.isSignIn),g.Db(2),g.Ec(" ",g.gc(25,20,"AUTHENTICATION.VERIFICATION.FORGOT_PASSWORD")," "))},directives:[u.e,u.d,s.o,s.i,s.d,a.k,f.a,s.a,s.h,s.c],pipes:[l.c],styles:[".auth_cont[_ngcontent-%COMP%]{height:calc(100vh - 371px);background-color:#fff;margin:auto;width:1280px}@media (min-width:1280px) and (max-width:1399px){.auth_cont[_ngcontent-%COMP%]{width:1200px}}@media (min-width:960px) and (max-width:1279px){.auth_cont[_ngcontent-%COMP%]{width:900px}}@media (min-width:600px) and (max-width:959px){.auth_cont[_ngcontent-%COMP%]{width:583px}}@media (max-width:599px){.auth_cont[_ngcontent-%COMP%]{width:100%}}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]{background-color:#fff;padding:30px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);width:320px}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   .error_div[_ngcontent-%COMP%]{color:red;min-height:50px;text-align:center;width:100%}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   .error_div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:100%}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:relative;width:100%;margin:0 0 13px;padding:10px 26px;font-family:Cormorant,serif;font-size:17px;font-weight:400;font-style:italic;color:#000;border:1px solid #e3e3e3;box-sizing:border-box;transition:border-color .2s ease-in-out}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#c19d56}@media (max-width:959px){.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:300px}}@media (max-width:374px){.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:250px}}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{box-shadow:inset -2px -34px 17px -22px #ffdcb2;background:#f0f0f0 linear-gradient(180deg,#f0f0f0 5%,#e0b462);border-radius:6px;border:1px solid #fafafa;display:inline-block;cursor:pointer;color:#fff;font-size:23px;font-weight:700;padding:20px 60px;text-decoration:none;text-shadow:-2px -1px 14px #c19d56;width:100%}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#e0b462 linear-gradient(180deg,#e0b462 5%,#f0f0f0)}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .helper_text[_ngcontent-%COMP%]{text-align:center}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .helper_text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#c19d56;font-weight:600;cursor:pointer}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .forgot_password[_ngcontent-%COMP%]{color:#c19d56;text-align:center;margin-top:20px;cursor:pointer}"]}),R),N=o("IzEk"),E=o("Avyq"),S=o("tLuA"),A=o("bTqV");function T(n,t){if(1&n){var i=g.Tb();g.Sb(0,"span"),g.Cc(1),g.fc(2,"translate"),g.Sb(3,"p"),g.Cc(4),g.fc(5,"translate"),g.Sb(6,"button",5),g.ac("click",function(){return g.tc(i),g.ec().reSendEmailVerify()}),g.Cc(7),g.fc(8,"translate"),g.Rb(),g.Rb(),g.Rb()}2&n&&(g.Db(1),g.Ec("",g.gc(2,3,"AUTHENTICATION.VERIFICATION.ERRORS.MALFORMED")," "),g.Db(3),g.Ec(" ",g.gc(5,5,"AUTHENTICATION.VERIFICATION.ERRORS.RESEND_CODE_TEXT")," "),g.Db(3),g.Ec(" ",g.gc(8,7,"COMMON.CLICK_HERE")," "))}var D,y,k=[{path:"",component:w},{path:"verification",component:(D=function(){function t(i,e,o,a){n(this,t),this.auth=i,this.localize=e,this.router=o,this.toast=a,this.malformed=!1}return i(t,[{key:"ngOnInit",value:function(){var n=this;this.auth.isLoggedIn().pipe(Object(N.a)(1)).subscribe(function(t){if(console.log("useeer",t),t&&!1===t.emailVerified)n.auth.verifyCode().then(function(t){console.log("res from verification conp",t),"boolean"==typeof t?n.toast.success("AUTHENTICATION.VERIFICATION.ERRORS.VERIFICATION_SUCCESS").then(function(){var t=n.localize.translateRoute("/authentication");n.router.navigate([t])}):t.message.includes("malformed")&&(n.malformed=!0)});else{var i=n.localize.translateRoute("/authentication");n.router.navigate([i])}})}},{key:"reSendEmailVerify",value:function(){}}]),t}(),D.\u0275fac=function(n){return new(n||D)(g.Nb(d.a),g.Nb(E.c),g.Nb(c.j),g.Nb(S.a))},D.\u0275cmp=g.Hb({type:D,selectors:[["jungle-verification"]],decls:5,vars:1,consts:[["fxLayout","column","fxLayoutAlign","center center",1,"auth_cont"],[1,"verification_main"],[1,"message_dive"],[1,"error_div"],[4,"ngIf"],["mat-button","","color","primary",3,"click"]],template:function(n,t){1&n&&(g.Sb(0,"div",0),g.Sb(1,"div",1),g.Ob(2,"div",2),g.Sb(3,"div",3),g.Bc(4,T,9,9,"span",4),g.Rb(),g.Rb(),g.Rb()),2&n&&(g.Db(4),g.jc("ngIf",t.malformed))},directives:[u.e,u.d,a.k,A.a],pipes:[l.c],styles:[".auth_cont[_ngcontent-%COMP%]{height:calc(100vh - 371px);background-color:#fff;margin:auto;width:1280px}@media (min-width:1280px) and (max-width:1399px){.auth_cont[_ngcontent-%COMP%]{width:1200px}}@media (min-width:960px) and (max-width:1279px){.auth_cont[_ngcontent-%COMP%]{width:900px}}@media (min-width:600px) and (max-width:959px){.auth_cont[_ngcontent-%COMP%]{width:583px}}@media (max-width:599px){.auth_cont[_ngcontent-%COMP%]{width:100%}}.auth_cont[_ngcontent-%COMP%]   .verification_main[_ngcontent-%COMP%]{background-color:#fff;padding:30px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);width:320px}.auth_cont[_ngcontent-%COMP%]   .verification_main[_ngcontent-%COMP%]   .error_div[_ngcontent-%COMP%]{color:red;min-height:50px;text-align:center;width:100%}.auth_cont[_ngcontent-%COMP%]   .verification_main[_ngcontent-%COMP%]   .error_div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:100%}"]}),D)}],j=((y=function t(){n(this,t)}).\u0275fac=function(n){return new(n||y)},y.\u0275mod=g.Lb({type:y}),y.\u0275inj=g.Kb({imports:[[a.c,c.m.forChild(k),r.a]]}),y)}}])}();