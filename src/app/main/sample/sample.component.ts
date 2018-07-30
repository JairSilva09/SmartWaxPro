import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements OnInit
{
  form: FormGroup;
  formErrors: any;
  private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder
    )
    {
        this._fuseConfigService.config = {
            layout: {
              style: 'vertical-layout-1',
              width: 'fullwidth',
              navbar: {
                hidden: false,
                position: 'left',
                folded: false,
                background: 'mat-fuse-dark-700-bg'
              },
              toolbar: {
                hidden: false,
                position: 'below-static',
                background: 'mat-white-500-bg'
              },
              footer: {
                hidden: true,
                position: 'below-static',
                background: 'mat-fuse-dark-900-bg'
              }
            },
            customScrollbars: true
          };
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

         // Reactive form errors
         this.formErrors = {
          company   : {},
          firstName : {},
          lastName  : {},
          address   : {},
          address2  : {},
          city      : {},
          state     : {},
          postalCode: {},
          country   : {}
      };

      this._unsubscribeAll = new Subject();

    }


    ngOnInit(): void {
      // Reactive Form
      this.form = this._formBuilder.group({
        company    : ['', Validators.required],
        firstName : ['', Validators.required],
        lastName  : ['', Validators.required],
        address   : ['', Validators.required],
        address2  : ['', Validators.required],
        city      : ['', Validators.required],
        state     : ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.maxLength(5)]],
        country   : ['', Validators.required]
    });
  
    this.form.valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {
            this.onFormValuesChanged();
        });
    }
      /**
     * On form values changed
     */
    onFormValuesChanged(): void
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }

}
