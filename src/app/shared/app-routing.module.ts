import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from '../places/places.component';
import { ParkingSchemaComponent } from '../parking-schema/parking-schema.component';
import { AuthComponent } from '../auth/auth.component';
import { VacationComponent } from '../places/vacation/vacation.component';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/parking-schema', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'parking-schema', component: ParkingSchemaComponent },
  { path: 'places', component: PlacesComponent },
  {
    path: 'vacation',
    component: VacationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vacation/:parkNumber',
    component: VacationComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/parking-schema', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
