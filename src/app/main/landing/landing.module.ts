import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';
import { DynamicFormComponent } from './questions/question-base/dynamic-form.component';
import { AppointmentService } from '../services/appointments.service';
import { CalendarModule } from '../apps/calendar/calendar.module';

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
  
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,

    FuseSharedModule,
    ReactiveFormsModule,
    // CalendarModule

  ],
  declarations: [
    LandingComponent,
    DynamicFormComponent
  ],
  exports     : [
    LandingComponent
  ],
  providers: [ GameService, AppointmentService ]
})
export class LandingModule { }
