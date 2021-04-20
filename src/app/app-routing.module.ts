import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectwarriorsComponent } from './components/selectwarriors/selectwarriors.component';

const routes: Routes = [
  { path: 'selectwarriors', component: SelectwarriorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
