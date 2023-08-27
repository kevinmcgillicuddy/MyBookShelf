import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookChartComponent } from './book-chart/book-chart.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookViewComponent } from './book-view/book-view.component';
import { LoginComponent } from './admin/login/login.component';
import { canActivateLogin } from './admin/login/login.guard';

const routes: Routes = [{
  path: '',
  component: BookViewComponent
},
{
 path:'chart',
 component: BookChartComponent
},
{
  path:'login',
  component: LoginComponent,
  canActivate: [canActivateLogin],
 },
{
  path:'search',
  component: BookSearchComponent
 }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
