import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { RouterModule, Routes } from '@angular/router';

// route Path
const routes: Routes = [

  {
    path: '',
    component:  FeatureComponent}

];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),
  ],
  declarations: [FeatureComponent]
})
export class FeatureModule { }
