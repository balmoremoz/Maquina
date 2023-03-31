
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { productoService } from './services/producto.service';
import { MonedasComponent } from './components/monedas/monedas.component';


@NgModule({
  declarations: [
    AppComponent,
    MonedasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [productoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
