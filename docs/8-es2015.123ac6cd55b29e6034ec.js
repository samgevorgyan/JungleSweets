(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{CAGU:function(n,t,i){"use strict";i.r(t),i.d(t,"routes",function(){return E}),i.d(t,"AuthenticationModule",function(){return A});var e=i("ofXK"),o=i("tyNb"),a=i("bGsp"),c=i("3Pt+"),r=i("fXoL"),s=i("Gj1m"),g=i("XiUz"),d=i("6NWb"),_=i("sYmb");function l(n,t){1&n&&r.Ob(0,"fa-icon",15)}function h(n,t){1&n&&(r.Ob(0,"input",16),r.fc(1,"translate")),2&n&&r.jc("placeholder",r.gc(1,1,"COMMON.FIRST_NAME"))}function u(n,t){1&n&&r.Ob(0,"fa-icon",15)}function f(n,t){1&n&&(r.Ob(0,"input",17),r.fc(1,"translate")),2&n&&r.jc("placeholder",r.gc(1,1,"COMMON.LAST_NAME"))}function p(n,t){1&n&&(r.Sb(0,"span"),r.Cc(1),r.fc(2,"translate"),r.Rb()),2&n&&(r.Db(1),r.Dc(r.gc(2,1,"AUTHENTICATION.ERRORS.EMAIL_REQUIRED")))}function m(n,t){1&n&&(r.Sb(0,"span"),r.Cc(1),r.fc(2,"translate"),r.Rb()),2&n&&(r.Db(1),r.Dc(r.gc(2,1,"AUTHENTICATION.ERRORS.EMAIL_INVALID")))}function b(n,t){1&n&&(r.Sb(0,"span"),r.Cc(1),r.fc(2,"translate"),r.Rb()),2&n&&(r.Db(1),r.Dc(r.gc(2,1,"AUTHENTICATION.ERRORS.PASSWORD_REQUIRED")))}function O(n,t){1&n&&(r.Sb(0,"span"),r.Cc(1),r.fc(2,"translate"),r.Rb()),2&n&&(r.Db(1),r.Ec(" ",r.gc(2,1,"AUTHENTICATION.ERRORS.PASSWORD_INVALID"),""))}function C(n,t){1&n&&(r.Sb(0,"button"),r.Cc(1),r.fc(2,"translate"),r.Rb()),2&n&&(r.Db(1),r.Ec(" ",r.gc(2,1,"COMMON.SIGN_IN")," "))}function I(n,t){1&n&&(r.Sb(0,"button"),r.Cc(1),r.fc(2,"translate"),r.Rb()),2&n&&(r.Db(1),r.Ec(" ",r.gc(2,1,"COMMON.SIGN_UP")," "))}function x(n,t){if(1&n){const n=r.Tb();r.Sb(0,"div",18),r.Cc(1),r.fc(2,"translate"),r.Sb(3,"span",19),r.ac("click",function(){return r.tc(n),r.ec().isSignIn=!1}),r.Cc(4),r.fc(5,"translate"),r.Rb(),r.Rb()}2&n&&(r.Db(1),r.Ec(" ",r.gc(2,2,"AUTHENTICATION.ERRORS.DO_NOT_HAVE_ACCOUNT")," "),r.Db(3),r.Ec(" ",r.gc(5,4,"COMMON.SIGN_UP"),""))}function M(n,t){if(1&n){const n=r.Tb();r.Sb(0,"div",18),r.Cc(1),r.fc(2,"translate"),r.Sb(3,"span",19),r.ac("click",function(){return r.tc(n),r.ec().isSignIn=!0}),r.Cc(4),r.fc(5,"translate"),r.Rb(),r.Rb()}2&n&&(r.Db(1),r.Ec(" ",r.gc(2,2,"AUTHENTICATION.ERRORS.ALREADY_HAVE_ACCOUNT")," "),r.Db(3),r.Dc(r.gc(5,4,"COMMON.SIGN_IN")))}let P=(()=>{class n{constructor(n,t){this.fb=n,this.authService=t,this.isEmailInvalid=!1,this.isEmailRequired=!1,this.isPasswordInvalid=!1,this.isPasswordRequired=!1,this.isSignIn=!0,this.signInForm=this.fb.group({email:["samvelgevorgyan87@gmail.com",[c.n.required,c.n.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],password:["asdasdsad",[c.n.required,c.n.minLength(6)]],firstName:[""],lastName:[""]})}ngOnInit(){}get email(){return this.signInForm.get("email")}get password(){return this.signInForm.get("password")}get firstName(){return this.signInForm.get("firstName")}get lastName(){return this.signInForm.get("lastName")}validation(){return this.email.errors?(this.email.errors.required?(this.isEmailRequired=!0,this.isEmailInvalid=!1):this.email.errors.pattern&&(this.isEmailRequired=!1,this.isEmailInvalid=!0),!1):(this.isEmailInvalid=!1,this.isEmailRequired=!1,this.password.errors?(this.password.errors.required?(this.isPasswordRequired=!0,this.isPasswordInvalid=!1):this.password.errors.minlength&&(this.isPasswordRequired=!1,this.isPasswordInvalid=!0),!1):(this.isPasswordRequired=!1,this.isPasswordInvalid=!1,!0))}authenticate(){if(this.validation())if(this.isSignIn)this.authService.signIn(this.email.value,this.password.value);else{const n={email:this.email.value,emailVerified:!1,firstName:this.firstName.value,lastName:this.lastName.value,password:this.password.value.trim(),uid:""};this.authService.signUp(n).then(n=>{console.log("result arden componentum",n)})}}restorePassword(){this.email.value&&this.authService.forgotPassword(this.email.value.trim())}}return n.\u0275fac=function(t){return new(t||n)(r.Nb(c.b),r.Nb(s.a))},n.\u0275cmp=r.Hb({type:n,selectors:[["jungle-auth"]],decls:26,vars:22,consts:[["fxLayout","column","fxLayoutAlign","center center",1,"auth_cont"],[1,"sing_in_main"],[1,"sing_in_main_form_div"],["fxLayout","column","fxLayoutAlign","center start",3,"formGroup","ngSubmit"],["icon","user",4,"ngIf"],["type","text","formControlName","firstName",3,"placeholder",4,"ngIf"],["type","text","formControlName","lastName",3,"placeholder",4,"ngIf"],["icon","envelope"],["type","text","formControlName","email",3,"placeholder"],["icon","lock"],["type","text","formControlName","password",3,"placeholder"],[1,"error_div"],[4,"ngIf"],["class","helper_text",4,"ngIf"],[1,"forgot_password",3,"click"],["icon","user"],["type","text","formControlName","firstName",3,"placeholder"],["type","text","formControlName","lastName",3,"placeholder"],[1,"helper_text"],[3,"click"]],template:function(n,t){1&n&&(r.Sb(0,"div",0),r.Sb(1,"div",1),r.Sb(2,"div",2),r.Sb(3,"form",3),r.ac("ngSubmit",function(){return t.authenticate()}),r.Bc(4,l,1,0,"fa-icon",4),r.Bc(5,h,2,3,"input",5),r.Bc(6,u,1,0,"fa-icon",4),r.Bc(7,f,2,3,"input",6),r.Ob(8,"fa-icon",7),r.Ob(9,"input",8),r.fc(10,"translate"),r.Ob(11,"fa-icon",9),r.Ob(12,"input",10),r.fc(13,"translate"),r.Sb(14,"div",11),r.Bc(15,p,3,3,"span",12),r.Bc(16,m,3,3,"span",12),r.Bc(17,b,3,3,"span",12),r.Bc(18,O,3,3,"span",12),r.Rb(),r.Bc(19,C,3,3,"button",12),r.Bc(20,I,3,3,"button",12),r.Rb(),r.Bc(21,x,6,6,"div",13),r.Bc(22,M,6,6,"div",13),r.Sb(23,"div",14),r.ac("click",function(){return t.restorePassword()}),r.Cc(24),r.fc(25,"translate"),r.Rb(),r.Rb(),r.Rb(),r.Rb()),2&n&&(r.Db(3),r.jc("formGroup",t.signInForm),r.Db(1),r.jc("ngIf",!t.isSignIn),r.Db(1),r.jc("ngIf",!t.isSignIn),r.Db(1),r.jc("ngIf",!t.isSignIn),r.Db(1),r.jc("ngIf",!t.isSignIn),r.Db(2),r.jc("placeholder",r.gc(10,16,"FOOTER.EMAIL")),r.Db(3),r.jc("placeholder",r.gc(13,18,"COMMON.PASSWORD")),r.Db(3),r.jc("ngIf",t.isEmailRequired),r.Db(1),r.jc("ngIf",t.isEmailInvalid),r.Db(1),r.jc("ngIf",t.isPasswordRequired),r.Db(1),r.jc("ngIf",t.isPasswordInvalid),r.Db(1),r.jc("ngIf",t.isSignIn),r.Db(1),r.jc("ngIf",!t.isSignIn),r.Db(1),r.jc("ngIf",t.isSignIn),r.Db(1),r.jc("ngIf",!t.isSignIn),r.Db(2),r.Ec(" ",r.gc(25,20,"AUTHENTICATION.VERIFICATION.FORGOT_PASSWORD")," "))},directives:[g.e,g.d,c.o,c.i,c.d,e.k,d.a,c.a,c.h,c.c],pipes:[_.c],styles:[".auth_cont[_ngcontent-%COMP%]{height:calc(100vh - 371px);background-color:#fff;margin:auto;width:1280px}@media (min-width:1280px) and (max-width:1399px){.auth_cont[_ngcontent-%COMP%]{width:1200px}}@media (min-width:960px) and (max-width:1279px){.auth_cont[_ngcontent-%COMP%]{width:900px}}@media (min-width:600px) and (max-width:959px){.auth_cont[_ngcontent-%COMP%]{width:583px}}@media (max-width:599px){.auth_cont[_ngcontent-%COMP%]{width:100%}}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]{background-color:#fff;padding:30px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);width:320px}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   .error_div[_ngcontent-%COMP%]{color:red;min-height:50px;text-align:center;width:100%}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   .error_div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:100%}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:relative;width:100%;margin:0 0 13px;padding:10px 26px;font-family:Cormorant,serif;font-size:17px;font-weight:400;font-style:italic;color:#000;border:1px solid #e3e3e3;box-sizing:border-box;transition:border-color .2s ease-in-out}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#c19d56}@media (max-width:959px){.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:300px}}@media (max-width:374px){.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:250px}}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{box-shadow:inset -2px -34px 17px -22px #ffdcb2;background:#f0f0f0 linear-gradient(180deg,#f0f0f0 5%,#e0b462);border-radius:6px;border:1px solid #fafafa;display:inline-block;cursor:pointer;color:#fff;font-size:23px;font-weight:700;padding:20px 60px;text-decoration:none;text-shadow:-2px -1px 14px #c19d56;width:100%}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .sing_in_main_form_div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#e0b462 linear-gradient(180deg,#e0b462 5%,#f0f0f0)}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .helper_text[_ngcontent-%COMP%]{text-align:center}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .helper_text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#c19d56;font-weight:600;cursor:pointer}.auth_cont[_ngcontent-%COMP%]   .sing_in_main[_ngcontent-%COMP%]   .forgot_password[_ngcontent-%COMP%]{color:#c19d56;text-align:center;margin-top:20px;cursor:pointer}"]}),n})();var R=i("IzEk"),v=i("Avyq"),w=i("tLuA"),N=i("bTqV");function S(n,t){if(1&n){const n=r.Tb();r.Sb(0,"span"),r.Cc(1),r.fc(2,"translate"),r.Sb(3,"p"),r.Cc(4),r.fc(5,"translate"),r.Sb(6,"button",5),r.ac("click",function(){return r.tc(n),r.ec().reSendEmailVerify()}),r.Cc(7),r.fc(8,"translate"),r.Rb(),r.Rb(),r.Rb()}2&n&&(r.Db(1),r.Ec("",r.gc(2,3,"AUTHENTICATION.VERIFICATION.ERRORS.MALFORMED")," "),r.Db(3),r.Ec(" ",r.gc(5,5,"AUTHENTICATION.VERIFICATION.ERRORS.RESEND_CODE_TEXT")," "),r.Db(3),r.Ec(" ",r.gc(8,7,"COMMON.CLICK_HERE")," "))}const E=[{path:"",component:P},{path:"verification",component:(()=>{class n{constructor(n,t,i,e){this.auth=n,this.localize=t,this.router=i,this.toast=e,this.malformed=!1}ngOnInit(){this.auth.isLoggedIn().pipe(Object(R.a)(1)).subscribe(n=>{if(console.log("useeer",n),n&&!1===n.emailVerified)this.auth.verifyCode().then(n=>{console.log("res from verification conp",n),"boolean"==typeof n?this.toast.success("AUTHENTICATION.VERIFICATION.ERRORS.VERIFICATION_SUCCESS").then(()=>{const n=this.localize.translateRoute("/authentication");this.router.navigate([n])}):n.message.includes("malformed")&&(this.malformed=!0)});else{const n=this.localize.translateRoute("/authentication");this.router.navigate([n])}})}reSendEmailVerify(){}}return n.\u0275fac=function(t){return new(t||n)(r.Nb(s.a),r.Nb(v.c),r.Nb(o.j),r.Nb(w.a))},n.\u0275cmp=r.Hb({type:n,selectors:[["jungle-verification"]],decls:5,vars:1,consts:[["fxLayout","column","fxLayoutAlign","center center",1,"auth_cont"],[1,"verification_main"],[1,"message_dive"],[1,"error_div"],[4,"ngIf"],["mat-button","","color","primary",3,"click"]],template:function(n,t){1&n&&(r.Sb(0,"div",0),r.Sb(1,"div",1),r.Ob(2,"div",2),r.Sb(3,"div",3),r.Bc(4,S,9,9,"span",4),r.Rb(),r.Rb(),r.Rb()),2&n&&(r.Db(4),r.jc("ngIf",t.malformed))},directives:[g.e,g.d,e.k,N.a],pipes:[_.c],styles:[".auth_cont[_ngcontent-%COMP%]{height:calc(100vh - 371px);background-color:#fff;margin:auto;width:1280px}@media (min-width:1280px) and (max-width:1399px){.auth_cont[_ngcontent-%COMP%]{width:1200px}}@media (min-width:960px) and (max-width:1279px){.auth_cont[_ngcontent-%COMP%]{width:900px}}@media (min-width:600px) and (max-width:959px){.auth_cont[_ngcontent-%COMP%]{width:583px}}@media (max-width:599px){.auth_cont[_ngcontent-%COMP%]{width:100%}}.auth_cont[_ngcontent-%COMP%]   .verification_main[_ngcontent-%COMP%]{background-color:#fff;padding:30px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);width:320px}.auth_cont[_ngcontent-%COMP%]   .verification_main[_ngcontent-%COMP%]   .error_div[_ngcontent-%COMP%]{color:red;min-height:50px;text-align:center;width:100%}.auth_cont[_ngcontent-%COMP%]   .verification_main[_ngcontent-%COMP%]   .error_div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:100%}"]}),n})()}];let A=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=r.Lb({type:n}),n.\u0275inj=r.Kb({imports:[[e.c,o.m.forChild(E),a.a]]}),n})()}}]);