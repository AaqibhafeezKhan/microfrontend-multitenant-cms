/*! For license information please see main.349dbc87391e7d9019bb.js.LICENSE.txt */
(()=>{"use strict";var e,t,r={18(e,t){var r=Symbol.for("react.element"),o=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.iterator,h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,y={};function v(e,t,r){this.props=e,this.context=t,this.refs=y,this.updater=r||h}function b(){}function g(e,t,r){this.props=e,this.context=t,this.refs=y,this.updater=r||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var w=g.prototype=new b;w.constructor=g,m(w,v.prototype),w.isPureReactComponent=!0;var S=Array.isArray,E=Object.prototype.hasOwnProperty,_={current:null},x={key:!0,ref:!0,__self:!0,__source:!0};function $(e,t,o){var n,i={},s=null,a=null;if(null!=t)for(n in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(s=""+t.key),t)E.call(t,n)&&!x.hasOwnProperty(n)&&(i[n]=t[n]);var l=arguments.length-2;if(1===l)i.children=o;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(n in l=e.defaultProps)void 0===i[n]&&(i[n]=l[n]);return{$$typeof:r,type:e,key:s,ref:a,props:i,_owner:_.current}}function C(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}var k=/\/+/g;function P(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function O(e,t,n,i,s){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var l=!1;if(null===e)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case r:case o:l=!0}}if(l)return s=s(l=e),e=""===i?"."+P(l,0):i,S(s)?(n="",null!=e&&(n=e.replace(k,"$&/")+"/"),O(s,t,n,"",function(e){return e})):null!=s&&(C(s)&&(s=function(e,t){return{$$typeof:r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(s,n+(!s.key||l&&l.key===s.key?"":(""+s.key).replace(k,"$&/")+"/")+e)),t.push(s)),1;if(l=0,i=""===i?".":i+":",S(e))for(var c=0;c<e.length;c++){var u=i+P(a=e[c],c);l+=O(a,t,n,u,s)}else if(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"==typeof u)for(e=u.call(e),c=0;!(a=e.next()).done;)l+=O(a=a.value,t,n,u=i+P(a,c++),s);else if("object"===a)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function A(e,t,r){if(null==e)return e;var o=[],n=0;return O(e,o,"","",function(e){return t.call(r,e,n++)}),o}function R(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var T={current:null},j={transition:null},U={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:j,ReactCurrentOwner:_};function M(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:A,forEach:function(e,t,r){A(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return A(e,function(){t++}),t},toArray:function(e){return A(e,function(e){return e})||[]},only:function(e){if(!C(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=v,t.Fragment=n,t.Profiler=s,t.PureComponent=g,t.StrictMode=i,t.Suspense=u,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U,t.act=M,t.cloneElement=function(e,t,o){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=m({},e.props),i=e.key,s=e.ref,a=e._owner;if(null!=t){if(void 0!==t.ref&&(s=t.ref,a=_.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)E.call(t,c)&&!x.hasOwnProperty(c)&&(n[c]=void 0===t[c]&&void 0!==l?l[c]:t[c])}var c=arguments.length-2;if(1===c)n.children=o;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];n.children=l}return{$$typeof:r,type:e.type,key:i,ref:s,props:n,_owner:a}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=$,t.createFactory=function(e){var t=$.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=C,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:R}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=j.transition;j.transition={};try{e()}finally{j.transition=t}},t.unstable_act=M,t.useCallback=function(e,t){return T.current.useCallback(e,t)},t.useContext=function(e){return T.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return T.current.useDeferredValue(e)},t.useEffect=function(e,t){return T.current.useEffect(e,t)},t.useId=function(){return T.current.useId()},t.useImperativeHandle=function(e,t,r){return T.current.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return T.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return T.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return T.current.useMemo(e,t)},t.useReducer=function(e,t,r){return T.current.useReducer(e,t,r)},t.useRef=function(e){return T.current.useRef(e)},t.useState=function(e){return T.current.useState(e)},t.useSyncExternalStore=function(e,t,r){return T.current.useSyncExternalStore(e,t,r)},t.useTransition=function(){return T.current.useTransition()},t.version="18.3.1"},155(e,t,r){e.exports=r(18)},654(e,t,r){var o=r(696);const n=e=>(t,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};var i=r(956);const s={attribute:!0,type:String,converter:i.W3,reflect:!1,hasChanged:i.Ec},a=(e=s,t,r)=>{const{kind:o,metadata:n}=r;let i=globalThis.litPropertyMetadata.get(n);if(void 0===i&&globalThis.litPropertyMetadata.set(n,i=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),i.set(r.name,e),"accessor"===o){const{name:o}=r;return{set(r){const n=t.get.call(this);t.set.call(this,r),this.requestUpdate(o,n,e,!0,r)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=r;return function(r){const n=this[o];t.call(this,r),this.requestUpdate(o,n,e,!0,r)}}throw Error("Unsupported decorator location: "+o)};function l(e){return(t,r)=>"object"==typeof r?a(e,t,r):((e,t,r)=>{const o=t.hasOwnProperty(r);return t.constructor.createProperty(r,e),o?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}function c(e){return l({...e,state:!0,attribute:!1})}var u,d=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};let p=u=class extends o.LitElement{constructor(){super(),this.toasts=[],u.instance=this}show(e,t="info"){const r=Date.now();this.toasts=[...this.toasts,{id:r,message:e,type:t}],setTimeout(()=>this.removeToast(r),4e3)}removeToast(e){this.toasts=this.toasts.filter(t=>t.id!==e)}render(){return o.html`
      <div class="toast-container">
        ${this.toasts.map(e=>o.html`
          <div class="toast" style="--toast-color: ${this.getTypeColor(e.type)}">
            <span class="toast-icon">${this.getTypeIcon(e.type)}</span>
            <span>${e.message}</span>
            <span class="toast-close" @click=${()=>this.removeToast(e.id)}>×</span>
          </div>
        `)}
      </div>
    `}getTypeColor(e){switch(e){case"success":return"#10b981";case"error":return"#f43f5e";case"warning":return"#f59e0b";default:return"#6366f1"}}getTypeIcon(e){switch(e){case"success":return"✓";case"error":return"✕";case"warning":return"⚠";default:return"ℹ"}}};p.styles=o.css`
    :host {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 9999;
      pointer-events: none;
    }

    .toast-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-end;
    }

    .toast {
      background: var(--color-surface, #1e1e2e);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      border-left: 4px solid var(--toast-color, var(--color-primary, #6366f1));
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      font-size: 0.875rem;
      font-weight: 500;
      pointer-events: auto;
      animation: slideIn 0.3s ease-out;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 280px;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .toast-icon { font-size: 1.25rem; }
    .toast-close { margin-left: auto; cursor: pointer; opacity: 0.6; }
    .toast-close:hover { opacity: 1; }
  `,d([c()],p.prototype,"toasts",void 0),p=u=d([n("cms-toast")],p);var f=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};let h=class extends o.LitElement{constructor(){super(...arguments),this.tenantId="",this.tenantSlug="",this.tenantName="",this.activeView="profile"}render(){return o.html`
      <div class="settings-root">
        <header class="settings-header">
          <h1>Settings</h1>
          <p class="settings-subtitle">${this.tenantName}</p>
          <div class="framework-badge framework-badge--lit">Built with Lit 3</div>
        </header>
        <div class="complementary-feature card">
          <label class="text-sm font-semibold mb-2 block">Complementary Feature: Theme Sync</label>
          <div class="flex items-center gap-4">
            <input 
              type="color" 
              @input=${e=>{const t=e.target.value;document.documentElement.style.setProperty("--color-primary",t),p.instance.show(`Theme updated to ${t}`,"success")}} 
              value="#6366f1"
            />
            <span class="text-xs text-slate-400">Update global primary color and notify system.</span>
          </div>
        </div>
        <nav class="settings-nav" aria-label="Settings navigation">
          <button
            class="nav-btn ${"profile"===this.activeView?"nav-btn--active":""}"
            @click=${()=>this.activeView="profile"}
          >
            Profile
          </button>
          <button
            class="nav-btn ${"appearance"===this.activeView?"nav-btn--active":""}"
            @click=${()=>this.activeView="appearance"}
          >
            Appearance
          </button>
        </nav>
        <div class="settings-content">
          ${"profile"===this.activeView?o.html`<cms-settings-profile tenant-id="${this.tenantId}"></cms-settings-profile>`:o.html`<cms-settings-appearance tenant-id="${this.tenantId}" tenant-slug="${this.tenantSlug}"></cms-settings-appearance>`}
        </div>
        <cms-toast></cms-toast>
      </div>
    `}};h.styles=o.css`
    :host {
      display: block;
      font-family: var(--font-family-base, 'Inter', sans-serif);
      color: var(--color-text-primary, #e2e8f0);
    }

    .settings-root {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .settings-header {
      display: flex;
      align-items: baseline;
      gap: 1rem;
    }

    h1 {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--color-text-primary, #e2e8f0);
      margin: 0;
    }

    .settings-subtitle {
      font-size: 0.875rem;
      color: var(--color-text-secondary, #94a3b8);
    }

    .settings-nav {
      display: flex;
      gap: 0.25rem;
      border-bottom: 1px solid var(--color-border, rgba(255,255,255,0.08));
      padding-bottom: 0.75rem;
    }

    .nav-btn {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      border: none;
      background: transparent;
      color: var(--color-text-secondary, #94a3b8);
      cursor: pointer;
      transition: all 200ms ease;
      font-family: inherit;
    }

    .nav-btn:hover {
      color: var(--color-text-primary, #e2e8f0);
      background: rgba(255, 255, 255, 0.06);
    }

    .nav-btn--active {
      color: var(--color-primary, #6366f1);
      background: rgba(99, 102, 241, 0.1);
    }

    .settings-content {
      display: block;
    }
  `,f([l({type:String,attribute:"tenant-id"})],h.prototype,"tenantId",void 0),f([l({type:String,attribute:"tenant-slug"})],h.prototype,"tenantSlug",void 0),f([l({type:String,attribute:"tenant-name"})],h.prototype,"tenantName",void 0),f([c()],h.prototype,"activeView",void 0),h=f([n("cms-settings-root")],h);const m=e=>{let t;const r=new Set,o=(e,o)=>{const n="function"==typeof e?e(t):e;if(!Object.is(n,t)){const e=t;t=(null!=o?o:"object"!=typeof n||null===n)?n:Object.assign({},t,n),r.forEach(r=>r(t,e))}},n=()=>t,i={setState:o,getState:n,getInitialState:()=>s,subscribe:e=>(r.add(e),()=>r.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}},s=t=e(o,n,i);return i};var y=r(155),v=r(604);const{useDebugValue:b}=y,{useSyncExternalStoreWithSelector:g}=v;let w=!1;const S=e=>e,E=e=>{"function"!=typeof e&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t="function"==typeof e?(e=>e?m(e):m)(e):e,r=(e,r)=>function(e,t=S,r){r&&!w&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),w=!0);const o=g(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,r);return b(o),o}(t,e,r);return Object.assign(r,t),r},_=(window.__CMS_SHARED_STORE__||(window.__CMS_SHARED_STORE__=($?E($):E)((x=e=>({auth:{user:null,isAuthenticated:!1,isLoading:!0,accessToken:null,sessionExpiresAt:null},navigation:{activeMicrofrontend:null,previousPath:null,currentPath:"/",breadcrumbs:[]},notifications:{notifications:[]},setUser:t=>e(e=>({auth:{...e.auth,user:t,isAuthenticated:null!==t,isLoading:!1}})),setAuthLoading:t=>e(e=>({auth:{...e.auth,isLoading:t}})),setAccessToken:(t,r)=>e(e=>({auth:{...e.auth,accessToken:t,sessionExpiresAt:r}})),clearAuth:()=>e(e=>({auth:{...e.auth,user:null,isAuthenticated:!1,accessToken:null,sessionExpiresAt:null,isLoading:!1}})),setCurrentPath:t=>e(e=>({navigation:{...e.navigation,previousPath:e.navigation.currentPath,currentPath:t}})),setActiveMicrofrontend:t=>e(e=>({navigation:{...e.navigation,activeMicrofrontend:t}})),pushBreadcrumb:t=>e(e=>({navigation:{...e.navigation,breadcrumbs:[...e.navigation.breadcrumbs,t]}})),clearBreadcrumbs:()=>e(e=>({navigation:{...e.navigation,breadcrumbs:[]}})),addNotification:t=>e(e=>({notifications:{notifications:[...e.notifications.notifications,{...t,id:`notification_${Date.now()}_${Math.random().toString(36).slice(2)}`,timestamp:Date.now(),dismissed:!1}]}})),dismissNotification:t=>e(e=>({notifications:{notifications:e.notifications.notifications.map(e=>e.id===t?{...e,dismissed:!0}:e)}})),clearNotifications:()=>e(()=>({notifications:{notifications:[]}}))}),(e,t,r)=>{const o=r.subscribe;return r.subscribe=(e,t,n)=>{let i=e;if(t){const o=(null==n?void 0:n.equalityFn)||Object.is;let s=e(r.getState());i=r=>{const n=e(r);if(!o(s,n)){const e=s;t(s=n,e)}},(null==n?void 0:n.fireImmediately)&&t(s,s)}return o(i)},x(e,t,r)}))),window.__CMS_SHARED_STORE__);var x,$,C=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};let k=class extends o.LitElement{constructor(){super(...arguments),this.tenantId="",this.displayName="",this.email="",this.saved=!1}connectedCallback(){super.connectedCallback();const e=_.getState().auth.user;e?(this.displayName=e.displayName,this.email=e.email):(this.displayName="Alex Chen",this.email="admin@acme.com")}handleSave(){const e=_,t=e.getState().auth.user;t&&e.getState().setUser({...t,displayName:this.displayName,email:this.email}),this.saved=!0,setTimeout(()=>this.saved=!1,3e3)}render(){const e=this.displayName.split(" ").map(e=>e[0]??"").join("").slice(0,2).toUpperCase();return o.html`
      <div class="profile-card">
        <div class="profile-avatar">${e}</div>

        <div class="form-field">
          <label for="display-name">Display Name</label>
          <input
            id="display-name"
            type="text"
            .value=${this.displayName}
            @input=${e=>this.displayName=e.target.value}
            placeholder="Your display name"
          />
        </div>

        <div class="form-field">
          <label for="email">Email Address</label>
          <input
            id="email"
            type="email"
            .value=${this.email}
            @input=${e=>this.email=e.target.value}
            placeholder="you@company.com"
          />
        </div>

        <button class="save-btn" @click=${this.handleSave}>Save Changes</button>
        <span class="save-confirm ${this.saved?"save-confirm--visible":""}">
          Profile updated successfully.
        </span>
      </div>
    `}};k.styles=o.css`
    :host { display: block; }

    .profile-card {
      background: var(--color-surface, #1e1e2e);
      border: 1px solid var(--color-border, rgba(255,255,255,0.08));
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 560px;
    }

    .profile-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary, #6366f1), var(--color-secondary, #4f46e5));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary, #94a3b8);
    }

    input {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--color-border-strong, rgba(255,255,255,0.16));
      background: rgba(255, 255, 255, 0.04);
      color: var(--color-text-primary, #e2e8f0);
      font-size: 1rem;
      font-family: inherit;
      outline: none;
      transition: border-color 200ms ease;
    }

    input:focus { border-color: var(--color-primary, #6366f1); }
    input::placeholder { color: var(--color-text-secondary, #94a3b8); }

    .save-btn {
      align-self: flex-start;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      background: var(--color-primary, #6366f1);
      color: #fff;
      font-size: 0.875rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      font-family: inherit;
      transition: all 200ms ease;
    }

    .save-btn:hover { background: var(--color-secondary, #4f46e5); }

    .save-confirm {
      font-size: 0.875rem;
      color: var(--color-success, #10b981);
      display: none;
    }

    .save-confirm--visible { display: block; }
  `,C([l({type:String,attribute:"tenant-id"})],k.prototype,"tenantId",void 0),C([c()],k.prototype,"displayName",void 0),C([c()],k.prototype,"email",void 0),C([c()],k.prototype,"saved",void 0),k=C([n("cms-settings-profile")],k);const P=(window.__CMS_EVENT_BUS__||(window.__CMS_EVENT_BUS__=new class{constructor(){this.handlerRegistry=new Map}emit(e,t){const r=new CustomEvent(`cms:${e}`,{detail:t,bubbles:!0,composed:!0});window.dispatchEvent(r);const o=this.handlerRegistry.get(e);o&&o.forEach(e=>{e(t)})}on(e,t){return this.handlerRegistry.has(e)||this.handlerRegistry.set(e,new Set),this.handlerRegistry.get(e).add(t),()=>this.off(e,t)}off(e,t){const r=this.handlerRegistry.get(e);r&&r.delete(t)}once(e,t){const r=this.on(e,e=>{t(e),r()})}}),window.__CMS_EVENT_BUS__),O={acme:{id:"tenant_acme_001",slug:"acme",displayName:"Acme Corporation",branding:{primaryColor:"#6366f1",secondaryColor:"#4f46e5",accentColor:"#a5b4fc",surfaceColor:"#1e1e2e",backgroundColor:"#13131f",textPrimaryColor:"#e2e8f0",textSecondaryColor:"#94a3b8",fontFamily:"'Inter', sans-serif",logoText:"ACME CMS",companyName:"Acme Corporation"},featureFlags:{collaborativeEditing:!0,advancedAnalytics:!0,mediaLibrary:!0,multiLanguage:!0,versionHistory:!0,webhooks:!0,apiAccess:!0,customWorkflows:!0,auditLog:!0,ssoEnabled:!0},plan:{tier:"enterprise",maxUsers:500,maxStorageGb:1e3,maxContentItems:5e4},allowedDomains:["acme.cms.com","acme.internal"],defaultLocale:"en-US",supportedLocales:["en-US","de-DE","fr-FR","ja-JP"],timezone:"America/New_York",apiBaseUrl:"https://api.acme.cms.com"},globex:{id:"tenant_globex_001",slug:"globex",displayName:"Globex Media Group",branding:{primaryColor:"#10b981",secondaryColor:"#059669",accentColor:"#6ee7b7",surfaceColor:"#1a1f2e",backgroundColor:"#0f1520",textPrimaryColor:"#f1f5f9",textSecondaryColor:"#8492a6",fontFamily:"'Outfit', sans-serif",logoText:"GLOBEX",companyName:"Globex Media Group"},featureFlags:{collaborativeEditing:!0,advancedAnalytics:!0,mediaLibrary:!0,multiLanguage:!1,versionHistory:!0,webhooks:!1,apiAccess:!0,customWorkflows:!1,auditLog:!0,ssoEnabled:!1},plan:{tier:"professional",maxUsers:50,maxStorageGb:100,maxContentItems:5e3},allowedDomains:["globex.cms.com"],defaultLocale:"en-GB",supportedLocales:["en-GB","es-ES"],timezone:"Europe/London",apiBaseUrl:"https://api.globex.cms.com"}};var A=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};let R=class extends o.LitElement{constructor(){super(...arguments),this.tenantId="",this.tenantSlug="",this.selectedTheme="dark",this.selectedColor="#6366f1",this.colorPalette=[{label:"Indigo",value:"#6366f1"},{label:"Emerald",value:"#10b981"},{label:"Amber",value:"#f59e0b"},{label:"Rose",value:"#f43f5e"},{label:"Sky",value:"#0ea5e9"},{label:"Violet",value:"#8b5cf6"}]}applyAppearance(){document.documentElement.style.setProperty("--color-primary",this.selectedColor);const e=(t=this.tenantSlug,O[t]??null);var t;const r=e?.id??this.tenantId;P.emit("settings:theme-changed",{tenantId:r,theme:this.selectedTheme})}render(){return o.html`
      <div class="appearance-card">
        <div class="framework-badge framework-badge--lit mb-6">Lit Property Binding</div>
        
        <div>
          <p class="section-title">Theme</p>
          <div class="theme-options">
            ${["dark","light"].map(e=>o.html`
                <button
                  class="theme-option ${this.selectedTheme===e?"theme-option--active":""}"
                  @click=${()=>this.selectedTheme=e}
                  aria-pressed="${this.selectedTheme===e}"
                >
                  <div class="theme-preview theme-preview--${e}"></div>
                  <span class="theme-label">${e.charAt(0).toUpperCase()+e.slice(1)}</span>
                </button>
              `)}
          </div>
        </div>

        <div>
          <p class="section-title">Accent Color</p>
          <div class="color-swatches" role="radiogroup" aria-label="Select accent color">
            ${this.colorPalette.map(e=>o.html`
                <button
                  class="color-swatch ${this.selectedColor===e.value?"color-swatch--active":""}"
                  style="background-color: ${e.value}"
                  title="${e.label}"
                  aria-label="${e.label}"
                  @click=${()=>this.selectedColor=e.value}
                ></button>
              `)}
          </div>
        </div>

        <div class="design-studio">
          <p class="section-title">Component Laboratory</p>
          <div class="component-preview" style="--preview-color: ${this.selectedColor}">
            <button class="preview-btn preview-btn--primary">Primary Button</button>
            <button class="preview-btn preview-btn--outline">Outline Button</button>
          </div>
          <p class="text-xs text-slate-400 mt-2">
            Lit efficiently patches the DOM when state properties like <b>selectedColor</b> change.
          </p>
        </div>

        <button class="apply-btn" @click=${this.applyAppearance}>Apply Globally</button>
      </div>
    `}};R.styles=o.css`
    :host { display: block; }

    .appearance-card {
      background: var(--color-surface, #1e1e2e);
      border: 1px solid var(--color-border, rgba(255,255,255,0.08));
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 560px;
    }

    .section-title {
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-secondary, #94a3b8);
      margin-bottom: 1rem;
    }

    .theme-options {
      display: flex;
      gap: 1rem;
    }

    .theme-option {
      flex: 1;
      padding: 1.25rem;
      border-radius: 12px;
      border: 2px solid var(--color-border, rgba(255,255,255,0.08));
      cursor: pointer;
      transition: all 200ms ease;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      background: transparent;
      font-family: inherit;
    }

    .theme-option:hover {
      border-color: var(--color-border-strong, rgba(255,255,255,0.16));
    }

    .theme-option--active {
      border-color: var(--color-primary, #6366f1);
      background: rgba(99, 102, 241, 0.05);
    }

    .theme-preview {
      width: 64px;
      height: 40px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .theme-preview--dark { background: linear-gradient(135deg, #13131f 50%, #1e1e2e 50%); }
    .theme-preview--light { background: linear-gradient(135deg, #f8fafc 50%, #f1f5f9 50%); }

    .theme-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-primary, #e2e8f0);
    }

    .color-swatches {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: transform 200ms ease;
    }

    .color-swatch:hover { transform: scale(1.15); }
    .color-swatch--active { border-color: var(--color-text-primary, #e2e8f0); }

    .apply-btn {
      align-self: flex-start;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      background: var(--color-primary, #6366f1);
      color: #fff;
      font-size: 0.875rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      font-family: inherit;
      transition: all 200ms ease;
    }

    .apply-btn:hover { background: var(--color-secondary, #4f46e5); }
    .design-studio {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px dashed var(--color-border, rgba(255,255,255,0.08));
    }

    .component-preview {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 1rem;
      padding: 1.5rem;
      background: rgba(0,0,0,0.1);
      border-radius: 12px;
    }

    .preview-btn {
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: all 200ms ease;
    }

    .preview-btn--primary {
      background: var(--preview-color, #6366f1);
      color: white;
      border: none;
    }

    .preview-btn--outline {
      background: transparent;
      border: 2px solid var(--preview-color, #6366f1);
      color: var(--preview-color, #6366f1);
    }
  `,A([l({type:String,attribute:"tenant-id"})],R.prototype,"tenantId",void 0),A([l({type:String,attribute:"tenant-slug"})],R.prototype,"tenantSlug",void 0),A([c()],R.prototype,"selectedTheme",void 0),A([c()],R.prototype,"selectedColor",void 0),R=A([n("cms-settings-appearance")],R)},15(e,t,r){var o=r(155),n="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=o.useState,s=o.useEffect,a=o.useLayoutEffect,l=o.useDebugValue;function c(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!n(e,r)}catch(e){return!0}}var u="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),o=i({inst:{value:r,getSnapshot:t}}),n=o[0].inst,u=o[1];return a(function(){n.value=r,n.getSnapshot=t,c(n)&&u({inst:n})},[e,r,t]),s(function(){return c(n)&&u({inst:n}),e(function(){c(n)&&u({inst:n})})},[e]),l(r),r};t.useSyncExternalStore=void 0!==o.useSyncExternalStore?o.useSyncExternalStore:u},476(e,t,r){var o=r(155),n=r(98),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=n.useSyncExternalStore,a=o.useRef,l=o.useEffect,c=o.useMemo,u=o.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,r,o,n){var d=a(null);if(null===d.current){var p={hasValue:!1,value:null};d.current=p}else p=d.current;d=c(function(){function e(e){if(!l){if(l=!0,s=e,e=o(e),void 0!==n&&p.hasValue){var t=p.value;if(n(t,e))return a=t}return a=e}if(t=a,i(s,e))return t;var r=o(e);return void 0!==n&&n(t,r)?(s=e,t):(s=e,a=r)}var s,a,l=!1,c=void 0===r?null:r;return[function(){return e(t())},null===c?void 0:function(){return e(c())}]},[t,r,o,n]);var f=s(e,d[0],d[1]);return l(function(){p.hasValue=!0,p.value=f},[f]),u(f),f}},98(e,t,r){e.exports=r(15)},604(e,t,r){e.exports=r(476)},956(e,t,r){r.d(t,{BO:()=>a,mN:()=>C,Rf:()=>u,AH:()=>c,W3:()=>_,sk:()=>d,Ec:()=>x,qM:()=>n,iz:()=>l});const o=globalThis,n=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class a{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(t,e))}return e}toString(){return this.cssText}}const l=e=>new a("string"==typeof e?e:e+"",void 0,i),c=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,r,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[o+1],e[0]);return new a(r,e,i)},u=(e,t)=>{if(n)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const r of t){const t=document.createElement("style"),n=o.litNonce;void 0!==n&&t.setAttribute("nonce",n),t.textContent=r.cssText,e.appendChild(t)}},d=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return l(t)})(e):e,{is:p,defineProperty:f,getOwnPropertyDescriptor:h,getOwnPropertyNames:m,getOwnPropertySymbols:y,getPrototypeOf:v}=Object,b=globalThis,g=b.trustedTypes,w=g?g.emptyScript:"",S=b.reactiveElementPolyfillSupport,E=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?w:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},x=(e,t)=>!p(e,t),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,t);void 0!==o&&f(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){const{get:o,set:n}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const i=o?.call(this);n?.call(this,t),this.requestUpdate(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=v(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,t=[...m(e),...y(e)];for(const r of t)this.createProperty(r,e[r])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,r]of t)this.elementProperties.set(e,r)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Eu(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return u(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(void 0!==o&&!0===r.reflect){const n=(void 0!==r.converter?.toAttribute?r.converter:_).toAttribute(t,r.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const r=this.constructor,o=r._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=r.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=o;const i=n.fromAttribute(t,e.type);this[o]=i??this._$Ej?.get(o)??i,this._$Em=null}}requestUpdate(e,t,r,o=!1,n){if(void 0!==e){const i=this.constructor;if(!1===o&&(n=this[e]),r??=i.getPropertyOptions(e),!((r.hasChanged??x)(n,t)||r.useDefault&&r.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:n},i){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,i??t??this[e]),!0!==n||void 0!==i)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,r]of e){const{wrapped:e}=r,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,r,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[E("elementProperties")]=new Map,C[E("finalized")]=new Map,S?.({ReactiveElement:C}),(b.reactiveElementVersions??=[]).push("2.1.2")}},o={};function n(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,n),i.exports}n.m=r,n.c=o,n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce((t,r)=>(n.f[r](e,t),t),[])),n.u=e=>e+"."+{230:"e882079a89f14a27ee01",849:"2f5dd257625f36990a91"}[e]+".js",n.miniCssF=e=>{},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="@cms/settings:",n.l=(r,o,i,s)=>{if(e[r])e[r].push(o);else{var a,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+i){a=d;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+i),a.src=r),e[r]=[o];var p=(t,o)=>{a.onerror=a.onload=null,clearTimeout(f);var n=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach(e=>e(o)),t)return t(o)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),l&&document.head.appendChild(a)}},n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{n.S={};var e={},t={};n.I=(r,o)=>{o||(o=[]);var i,s,a,l,c=t[r];if(c||(c=t[r]={}),!(o.indexOf(c)>=0)){if(o.push(c),e[r])return e[r];n.o(n.S,r)||(n.S[r]={});var u=n.S[r],d="@cms/settings",p=[];return"default"===r&&(i="3.3.2",a=u.lit=u.lit||{},(!(l=a[i])||!l.loaded&&(1!=!l.eager?s:d>l.from))&&(a[i]={get:()=>n.e(849).then(()=>()=>n(230)),from:d,eager:!1})),e[r]=p.length?Promise.all(p).then(()=>e[r]=1):1}}})(),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e=e=>{var t=e=>e.split(".").map(e=>+e==e?+e:e),r=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),o=r[1]?t(r[1]):[];return r[2]&&(o.length++,o.push.apply(o,t(r[2]))),r[3]&&(o.push([]),o.push.apply(o,t(r[3]))),o},t=e=>{var r=e[0],o="";if(1===e.length)return"*";if(r+.5){o+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var n=1,i=1;i<e.length;i++)n--,o+="u"==(typeof(a=e[i]))[0]?"-":(n>0?".":"")+(n=2,a);return o}var s=[];for(i=1;i<e.length;i++){var a=e[i];s.push(0===a?"not("+l()+")":1===a?"("+l()+" || "+l()+")":2===a?s.pop()+" "+s.pop():t(a))}return l();function l(){return s.pop().replace(/^\((.+)\)$/,"$1")}},r=(t,o)=>{if(0 in t){o=e(o);var n=t[0],i=n<0;i&&(n=-n-1);for(var s=0,a=1,l=!0;;a++,s++){var c,u,d=a<t.length?(typeof t[a])[0]:"";if(s>=o.length||"o"==(u=(typeof(c=o[s]))[0]))return!l||("u"==d?a>n&&!i:""==d!=i);if("u"==u){if(!l||"u"!=d)return!1}else if(l)if(d==u)if(a<=n){if(c!=t[a])return!1}else{if(i?c>t[a]:c<t[a])return!1;c!=t[a]&&(l=!1)}else if("s"!=d&&"n"!=d){if(i||a<=n)return!1;l=!1,a--}else{if(a<=n||u<d!=i)return!1;l=!1}else"s"!=d&&"n"!=d&&(l=!1,a--)}}var p=[],f=p.pop.bind(p);for(s=1;s<t.length;s++){var h=t[s];p.push(1==h?f()|f():2==h?f()&f():h?r(h,o):!f())}return!!f()},o=(t,r,o)=>{var n=o?(e=>Object.keys(e).reduce((t,r)=>(e[r].eager&&(t[r]=e[r]),t),{}))(t[r]):t[r];return Object.keys(n).reduce((t,r)=>!t||!n[t].loaded&&((t,r)=>{t=e(t),r=e(r);for(var o=0;;){if(o>=t.length)return o<r.length&&"u"!=(typeof r[o])[0];var n=t[o],i=(typeof n)[0];if(o>=r.length)return"u"==i;var s=r[o],a=(typeof s)[0];if(i!=a)return"o"==i&&"n"==a||"s"==a||"u"==i;if("o"!=i&&"u"!=i&&n!=s)return n<s;o++}})(t,r)?r:t,0)},i=(e,t,r)=>r?r():((e,t)=>(e=>{throw new Error(e)})("Shared module "+t+" doesn't exist in shared scope "+e))(e,t),s=(e=>function(t,r,o,i,s){var a=n.I(t);return a&&a.then&&!o?a.then(e.bind(e,t,n.S[t],r,!1,i,s)):e(t,n.S[t],r,o,i,s)})((e,s,a,l,c,u)=>{if(!((e,t)=>e&&n.o(e,t))(s,a))return i(e,a,u);var d,p,f=o(s,a,l);return r(c,f)||(p=((e,r,o,n)=>"Unsatisfied version "+o+" from "+(o&&e[r][o].from)+" of shared singleton module "+r+" (required "+t(n)+")")(s,a,f,c),"undefined"!=typeof console&&console.warn&&console.warn(p)),(d=s[a][f]).loaded=1,d.get()}),a={},l={696:()=>s("default","lit",!1,[1,3,1,3],()=>n.e(230).then(()=>()=>n(230)))};[696].forEach(e=>{n.m[e]=t=>{a[e]=0,delete n.c[e];var r=l[e]();if("function"!=typeof r)throw new Error("Shared module is not available for eager consumption: "+e);t.exports=r()}});var c={792:[696]},u={};n.f.consumes=(e,t)=>{n.o(c,e)&&c[e].forEach(e=>{if(n.o(a,e))return t.push(a[e]);if(!u[e]){var r=t=>{a[e]=0,n.m[e]=r=>{delete n.c[e],r.exports=t()}};u[e]=!0;var o=t=>{delete a[e],n.m[e]=r=>{throw delete n.c[e],t}};try{var i=l[e]();i.then?t.push(a[e]=i.then(r).catch(o)):r(i)}catch(e){o(e)}}})}})(),(()=>{var e={792:0};n.f.j=(t,r)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((r,n)=>o=e[t]=[r,n]);r.push(o[2]=i);var s=n.p+n.u(t),a=new Error;n.l(s,r=>{if(n.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+s+")",a.name="ChunkLoadError",a.type=i,a.request=s,o[1](a)}},"chunk-"+t,t)}};var t=(t,r)=>{var o,i,[s,a,l]=r,c=0;if(s.some(t=>0!==e[t])){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);l&&l(n)}for(t&&t(r);c<s.length;c++)i=s[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0},r=self.webpackChunk_cms_settings=self.webpackChunk_cms_settings||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n(654)})();