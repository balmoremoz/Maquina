import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductoEntity } from './producto';
import { productoService } from './producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  
  public productos:ProductoEntity[];
  title: any;

  constructor(private productoService:productoService) { }
  ngOnInit(){
    this.getProductos();
  }

  public getProductos():void{
    console.log("this.getProductos");
    this.productoService.getProductos().subscribe(
      (response)=>{
        console.log(response);
        this.productos=response;
      },  
      (error:HttpErrorResponse)=>{
        alert(error.message); 
       }
    )
  }
}
