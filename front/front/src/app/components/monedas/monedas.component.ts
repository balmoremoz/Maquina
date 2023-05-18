import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Moneda } from '../../models/moneda.model';
import { MonedaService } from '../../services/moneda.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent implements OnChanges  {

  public monedas: Moneda[] = [];
  public valor: number;
  public saldo: number = 0;
  public arrayMonedasInsertadas: Moneda[] = [];
  public listadoMonedas: Moneda[];
  @Output() newItemEvent = new EventEmitter<Number>();
  @Output() monedasInsertadas = new EventEmitter<Moneda[]>();
  @Output() listarMonedas = new EventEmitter<Moneda[]>();
  @Input() reiniciarCompra: boolean;
  @Input() reiniciarListado: boolean;

  constructor(private monedaService: MonedaService) { }

  ngOnInit() {
    this.getMonedas();
    this.addNewItem();
  }

  
  ngOnChanges(changes: SimpleChanges) {

    if (changes.reiniciarCompra) {
      this.devolverDinero();
    }
    if (changes.reiniciarListado) {
      this.getMonedas();
    }
  }


  getMonedas(): void {
    this.monedaService.getMonedas().subscribe(
      (response) => {
        this.monedas = response;
        this.listarMonedas.emit(this.monedas);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    )
  }

  allowDrop(ev):void {
    ev.preventDefault();
  }

  drop(ev):void {
    var n = 0;
    ev.preventDefault();
    var imagen = document.createElement("img")
    var data = ev.dataTransfer.getData("text");
    imagen.src = data;
    imagen.draggable = false;
    imagen.style.setProperty("object-fit", "scale-down");
    imagen.style.setProperty("width", "40px");

    if (ev.target.id == "divInsertarMonedas") {
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

  drag(ev):void {
    ev.dataTransfer.setData("text", ev.target.src);
    this.valor = Number(ev.target.id);
  }

  enviarSaldo():void {
    this.newItemEvent.emit(this.saldo);
  }

  enviarMonedasInsertadas():void {
    this.monedasInsertadas.emit(this.arrayMonedasInsertadas);
  }

  addNewItem():void {
    this.listarMonedas.emit(this.listadoMonedas);
  }

  devolverDinero():void {
    this.saldo = 0;
    document.getElementById("divInsertarMonedas").innerHTML = "";
    this.arrayMonedasInsertadas = [];
    this.enviarSaldo();
    this.enviarMonedasInsertadas();
  }
}