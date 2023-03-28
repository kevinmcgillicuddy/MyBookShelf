import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookChartComponent } from './book-chart/book-chart.component';
import { BookViewComponent } from './book-view/book-view.component';

const routes: Routes = [{
  path: '',
  component: BookViewComponent
},
{
 path:'chart',
 component: BookChartComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
