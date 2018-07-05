
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { PopoverModule } from "ngx-bootstrap/popover";
import { ModalModule } from 'ngx-bootstrap/modal';

//Services SercoRestService
import { SercoRestService } from './services/serco-rest.service';
import { ConfigurationService } from './services/configuration.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { EndpointFactory } from './services/endpoint-factory.service';
import { AccountEndpoint } from './services/account-endpoint.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AgregarDocumentosComponent } from "./agregar-documentos/agregar-documentos.component";
import { NotFoundComponent } from "./not-found/not-found.component";

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    AgregarDocumentosComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    DataTablesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule

  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    SercoRestService,
    ConfigurationService,
    AccountEndpoint,
    LocalStoreManager,
    EndpointFactory

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
