import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./pages/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService } from "./shared/authentication.service";
import { StorageService } from "./pages/core/services/storage.service";

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
