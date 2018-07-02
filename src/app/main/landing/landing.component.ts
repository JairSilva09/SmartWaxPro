import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';
import { GameService } from '../services/game.service';
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formErrors: any;

  // Horizontal Stepper
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  horizontalStepperStep1Errors: any;
  horizontalStepperStep2Errors: any;
  horizontalStepperStep3Errors: any;

  // Vertical Stepper
  verticalStepperStep1: FormGroup;
  verticalStepperStep2: FormGroup;
  verticalStepperStep3: FormGroup;
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
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {

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

    // Horizontal Stepper form error
    this.horizontalStepperStep1Errors = {
      firstName: {},
      lastName: {}
    };

    this.horizontalStepperStep2Errors = {
      address: {}
    };

    this.horizontalStepperStep3Errors = {
      city: {},
      state: {},
      postalCode: {}
    };

    // Vertical Stepper form error
    this.verticalStepperStep1Errors = {
      firstName: {},
      lastName: {}
    };

    this.verticalStepperStep2Errors = {
      address: {}
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
    this._fuseConfigService.config
      .subscribe((config) => {
        this.config = config;
      });
    // Reactive Form
    this.form = this._formBuilder.group({
      company: [
        {
          value: 'Google',
          disabled: true
        }, Validators.required
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
      country: ['', Validators.required]
    });

    this.form.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

    // Horizontal Stepper form steps
    this.horizontalStepperStep1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.horizontalStepperStep2 = this._formBuilder.group({
      address: ['', Validators.required]
    });

    this.horizontalStepperStep3 = this._formBuilder.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]]
    });

    this.horizontalStepperStep1.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

    this.horizontalStepperStep2.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

    this.horizontalStepperStep3.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

    // Vertical Stepper form stepper
    this.verticalStepperStep1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.verticalStepperStep2 = this._formBuilder.group({
      address: ['', Validators.required]
    });

    this.verticalStepperStep3 = this._formBuilder.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]]
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


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On form values changed
   */
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
   * Finish the horizontal stepper
   */
  finishHorizontalStepper(): void {
    alert('You have finished the horizontal stepper!');
  }

  /**
   * Finish the vertical stepper
   */
  finishVerticalStepper(): void {
    alert('You have finished the vertical stepper!');
  }

  addGame(name, price): void {
    this.gameservice.addGame(name, price);
  }

  getGames(): void {
    this.gameservice.getGames();
  }


}
