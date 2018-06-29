import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { SmartModule } from './main/smart/smart.module';
import { LandingModule } from './main/landing/landing.module';
import { PricingModule } from './main/pages/pricing/pricing.module';


const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'smart'
    },
    {
        path      : 'landing',
        loadChildren: './main/landing/landing.module#LandingModule'
    },
    {
        path      : 'smart',
        loadChildren: './main/smart/smart.module#SmartModule'
    },
    {
        path        : 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        SmartModule,
        LandingModule,
        PricingModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
