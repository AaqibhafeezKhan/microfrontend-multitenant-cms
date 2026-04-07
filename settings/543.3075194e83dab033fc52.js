"use strict";(self.webpackChunk_cms_settings=self.webpackChunk_cms_settings||[]).push([[543],{543(e,t,a){a.r(t),a.d(t,{bootstrap:()=>v,mount:()=>y,unmount:()=>x});var o=a(696),r=a(493),i=function(e,t,a,o){var r,i=arguments.length,n=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(i<3?r(n):i>3?r(t,a,n):r(t,a))||n);return i>3&&n&&Object.defineProperty(t,a,n),n};let n=class extends o.LitElement{constructor(){super(...arguments),this.tenantId="",this.tenantSlug="",this.tenantName="",this.activeView="profile"}render(){return o.html`
      <div class="settings-root">
        <header class="settings-header">
          <h1>Settings</h1>
          <p class="settings-subtitle">${this.tenantName}</p>
        </header>
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
      </div>
    `}};n.styles=o.css`
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
  `,i([(0,r.MZ)({type:String,attribute:"tenant-id"})],n.prototype,"tenantId",void 0),i([(0,r.MZ)({type:String,attribute:"tenant-slug"})],n.prototype,"tenantSlug",void 0),i([(0,r.MZ)({type:String,attribute:"tenant-name"})],n.prototype,"tenantName",void 0),i([(0,r.wk)()],n.prototype,"activeView",void 0),n=i([(0,r.EM)("cms-settings-root")],n);var s=a(291),l=a(189);const c=(window.__CMS_SHARED_STORE__||(window.__CMS_SHARED_STORE__=(0,s.vt)()((0,l.eh)(e=>({auth:{user:null,isAuthenticated:!1,isLoading:!0,accessToken:null,sessionExpiresAt:null},navigation:{activeMicrofrontend:null,previousPath:null,currentPath:"/",breadcrumbs:[]},notifications:{notifications:[]},setUser:t=>e(e=>({auth:{...e.auth,user:t,isAuthenticated:null!==t,isLoading:!1}})),setAuthLoading:t=>e(e=>({auth:{...e.auth,isLoading:t}})),setAccessToken:(t,a)=>e(e=>({auth:{...e.auth,accessToken:t,sessionExpiresAt:a}})),clearAuth:()=>e(e=>({auth:{...e.auth,user:null,isAuthenticated:!1,accessToken:null,sessionExpiresAt:null,isLoading:!1}})),setCurrentPath:t=>e(e=>({navigation:{...e.navigation,previousPath:e.navigation.currentPath,currentPath:t}})),setActiveMicrofrontend:t=>e(e=>({navigation:{...e.navigation,activeMicrofrontend:t}})),pushBreadcrumb:t=>e(e=>({navigation:{...e.navigation,breadcrumbs:[...e.navigation.breadcrumbs,t]}})),clearBreadcrumbs:()=>e(e=>({navigation:{...e.navigation,breadcrumbs:[]}})),addNotification:t=>e(e=>({notifications:{notifications:[...e.notifications.notifications,{...t,id:`notification_${Date.now()}_${Math.random().toString(36).slice(2)}`,timestamp:Date.now(),dismissed:!1}]}})),dismissNotification:t=>e(e=>({notifications:{notifications:e.notifications.notifications.map(e=>e.id===t?{...e,dismissed:!0}:e)}})),clearNotifications:()=>e(()=>({notifications:{notifications:[]}}))})))),window.__CMS_SHARED_STORE__);a(155);var d=function(e,t,a,o){var r,i=arguments.length,n=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(i<3?r(n):i>3?r(t,a,n):r(t,a))||n);return i>3&&n&&Object.defineProperty(t,a,n),n};let p=class extends o.LitElement{constructor(){super(...arguments),this.tenantId="",this.displayName="",this.email="",this.saved=!1}connectedCallback(){super.connectedCallback();const e=c.getState().auth.user;e?(this.displayName=e.displayName,this.email=e.email):(this.displayName="Alex Chen",this.email="admin@acme.com")}handleSave(){const e=c,t=e.getState().auth.user;t&&e.getState().setUser({...t,displayName:this.displayName,email:this.email}),this.saved=!0,setTimeout(()=>this.saved=!1,3e3)}render(){const e=this.displayName.split(" ").map(e=>e[0]??"").join("").slice(0,2).toUpperCase();return o.html`
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
    `}};p.styles=o.css`
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
  `,d([(0,r.MZ)({type:String,attribute:"tenant-id"})],p.prototype,"tenantId",void 0),d([(0,r.wk)()],p.prototype,"displayName",void 0),d([(0,r.wk)()],p.prototype,"email",void 0),d([(0,r.wk)()],p.prototype,"saved",void 0),p=d([(0,r.EM)("cms-settings-profile")],p);const m=(window.__CMS_EVENT_BUS__||(window.__CMS_EVENT_BUS__=new class{constructor(){this.handlerRegistry=new Map}emit(e,t){const a=new CustomEvent(`cms:${e}`,{detail:t,bubbles:!0,composed:!0});window.dispatchEvent(a);const o=this.handlerRegistry.get(e);o&&o.forEach(e=>{e(t)})}on(e,t){return this.handlerRegistry.has(e)||this.handlerRegistry.set(e,new Set),this.handlerRegistry.get(e).add(t),()=>this.off(e,t)}off(e,t){const a=this.handlerRegistry.get(e);a&&a.delete(t)}once(e,t){const a=this.on(e,e=>{t(e),a()})}}),window.__CMS_EVENT_BUS__),u={acme:{id:"tenant_acme_001",slug:"acme",displayName:"Acme Corporation",branding:{primaryColor:"#6366f1",secondaryColor:"#4f46e5",accentColor:"#a5b4fc",surfaceColor:"#1e1e2e",backgroundColor:"#13131f",textPrimaryColor:"#e2e8f0",textSecondaryColor:"#94a3b8",fontFamily:"'Inter', sans-serif",logoText:"ACME CMS",companyName:"Acme Corporation"},featureFlags:{collaborativeEditing:!0,advancedAnalytics:!0,mediaLibrary:!0,multiLanguage:!0,versionHistory:!0,webhooks:!0,apiAccess:!0,customWorkflows:!0,auditLog:!0,ssoEnabled:!0},plan:{tier:"enterprise",maxUsers:500,maxStorageGb:1e3,maxContentItems:5e4},allowedDomains:["acme.cms.com","acme.internal"],defaultLocale:"en-US",supportedLocales:["en-US","de-DE","fr-FR","ja-JP"],timezone:"America/New_York",apiBaseUrl:"https://api.acme.cms.com"},globex:{id:"tenant_globex_001",slug:"globex",displayName:"Globex Media Group",branding:{primaryColor:"#10b981",secondaryColor:"#059669",accentColor:"#6ee7b7",surfaceColor:"#1a1f2e",backgroundColor:"#0f1520",textPrimaryColor:"#f1f5f9",textSecondaryColor:"#8492a6",fontFamily:"'Outfit', sans-serif",logoText:"GLOBEX",companyName:"Globex Media Group"},featureFlags:{collaborativeEditing:!0,advancedAnalytics:!0,mediaLibrary:!0,multiLanguage:!1,versionHistory:!0,webhooks:!1,apiAccess:!0,customWorkflows:!1,auditLog:!0,ssoEnabled:!1},plan:{tier:"professional",maxUsers:50,maxStorageGb:100,maxContentItems:5e3},allowedDomains:["globex.cms.com"],defaultLocale:"en-GB",supportedLocales:["en-GB","es-ES"],timezone:"Europe/London",apiBaseUrl:"https://api.globex.cms.com"}};var f=function(e,t,a,o){var r,i=arguments.length,n=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(i<3?r(n):i>3?r(t,a,n):r(t,a))||n);return i>3&&n&&Object.defineProperty(t,a,n),n};let h=class extends o.LitElement{constructor(){super(...arguments),this.tenantId="",this.tenantSlug="",this.selectedTheme="dark",this.selectedColor="#6366f1",this.colorPalette=[{label:"Indigo",value:"#6366f1"},{label:"Emerald",value:"#10b981"},{label:"Amber",value:"#f59e0b"},{label:"Rose",value:"#f43f5e"},{label:"Sky",value:"#0ea5e9"},{label:"Violet",value:"#8b5cf6"}]}applyAppearance(){document.documentElement.style.setProperty("--color-primary",this.selectedColor);const e=(t=this.tenantSlug,u[t]??null);var t;const a=e?.id??this.tenantId;m.emit("settings:theme-changed",{tenantId:a,theme:this.selectedTheme})}render(){return o.html`
      <div class="appearance-card">
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
                  aria-pressed="${this.selectedColor===e.value}"
                  @click=${()=>this.selectedColor=e.value}
                ></button>
              `)}
          </div>
        </div>

        <button class="apply-btn" @click=${this.applyAppearance}>Apply Changes</button>
      </div>
    `}};h.styles=o.css`
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
  `,f([(0,r.MZ)({type:String,attribute:"tenant-id"})],h.prototype,"tenantId",void 0),f([(0,r.MZ)({type:String,attribute:"tenant-slug"})],h.prototype,"tenantSlug",void 0),f([(0,r.wk)()],h.prototype,"selectedTheme",void 0),f([(0,r.wk)()],h.prototype,"selectedColor",void 0),h=f([(0,r.EM)("cms-settings-appearance")],h);const g="single-spa-application:settings";function b(){const e=document.getElementById(g);if(e)return e;const t=document.createElement("div");return t.id=g,document.body.appendChild(t),t}async function v(){}async function y(){const e=function(){const e=window.location.hostname,t=(a=window.location.search,new URLSearchParams(a).get("tenant"));var a;if(t&&u[t])return u[t];const o=function(e){const t=e.split(".");return t.length>=3?t[0]??null:null}(e);return o&&u[o]?u[o]:u.acme}(),t=b(),a=document.createElement("cms-settings-root");a.setAttribute("tenant-id",e.id),a.setAttribute("tenant-slug",e.slug),a.setAttribute("tenant-name",e.displayName),t.appendChild(a)}async function x(){b().innerHTML=""}}}]);