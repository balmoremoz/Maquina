import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductoEntity } from '../../models/producto.model';
import { productoService } from '../../services/producto.service';
import { MonedaEntity } from 'src/app/models/moneda.model';
import { VentaService } from '../../services/venta.service';
import { VentaEntity } from 'src/app/models/venta.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  title: "front";
  productos: ProductoEntity[];
  saldo: number;
  productoId: string = "";
  monedasInsertadas: MonedaEntity[] = [];
  cambios: MonedaEntity[] = [];
  cambio: number = 0;
  reiniciarCompra: boolean = false;
  productoSeleccionado: ProductoEntity[];
  admin: boolean = false;
  cantidadInsertar: number = 0;
  posicionAgregar: string = "";
  valorAgregar: number = 0;
  listaMonedas: MonedaEntity[];
  reiniciarListado: boolean = false;
  ventas: VentaEntity[] = [];
  ganancias: number;
  mostrar: boolean = false;

  constructor(private productoService: productoService, private ventaService: VentaService) {

  }

  ngOnInit() {
    this.getProductos();
    this.getVentas();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(
      (response) => {
        this.productos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public anadirVenta(idProducto: number, dinero: number): void {
    this.ventaService.anadirVenta(idProducto, dinero).subscribe((response) => {

    });
  }

  public getVentas(): void {
    this.ventaService.getVentas().subscribe(
      (response) => {
        this.ventas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });

  }


  addItem(newItem: Number) {
    this.saldo = (newItem) as number;
  }

  addItem2(newItem: MonedaEntity[]) {
    this.monedasInsertadas = (newItem) as MonedaEntity[];
  }

  addItem3(newItem: MonedaEntity[]) {
    this.listaMonedas = (newItem) as MonedaEntity[];
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
    if (this.admin == false) {
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
  }

  borrar() {
    document.getElementById("mostrarProducto").innerHTML = "Producto:";
    this.productoId = "";
    this.cambio = 0;
  }

  compra() {
    if (this.productoId.length > 2) {
      this.isAdmin();
      return;
    }
    this.getProductos();
    let listamonedasInsertadas = this.contarMonedas(this.monedasInsertadas);
    var saldoMonedas = 0;
    this.productoSeleccionado = this.productos.filter(producto => producto.posicion == this.productoId);

    if ((this.monedasInsertadas.length == 0) && (this.productoId.length == 2)) {
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
        this.reiniciarListado = true;
        this.anadirVenta(this.productoSeleccionado[0].id, this.productoSeleccionado[0].precioVenta);
        this.getVentas();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.getProductos();
    this.borrar();
    document.getElementById("mostrarCambio").style.setProperty("display", "block");
    this.reiniciarCompra = false;
    this.reiniciarListado = false;
  }
  isAdmin() {
    if (this.productoId == "D2315A") {
      document.getElementById("adminControl").style.setProperty("visibility", "visible");
    } else {
      return;
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

  insertarProductos() {
    document.getElementById("inputs").style.setProperty("display", "block");
    document.getElementById("inputPosicion").style.setProperty("display", "block");
    document.getElementById("inputCantidad").style.setProperty("visibility", "visible");
    document.getElementById("inputValor").style.setProperty("display", "none");
  }

  insertarMonedas() {
    document.getElementById("inputs").style.setProperty("display", "block");
    document.getElementById("inputValor").style.setProperty("display", "block");
    document.getElementById("inputCantidad").style.setProperty("visibility", "visible");
    document.getElementById("inputPosicion").style.setProperty("display", "none");

  }

  listarProductos() {
    document.getElementById("listaProductos").style.setProperty("display", "block");
  }

  listarMonedas() {
    document.getElementById("listaMonedas").style.setProperty("display", "block");
  }

  getGanancias(ventas: VentaEntity[]) {
    this.getVentas();
    let dineroVenta: number = 0;
    let dineroCompra: number = 0;

    ventas.forEach((venta) => {
      dineroVenta += venta.dineroIngresado;
      dineroCompra += venta.producto.precioCompra;
    });
    this.ganancias = dineroVenta - dineroCompra;
    this.mostrar = true;
  }

  confirmarInsertar() {
    if (this.cantidadInsertar <= 0) {
      alert("Error: Introduce un valor mayor que 0");
      return;
    }
    if ((this.posicionAgregar == "") && (this.valorAgregar == 0)) {
      alert("Error: Selecciona posicion/valor");
      return;
    }
    if (this.posicionAgregar != "") {

      this.productoService.anadirProducto(this.posicionAgregar, this.cantidadInsertar).subscribe(response => {
        alert("Producto añadido");
        this.getProductos();
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        })
      this.posicionAgregar = "";
    }

    if (this.valorAgregar != 0) {
      this.productoService.anadirMoneda(this.valorAgregar, this.cantidadInsertar).subscribe(response => {
        alert("Moneda anadida");
        this.reiniciarListado = true;
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        })
      this.valorAgregar = 0;
      this.reiniciarListado = false;
    }
  }
}
