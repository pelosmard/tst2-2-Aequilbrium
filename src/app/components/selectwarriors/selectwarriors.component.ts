import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Autobots } from './data-autobot';
import { Decepticons } from './data-decepticons';

@Component({
  selector: 'app-selectwarriors',
  templateUrl: './selectwarriors.component.html',
  styleUrls: ['./selectwarriors.component.css']
})
export class SelectwarriorsComponent implements OnInit {

  transferredautobots = [
  ];

  transferreddecepticons = [
  ];

  Decepticonsarr = [];
  Autobotsarr = [];
  playersAuto = [];
  playersDecept = [];
  battleResult = [];
  winnersAuto = [];
  winnersDecept = [];
  losersAuto = [];
  losersDecept = [];

  autobots = Autobots;
  decepticons = Decepticons;

  public isTransferredVisible = false;
  public makeVisibleResults = false;
  public MessageVisible = false;
  public swPrimevsPredaking = false;
  public message = '';
  constructor() { }

  setButTransVisible() {
    this.isTransferredVisible = true;
  }

  sortPlayersAuto() {
    this.playersAuto.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
  }

  traverseTransAuto() {
    this.transferredautobots.forEach(element => {
      this.findTransfAuto(element);
    });
    this.sortPlayersAuto();
    this.setButTransVisible();
    this.traverseTransDecept();
  }

  findTransfAuto(index) {
    this.playersAuto.push(index);
  }

  sortPlayersDecept() {
    this.playersDecept.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
  }

  traverseTransDecept() {
    this.transferreddecepticons.forEach(element => {
      this.findTransfDecept(element);
    });
    this.sortPlayersDecept();
  }

  findTransfDecept(index) {
    this.playersDecept.push(index);
  }

  storeArrResult(ndy: number, team: string, outcome: number, totalA: number, totalD: number) {
    let soutcome: string, autoelement: string, deceptelement: string;
    switch (outcome) {
      case 1:
        soutcome = 'Win Autobot';
        autoelement = this.playersAuto[ndy].name;
        deceptelement = this.playersDecept[ndy].name;
        if ((this.winnersAuto.findIndex(o => o.name === autoelement)) == -1) {   //  Didn't find
          this.winnersAuto.push(this.playersAuto[ndy]);                            //  Insert in winners
        }
        this.losersDecept.push(this.playersDecept[ndy]);
        break;
      case 2:
        soutcome = 'Win Decepticons';
        autoelement = this.playersDecept[ndy].name;
        deceptelement = this.playersAuto[ndy].name;
        if ((this.winnersDecept.findIndex(o => o.name === autoelement)) == -1) {   //  Didn't find
          this.winnersDecept.push(this.playersDecept[ndy]);                          //  Insert in winners
        }
        this.losersAuto.push(this.playersAuto[ndy]);
        break;
      case 3:
        soutcome = 'a tie';
        break;
      case 4:
        soutcome = 'game ends';
        break;
    }
    let nbat: number = ndy + 1;
    let resultbattle = {
      'numbattle': nbat,
      'winningteam': 'Decepticons',
      'autoelement': autoelement,
      'deceptelement': deceptelement,
      'outcome': soutcome,
      'totalA': totalA,
      'totalD': totalD
    }
    this.battleResult.push(resultbattle);
  }

  basSpecExcepRules(ndx: number): boolean {
    let has_run_away: boolean = false;
    let autostrength: number = this.playersAuto[ndx].strength;
    let autocourage: number = this.playersAuto[ndx].courage;
    let autoskill: number = this.playersAuto[ndx].skill;
    let autostotal: number = this.playersAuto[ndx].total;
    let deceptstrength: number = this.playersDecept[ndx].strength;
    let deceptcourage: number = this.playersDecept[ndx].courage;
    let deceptskill: number = this.playersDecept[ndx].skill;
    let decepttotal: number = this.playersDecept[ndx].total;

    //Check if it is a run awway
    if (((autocourage < deceptcourage) && (deceptcourage - autocourage) > 3) &&
      ((autostrength < deceptstrength) && (deceptstrength - autostrength) > 2)) {
      this.storeArrResult(ndx, 'Decepticons', 2, this.playersAuto[ndx].total, this.playersDecept[ndx].total);
      return false;
    } else
      if (((deceptcourage < autocourage) && (autocourage - deceptcourage) > 3) &&
        ((deceptstrength < autostrength) && (autostrength - deceptstrength) > 2)) {
        this.storeArrResult(ndx, 'Autobots', 1, this.playersAuto[ndx].total, this.playersDecept[ndx].total);
        return false;
      }

    //  A tie?
    if (autostotal == decepttotal) {        //  A tie
      this.storeArrResult(ndx, 'Autobots', 3, this.playersAuto[ndx].total, this.playersDecept[ndx].total);
      return false;
    }

    //  Special rules

    //  Optimus Prime or Predaking wins his fight automatically
    if (this.playersAuto[ndx].name == 'Optimus Prime') {
      this.storeArrResult(ndx, 'Autobots', 1, this.playersAuto[ndx].total, this.playersDecept[ndx].total);
      return false;
    }
    if (this.playersDecept[ndx].name == 'Predaking') {
      this.storeArrResult(ndx, 'Decepticons', 2, this.playersAuto[ndx].total, this.playersDecept[ndx].total);
      return false;
    }

    //  Optimus Prime vs. Predaking
    if ((this.playersAuto[ndx].name == 'Optimus Prime') &&
      (this.playersDecept[ndx].name == 'Predaking')) {
      this.storeArrResult(ndx, 'Autobots', 4, this.playersAuto[ndx].total, this.playersDecept[ndx].total);
      this.swPrimevsPredaking = true;
      return true;
    }

    return true;
  }

  makeBattle() {
    let numAutob = this.playersAuto.length;		  //	Get number of elements in array of players Autobots
    let numDecept = this.playersDecept.length;	//	Get number of elements in array of players Decepticons
    if (numAutob != numDecept) {
      this.isTransferredVisible = false;
      this.message = 'Error, number of contestants is not equal';
      this.MessageVisible = true;
      return;
    }
    for (let index = 0; index < this.playersAuto.length; index++) {
      const elemautob = this.playersAuto[index];
      const elemdecep = this.playersDecept[index];
      if (this.basSpecExcepRules(index)) {
        //  Check who is the winner
        if (this.swPrimevsPredaking) {          //   Optimus Prime and Predakingface each other
          break;
        }
        if (this.playersAuto[index].total > this.playersDecept[index].total) {  //  Wins Autobots
          this.storeArrResult(index, 'Autobots', 1, this.playersAuto[index].total, this.playersDecept[index].total);
        } else {                                                                //  Wins Decepticons
          this.storeArrResult(index, 'Decepticons', 2, this.playersAuto[index].total, this.playersDecept[index].total);
        }
      }
    }
    this.makeVisibleResults = true;
  }

  dropItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnInit(): void {
  }

}
