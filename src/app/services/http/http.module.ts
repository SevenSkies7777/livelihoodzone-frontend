import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthInterceptor } from './auth-interceptor';
import { Authorization }  from '../authorization.service';
import { DataLayerUtils }  from '../datalayer.utils.service';
import { HomePageService } from '../home-page.service';
import { CompleteService } from '../login.service';
import { ConfigAuthUrl } from '../oauth2.service';

import { 
    DynamicSnackbarModule 
} from '@fuse/components/dynamic-snackbar/dynamic-snackbar.module';
import { DatePipe } from '@angular/common';
import { ExcelCountyLevelService } from './excel.county-service';

@NgModule({
    imports: [
        HttpClientModule,
        MatSnackBarModule,
        DynamicSnackbarModule,
    ],
    providers: [
        Authorization,
        DataLayerUtils,
        HomePageService,
        CompleteService,
        ConfigAuthUrl,
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptor, 
            multi: true,
        },
        DatePipe,
        ExcelCountyLevelService,
    ],
})

export class HttpModule {}