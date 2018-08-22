import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ReadFileComponent } from './components/read-file/read-file.component';

const MaterialModule = [MatButtonModule, MatCheckboxModule];

@NgModule({
  declarations: [AppComponent, ReadFileComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LeafletModule.forRoot(),
    ...MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
