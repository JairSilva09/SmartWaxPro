import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'smart',
    templateUrl: './smart.component.html',
    styleUrls  : ['./smart.component.scss']
})
export class SmartComponent implements OnInit
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    config: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._fuseConfigService.config = {
            layout          : {
                style         : 'vertical-layout-1',
                width         : 'fullwidth',
                navbar        : {
                    hidden    : true,
                    position  : 'left',
                    folded    : true,
                    background: 'mat-fuse-dark-700-bg'
                },
                toolbar       : {
                    hidden    : false,
                    position  : 'below-static',
                    background: 'mat-white-500-bg'
                },
                footer        : {
                    hidden    : false,
                    position  : 'below-static',
                    background: 'mat-fuse-dark-900-bg'
                }
            },
            customScrollbars: true
        };
    }
    ngOnInit(): void {
        this._fuseConfigService.config
        .subscribe((config) => {
            this.config = config;
        });
    }
}
