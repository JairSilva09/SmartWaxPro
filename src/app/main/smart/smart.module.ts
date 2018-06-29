import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatDividerModule, MatMenuModule } from '@angular/material';
import { SmartComponent } from './smart.component';

const routes = [
    {
        path     : 'smart',
        component: SmartComponent
    }
];

@NgModule({
    declarations: [
        SmartComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatDividerModule,
        MatMenuModule
    ],
    exports     : [
        SmartComponent
    ]
})

export class SmartModule
{
}
