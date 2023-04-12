import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductoEntity } from '../../models/producto.model';
import { productoService } from '../../services/producto.service';
import { Observable, catchError } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  productos: ProductoEntity[];
  saldo: number;
  title: "front";
  pid: string;
  http: HttpClient;
  apiServerUrl = 'http://localhost:8080/maquina';
  constructor(private productoService: productoService) {
    this.pid = "";
  }

  ngOnInit() {
    this.getProductos();
  }

  public getProductos(): void {
    console.log("this.getProductos");
    this.productoService.getProductos().subscribe(
      (response) => {
        // console.log(response);
        this.productos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  addItem(newItem: Number) {
    console.log(newItem);
    this.saldo = (newItem) as number;
  }


  // addItem2(newItem:Array<String>){
  //   console.log(newItem);
  //   this.arrayImagenes=(newItem) as Array<String>;
  // }

  public modal() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    // btn.onclick = function () {
    // }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.setProperty("display", "none");
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  escribir(event) {

    if (this.pid.length < 2) {
      this.pid += event.target.innerHTML;
      document.getElementById("mostrarProducto").innerHTML = this.pid;

      // if ((((this.pid.length >= 1) && (Number.isInteger(Number(this.pid.charAt(0))) == false))) && (((this.pid.length >= 1) &&
      //   (Number.isInteger(Number(this.pid.charAt(1))) == true)))) {

      //   document.getElementById("mostrarProducto").innerHTML = this.pid;

      // } else {
      //   this.pid = "";
      //   document.getElementById("mostrarProducto").innerHTML = "";
      // }
      console.log(this.pid);

    }
  }
  borrar() {
    document.getElementById("mostrarProducto").innerHTML = "";
    this.pid = "";
  }

  buscarProducto(): Observable<ProductoEntity> {
    var term = this.pid;
    const options = term ?
      { params: new HttpParams().set('find', term) } : {};

    return this.http.get<ProductoEntity>(`http://localhost:8080/maquina/producto`, options);

  }

  // buscarProducto(term: string): Observable<ProductoEntity> {
  //   var term=this.pid;

  //   const options = term ?
  //    { params: new HttpParams().set('find', term) } : {};

  //   return this.http.get<ProductoEntity>(`http://localhost:8080/maquina/producto/`, options)

  // }

}
