import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { TheAudioDBApiService } from './services/the-audio-dbapi.service';
import { BiographyComponent } from './pages/biography/biography.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent,
  		BiographyComponent,
    PagesComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [TheAudioDBApiService],
	bootstrap: [AppComponent]
})
export class AppModule { }
