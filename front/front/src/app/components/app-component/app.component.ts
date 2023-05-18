import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { productoService } from '../../services/producto.service';
import { Moneda } from 'src/app/models/moneda.model';
import { VentaService } from '../../services/venta.service';
import { Venta } from 'src/app/models/venta.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {

  productos: Producto[];
  saldo: number;
  productoId: string = "";
  monedasInsertadas: Moneda[] = [];
  cambios: Moneda[] = [];
  cambio: number = 0;
  reiniciarCompra: boolean = false;
  productoSeleccionado: Producto;
  admin: boolean = false;
  cantidadInsertar: number = 0;
  nombreAgregar: string = "";
  valorAgregar: number = 0;
  listaMonedas: Moneda[];
  reiniciarListado: boolean = false;
  ventas: Venta[] = [];
  mostrarGanancias: boolean = false;
  mostrarCambio: boolean = false;
  botones: string[] = ["1", "2", "3", "4", "5", "A", "B", "C", "D", "E"];
  adminPass: string = "123";

  fechaInicio: string = "";
  fechaFin: string = "";;

  gananciasFiltradas: number;
  ventasFiltradas: Venta[] = [];

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

  anadirVenta(idProducto: number, dinero: number): void {
    this.ventaService.anadirVenta(idProducto, dinero).subscribe(
      (response) => {
        this.getVentas();
        console.log("Venta agregada correctamente");
      },
      (error) => {
        console.error("Error al agregar la venta:", error);
      }
    );
  }

  getVentas(): void {
    this.ventaService.getVentas().subscribe((response) => { this.ventas = response },
      (error) => {
        console.error("Error", error)
      }
    );
  }

  addItem(newItem: Number): void {
    this.saldo = (newItem) as number;
  }

  addItem2(newItem: Moneda[]): void {
    this.monedasInsertadas = (newItem) as Moneda[];
  }

  addItem3(newItem: Moneda[]): void {
    this.listaMonedas = (newItem) as Moneda[];
  }

  modal(): void {
    let modal = document.getElementById("modalMonedas");
    let span = document.getElementById("cerrarModal");

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

  escribirProducto(event): void {
    if (this.admin == false) {
      this.productoId += event.target.innerHTML;
      document.getElementById("mostrarProducto").innerHTML = "Producto: " + this.productoId;
    }
  }

  borrar(): void {
    this.productoId = this.productoId.substring(0, this.productoId.length - 1);;
    document.getElementById("mostrarProducto").innerHTML = "Producto: " + this.productoId;
    this.cambio = 0;
  }

  borrarTodo(): void {
    this.productoId = "";
    document.getElementById("mostrarProducto").innerHTML = "Producto: ";
  }

  compra(): void {
    if (this.productoId.length > 2) {
        this.isAdmin();
        return;
    }

    this.getProductos();
    const listamonedasInsertadas = this.contarMonedas(this.monedasInsertadas);
    let saldoMonedas = this.monedasInsertadas.reduce((saldo, item) => saldo + Number(item.valor), 0);
    saldoMonedas = Number(saldoMonedas.toFixed(2));

    this.productoSeleccionado = this.productos.find(producto => producto.posicion === this.productoId);
    const { productoId, monedasInsertadas, productoSeleccionado } = this;

    if (monedasInsertadas.length === 0 && productoId.length === 2) {
        alert("Error: inserte monedas");
        return;
    }

    if (productoId === "") {
        alert("Error: selecciona un producto");
        return;
    }

    if (productoId.length <= 1) {
        alert("Error: Posicion no válida");
        return;
    }

    if (productoSeleccionado?.cantidad === 0) {
        alert("Error: no queda producto");
        return;
    }

    if (productoSeleccionado?.precioVenta > saldoMonedas) {
        alert("Error: faltan monedas");
        return;
    }

    this.productoService.getMonedasyProducto(listamonedasInsertadas, productoId).subscribe(
        (response) => {
            this.cambios = response;
            this.contarCambio(this.cambios);
            this.reiniciarCompra = true;
            alert("compra realizada");
            this.reiniciarListado = true;
            this.anadirVenta(productoSeleccionado.id, productoSeleccionado.precioVenta);
            this.getVentas();
            this.mostrarGanancias = false;
            this.mostrarCambio = true;
            this.productoId = "";
            document.getElementById("mostrarProducto").innerHTML = "Producto: ";
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    );

    this.getProductos();
    this.reiniciarCompra = false;
    this.reiniciarListado = false;
}

  isAdmin() {
    if (this.productoId == this.adminPass) {
      document.getElementById("adminBotones").style.setProperty("visibility", "visible");
      this.productoId = "";
      document.getElementById("mostrarProducto").innerHTML = "Producto: ";
    } else {
      return;
    }
  }

  contarMonedas(listaMonedasInsertadas): String[] {

    let valorMonedas: String[] = [];

    listaMonedasInsertadas.forEach(item => {
      valorMonedas.push(item.valor);
    });
    return valorMonedas;
  }

  contarCambio(cambios: Moneda[]): void {
    cambios.forEach(moneda => {
      this.cambio = this.cambio + moneda.valor;
    })
  }

  insertarProductos(): void {
    this.ocultarTodo();
    document.getElementById("inputs").style.setProperty("display", "block");
    document.getElementById("inputPosicion").style.setProperty("display", "block");
    document.getElementById("inputCantidad").style.setProperty("visibility", "visible");
    document.getElementById("nuevoProductoBtn").style.setProperty("display", "block");
  }

  insertarMonedas(): void {
    this.ocultarTodo();
    document.getElementById("inputs").style.setProperty("display", "block");
    document.getElementById("inputValor").style.setProperty("display", "block");
    document.getElementById("inputCantidad").style.setProperty("visibility", "visible");
  }

  listarProductos(): void {
    this.ocultarTodo();
    document.getElementById("listaProductos").style.setProperty("display", "block");
  }

  listarMonedas(): void {
    this.ocultarTodo();
    document.getElementById("listaMonedas").style.setProperty("display", "block");
  }

  mostrarFormulario() {
    this.ocultarTodo();
    document.getElementById("formNuevoProducto").style.setProperty("display", "block");
  }


  ocultarTodo() {
    document.getElementById("inputs").style.setProperty("display", "none");
    document.getElementById("inputValor").style.setProperty("display", "none");
    document.getElementById("inputCantidad").style.setProperty("visibility", "hidden");
    document.getElementById("inputPosicion").style.setProperty("display", "none");
    document.getElementById("listaProductos").style.setProperty("display", "none");
    document.getElementById("listaMonedas").style.setProperty("display", "none");
    document.getElementById("nuevoProductoBtn").style.setProperty("display", "none");
    document.getElementById("formNuevoProducto").style.setProperty("display", "none");
    this.mostrarGanancias = false;
  }

  confirmarInsertar(): void {
    if (this.cantidadInsertar <= 0) {
      alert("Error: Introduce un valor mayor que 0");
      return;
    }
    if ((this.nombreAgregar == "") && (this.valorAgregar == 0)) {
      alert("Error: Selecciona posicion/valor");
      return;
    }
    if (this.nombreAgregar != "") {

      this.productoService.anadirProducto(this.nombreAgregar, this.cantidadInsertar).subscribe(response => {
        alert("Producto añadido");
        this.getProductos();
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
      this.nombreAgregar = "";
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

  nuevoProducto(form: NgForm) {
    this.productoService.nuevoProducto(form.value).subscribe(
      (response: Producto) => {
        this.getProductos();
        form.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        form.reset();
      }
    );
  }
  verGanancias() {
    this.ocultarTodo()
    this.mostrarGanancias = true;
  }

  public getGananciasByFecha(): void {
    this.ventaService.filtrarGanancias(this.fechaInicio, this.fechaFin).subscribe(
      (response) => {
        this.getVentas();
        this.gananciasFiltradas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getVentasByFecha(): void {
    this.ventaService.filtrarVentas(this.fechaInicio, this.fechaFin).subscribe(
      (response) => {
        this.getGananciasByFecha();
        this.getVentas();
        console.log(this.fechaInicio,this.fechaFin);
        
        this.ventasFiltradas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
