import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';
import { GameService } from '../services/game.service';
import { AppointmentService } from '../services/appointments.service';
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formErrors: any;
  person;
  // Vertical Stepper
  verticalStepperStep0: FormGroup;
  verticalStepperStep1: FormGroup;
  verticalStepperStep2: FormGroup;
  verticalStepperStep3: FormGroup;
  verticalStepperStep0Errors: any;
  verticalStepperStep1Errors: any;
  verticalStepperStep2Errors: any;
  verticalStepperStep3Errors: any;
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   * @param {FormBuilder} _formBuilder
   */
  config: any;
  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(
    private gameservice: GameService,
    private AppointmentService: AppointmentService,
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
    // this.person = person;
    this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    this._fuseConfigService.config = {
      layout: {
        style: 'vertical-layout-1',
        width: 'fullwidth',
        navbar: {
          hidden: true,
          position: 'left',
          folded: true,
          background: 'mat-fuse-dark-700-bg'
        },
        toolbar: {
          hidden: false,
          position: 'below-static',
          background: 'mat-white-500-bg'
        },
        footer: {
          hidden: false,
          position: 'below-static',
          background: 'mat-fuse-dark-900-bg'
        }
      },
      customScrollbars: true
    };
    // Reactive form errors
    this.formErrors = {
      zipcode: {},
      company: {},
      firstName: {},
      lastName: {},
      address: {},
      address2: {},
      city: {},
      state: {},
      postalCode: {},
      country: {}
    };


    // Vertical Stepper form error
    this.verticalStepperStep0Errors = {
      zipcode: {},
      firstName: {},
      lastName: {},
      address: {},
      address2: {},
      city: {},
      state: {},
      postalCode: {}
    };

    this.verticalStepperStep1Errors = {
      firstName: {},
      lastName: {}
    };

    this.verticalStepperStep2Errors = {
      address: {},
      address2: {}
    };

    this.verticalStepperStep3Errors = {
      city: {},
      state: {},
      postalCode: {}
    };

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }



  ngOnInit(): void {

    // Vertical Stepper form stepper
    this.verticalStepperStep0 = this._formBuilder.group({
      zipcode: ['', Validators.required]
    });

    this.verticalStepperStep1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.verticalStepperStep2 = this._formBuilder.group({
      address: ['', Validators.required],
      address2: ['', Validators.required]
    });

    this.verticalStepperStep3 = this._formBuilder.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]]
    });

    this.verticalStepperStep0.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

    this.verticalStepperStep1.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

    this.verticalStepperStep2.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

    this.verticalStepperStep3.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onFormValuesChanged(): void {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.formErrors[field] = {};
      // Get the control
      const control = this.form.get(field);
      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }


  /**
   * Finish the vertical stepper
   */
  finishVerticalStepper(): void {
    var jsons = new Array();
    jsons.push(this.verticalStepperStep0.value);
    jsons.push(this.verticalStepperStep1.value);
    jsons.push(this.verticalStepperStep2.value);
    jsons.push(this.verticalStepperStep3.value);
    this.AppointmentService.setAppointments(jsons.map(x=>{return Object.values(x)}).join());
  }


  setAppointment(name): void {
    this.AppointmentService.setAppointments(name);
  }

  addGame(name, price): void {
    this.gameservice.addGame(name, price);
  }

  getGames(): void {
    this.gameservice.getGames();
  }


}


// export const person = {
//   name: {
//     label: 'Name',
//     value: 'Juri',
//     type: 'text',
//     validation: {
//       required: true
//     }
//   },
//   age: {
//     label: 'Age',
//     value: 32,
//     type: 'text'
//   },
//   gender: {
//     label: 'Gender',
//     value: 'M',
//     type: 'radio',
//     options: [{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]
//   },
//   city: {
//     label: 'City',
//     value: '39010',
//     type: 'select',
//     options: [
//       { label: '(choose one)', value: '' },
//       { label: 'Bolzano', value: '39100' },
//       { label: 'Meltina', value: '39010' },
//       { label: 'Appiano', value: '39057' }
//     ],
//     validation: {
//       required: true
//     }
//   }
// };