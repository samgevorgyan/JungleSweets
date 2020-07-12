import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then(mod => mod.HomeModule)
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./pages/admin/admin.module").then(mod => mod.AdminModule)
  },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];
