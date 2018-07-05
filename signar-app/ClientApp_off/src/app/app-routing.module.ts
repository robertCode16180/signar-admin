import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { AgregarDocumentosComponent } from "./agregar-documentos/agregar-documentos.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'agregar-documentos', component: AgregarDocumentosComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: "**", component: NotFoundComponent, data: { title: "Page Not Found" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService
  ]
})
export class AppRoutingModule { }
