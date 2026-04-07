import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import singleSpaAngular from "single-spa-angular";
import { getSingleSpaExtraProviders } from "single-spa-angular";
import { AppComponent } from "./app.component";

const lifecycles = (singleSpaAngular as any)({
  bootstrapFunction: (customProps: any) => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideRouter([
          { path: "login", loadComponent: () => import("./components/login.component").then((m) => m.LoginComponent) },
          { path: "register", loadComponent: () => import("./components/register.component").then((m) => m.RegisterComponent) },
          { path: "**", redirectTo: "login" },
        ]),
        ...getSingleSpaExtraProviders(),
      ],
    });
  },
  template: "<cms-auth-root />",
  Router: undefined as any,
  NgZone: undefined as any,
  NgZoneSchedulerFactory: undefined as any,
});

export const { bootstrap, mount, unmount } = lifecycles;
