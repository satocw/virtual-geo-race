import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ReadFileComponent } from './components/read-file/read-file.component';
import { PlayerComponent } from './components/player/player.component';

const MaterialModule = [MatButtonModule, MatIconModule];

@NgModule({
  declarations: [AppComponent, ReadFileComponent, PlayerComponent],
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
