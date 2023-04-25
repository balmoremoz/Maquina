import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MonedaEntity } from '../../models/moneda.model';
import { MonedaService } from '../../services/moneda.service';
import { Input } from '@angular/core'; // First, import Input
@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent  {

  public monedas: MonedaEntity[];
  public valor;
  public saldo: number = 0;
  public arrayMonedasInsertadas: MonedaEntity[] = new Array();
  @Output() newItemEvent = new EventEmitter<Number>();
  @Output() monedasInsertadas = new EventEmitter<MonedaEntity[]>();
  @Input() reiniciarCompra;

  constructor(private monedaService: MonedaService) { }

  ngOnInit() {
    this.getMonedas();
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
    if (changes.reiniciarCompra){
      this.devolverDinero();
    }
  }
 

  public getMonedas(): void {
    console.log("this.getMonedas");
    this.monedaService.getMonedas().subscribe(
      (response) => {
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
    var n = 0;
    ev.preventDefault();
    var imagen = document.createElement("img")
    var data = ev.dataTransfer.getData("text");
    imagen.src = data;
    imagen.draggable = false;
    imagen.style.setProperty("object-fit", "scale-down");
    imagen.style.setProperty("width", "40px");

    if (ev.target.id == "div2") {
      ev.target.appendChild(imagen);
    }
    while (n < this.monedas.length) {
      if (this.monedas[n].valor == this.valor) {
        this.arrayMonedasInsertadas.push(this.monedas[n]);
      }
      n++;
    }
    n = 0;

    this.saldo = this.saldo + this.valor;
    this.valor = 0;
    this.newItemEvent.emit(this.saldo);
    this.monedasInsertadas.emit(this.arrayMonedasInsertadas);
  }

  public drag(ev) {
    ev.dataTransfer.setData("text", ev.target.src);
    this.valor = Number(ev.target.id);
  }

  enviarSaldo() {
    this.newItemEvent.emit(this.saldo);
  }

  enviarMonedasInsertadas() {
    this.monedasInsertadas.emit(this.arrayMonedasInsertadas);
  }

  devolverDinero() {
    this.saldo = 0;
    document.getElementById("div2").innerHTML = "";
    this.arrayMonedasInsertadas = [];
    this.enviarSaldo();
    this.enviarMonedasInsertadas();
  }
}