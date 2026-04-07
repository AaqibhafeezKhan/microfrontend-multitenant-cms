import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "cms-auth-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styleUrls: ["./auth.css"],
})
export class AppComponent {}
