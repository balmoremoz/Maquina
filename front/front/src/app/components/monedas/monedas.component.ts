import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MonedaEntity } from '../../models/moneda.model';
import { MonedaService } from '../../services/moneda.service';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent {
  public monedas: MonedaEntity[];
  public valor;
  public saldo: number = 0;

  @Output() newItemEvent = new EventEmitter<Number>();
  constructor(private monedaService: MonedaService) { }

  ngOnInit() {
    this.getMonedas();
  }

  public getMonedas(): void {
    console.log("this.getMonedas");
    this.monedaService.getMonedas().subscribe(
      (response) => {
        console.log(response);
        this.monedas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public allowDrop(ev) {
    ev.preventDefault();
  }

  public drop(ev) {
    ev.preventDefault();

    var data = ev.dataTransfer.getData("text");

    var m_img = document.createElement("img");
    m_img.draggable = false;
    m_img.src = data;
    m_img.style.setProperty("object-fit", "scale-down");
    m_img.style.setProperty("width", "40px");

    if (ev.target.id == "div2") {
      ev.target.appendChild(m_img);
      this.saldo = this.saldo + this.valor;
    }
    this.valor = 0;
  }
  public drag(ev) {
    ev.dataTransfer.setData("text", ev.target.src);
    this.valor = Number(ev.target.id);
  }

  addNewItem() {
    this.newItemEvent.emit(this.saldo);
  }
}

