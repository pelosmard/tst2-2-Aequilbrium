import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranferredService {
  //Transferredautobots = [
  // ];

  Transferreddecepticons = [
  ];

  getTransAuto() {
    return this.Transferredautobots;
  }

  getTransDecept() {
    return this.Transferreddecepticons;
  }

  clearTransAuto() {
    this.Transferredautobots = [];
    return this.Transferredautobots;
  }

  clearTransDecept() {
    this.Transferreddecepticons = [];
    return this.Transferreddecepticons;
  }

  constructor(
    private Transferredautobots = [
    ];
  ) { }
}
