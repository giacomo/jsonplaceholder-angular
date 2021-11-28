import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PostModule } from './controller/post/post.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PostModule,
        SharedModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: 'apiUrl', useValue: environment.url
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
