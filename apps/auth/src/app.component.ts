import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "cms-auth-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="auth-header">
      <div class="framework-badge framework-badge--angular">Built with Angular 17</div>
    </header>
    <router-outlet />
  `,
  styleUrls: ["./auth.css"],
})
export class AppComponent {}
