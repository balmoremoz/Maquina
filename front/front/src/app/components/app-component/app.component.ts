import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductoEntity } from '../../models/producto.model';
import { productoService } from '../../services/producto.service';
import { MonedaEntity } from 'src/app/models/moneda.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{
  title: "front";
  productos: ProductoEntity[];
  saldo: number;
  productoId: string = "";
  monedasInsertadas: MonedaEntity[] = [];
  cambios: MonedaEntity[] = [];
  cambio: number = 0;
  reiniciarCompra: boolean = false;
  productoSeleccionado:ProductoEntity[];
  contrasena:string="D2315A";
  admin: boolean;
  
  constructor(private productoService: productoService,) { }

  ngOnInit() {
    this.getProductos();
  }

  public getProductos(): void {
    this.productoService.getProductos().subscribe(
      (response) => {
        this.productos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  addItem(newItem: Number) {
    this.saldo = (newItem) as number;
  }

  addItem2(newItem: MonedaEntity[]) {
    this.monedasInsertadas = (newItem) as MonedaEntity[];
  }

  public modal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementById("close");

    modal.style.display = "block";
    span.onclick = function () {
      modal.style.setProperty("display", "none");
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  escribir(event) {
    document.getElementById("cambio").style.setProperty("display", "none");

      this.productoId += event.target.innerHTML;
      document.getElementById("mostrarProducto").innerHTML += this.productoId;

      if ((((this.productoId.length >= 1) && (Number.isInteger(Number(this.productoId.charAt(0))) == false))) && (((this.productoId.length >= 1) &&
        (Number.isInteger(Number(this.productoId.charAt(1))) == true)))) {

        document.getElementById("mostrarProducto").innerHTML = this.productoId;

      } else {
        this.productoId = "";
        document.getElementById("mostrarProducto").innerHTML = "";
      }


  }

  borrar() {
    document.getElementById("mostrarProducto").innerHTML = "Producto:";
    this.productoId = "";
    this.cambio = 0;
  }

  compra() {
    if((this.productoId.length > 2) &&(this.productoId==this.contrasena)){
      return this.isAdmin();
    }
    this.getProductos();
    let listamonedasInsertadas = this.contarMonedas(this.monedasInsertadas);
    var saldoMonedas = 0;
    this.productoSeleccionado=this.productos.filter(producto=>producto.posicion==this.productoId);

    if ((this.monedasInsertadas.length == 0)&&(this.productoId.length==2)) {
      alert("Error: inserte monedas");
      return;
    }

    if (this.productoId == "") {
      alert("Error: selecciona un producto");
      return;
    }

    if (this.productoId.length <= 1) {
      alert("Error : Posicion no válida")
      return;
    }
    if (this.productoSeleccionado[0]?.cantidad == 0) {
      alert("Error: no queda producto");
      return;
    }
    this.monedasInsertadas.forEach(item => {
      saldoMonedas += Number(item.valor);
      saldoMonedas = Number(saldoMonedas.toFixed(2));
    });

    if (this.productoSeleccionado[0]?.precioVenta > saldoMonedas) {
      alert("Error: faltan monedas");
      return;
    }
    this.productoService.getMonedasyProducto(listamonedasInsertadas, this.productoId).subscribe(

      (response) => {
        this.cambios = response;
        this.contarCambio(this.cambios);
        this.reiniciarCompra = true;
        alert("compra realizada");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.getProductos();
    this.borrar();
    document.getElementById("mostrarCambio").style.setProperty("display", "block");
    this.reiniciarCompra = false;
  }
  isAdmin(){
    document.getElementById("adminControl").style.setProperty("visibility", "visible");
    if(this.productoId==this.contrasena){
      this.admin = true;
    }else{
      this.admin = false;
    }

    this.borrar();
  }

  contarMonedas(listaMonedasInsertadas): String[] {

    let valorMonedas: String[] = [];

    listaMonedasInsertadas.forEach(item => {
      valorMonedas.push(item.valor);
    });
    return valorMonedas;
  }

  contarCambio(cambios: MonedaEntity[]) {
    cambios.forEach(moneda => {
      this.cambio = this.cambio + moneda.valor;
    })

  }
}
