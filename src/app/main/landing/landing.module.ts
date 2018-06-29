import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
      path     : 'landing',
      component: LandingComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule
  ],
  declarations: [
    LandingComponent
  ],
  exports     : [
    LandingComponent
  ]
})
export class LandingModule { }
