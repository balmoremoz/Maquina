
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { productoService } from './services/producto.service';
import { MonedasComponent } from './components/monedas/monedas.component';
import { FormControl, FormsModule } from '@angular/forms';
import { VentasComponent } from './components/ventas/ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    MonedasComponent,
    VentasComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   
  ],
  providers: [productoService, FormControl],
  bootstrap: [AppComponent]
})
export class AppModule { }
