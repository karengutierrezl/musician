import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiographyComponent } from './pages/biography/biography.component';
import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'biography/:artist', component: BiographyComponent},
    { path: '**', component: PagesComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
