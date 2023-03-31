import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductoEntity } from '../../models/producto.model';
import { productoService } from '../../services/producto.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  productos: ProductoEntity[];
  saldo: number;
  title: "front";

  constructor(private productoService: productoService) { }

  ngOnInit() {
    this.getProductos();
  }

  public getProductos(): void {
    console.log("this.getProductos");
    this.productoService.getProductos().subscribe(
      (response) => {
        console.log(response);
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

  public mostrarModal() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");

    modal.style.setProperty("display", "block");

    window.onclick = function (event) {
      if (event.target != modal) {
        modal.style.display = "none";
      }
    }
  }
}