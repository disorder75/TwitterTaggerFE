import { Injectable } from '@angular/core';
import { StatsInterface } from '../services/statsInterface';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  temporaryStats: StatsInterface = {
    politics: 0,
    economy: 0,
    workAndWelfare: 0,
    tourism: 0,
    instruction: 0,
    covid19: 0,
    science: 0,
    sport: 0,
    people: 0,
    abroadVoices: 0,
    unknown: 0
  };

  constructor() { 

  }


  update(prediction: string) {

    switch (prediction.toLowerCase()) {
      case 'politics':
        this.temporaryStats.politics++;
        break;
      case 'economy':
        this.temporaryStats.economy++;
        break;
      case 'tourism':
        this.temporaryStats.tourism++;
        break;
      case 'instruction':
        this.temporaryStats.instruction++;
        break;
      case 'covid19':
        this.temporaryStats.covid19++;
        break;
      case 'science':
        this.temporaryStats.science++;
        break;
      case 'work and welfare':
        this.temporaryStats.workAndWelfare++;
        break;
      case 'sport':
        this.temporaryStats.sport++;
        break;
      case 'abroad voices':
        this.temporaryStats.abroadVoices++;
        break;
      case 'people':
        this.temporaryStats.people++;
        break;  
      case 'unknown':
      default:
        this.temporaryStats.unknown++;
    }
  }

  getStats() {
    return this.temporaryStats;
  };

  getArrayStats() { 
    var foo = [];
    var i=0;
    for (const property in this.temporaryStats) {
      foo[i] = this.temporaryStats[property];
      i++;
    }
    return foo;
  }

  resetStats() { 
    for (const property in this.temporaryStats) {
      this.temporaryStats[property] = 0;
    }
  }


}
