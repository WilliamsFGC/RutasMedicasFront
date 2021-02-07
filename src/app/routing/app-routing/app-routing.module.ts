import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonComponent } from 'src/app/components/Person/create-person/create-person.component';
import { ListPersonComponent } from 'src/app/components/Person/list-person/list-person.component';
import { PersonComponent } from 'src/app/components/person/person.component';

const routes: Routes = [
  { path: '', component: PersonComponent },
  { 
    path: 'person', component: PersonComponent,
    children: [
      { path: '', component: ListPersonComponent },
      { path: 'list', component: ListPersonComponent },
      { path: 'create', component: CreatePersonComponent },
      { path: 'update', component: CreatePersonComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
