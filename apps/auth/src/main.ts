import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: "login", component: LoginComponent },
      { path: "**", redirectTo: "login" },
    ]),
  ],
}).catch((err) => console.error(err));
