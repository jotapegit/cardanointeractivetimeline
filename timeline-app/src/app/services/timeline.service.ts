import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import historicalData from '../../assets/data-sources/timeline-data.json';
import moment from 'moment';
import _ from "lodash";
declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  timelineSettings: any = {
    showPriceChart: true,
    showTVLusd: false,
    showTVLada: false
  }

  connectorsData: any = [];
  minAdaPrice: any;
  maxAdaPrice: any;
  minTVL: any;
  maxTVL: any;
  minTVLada: any;
  maxTVLada: any;

  constructor(private http: HttpClient) {

    console.log('INIT');

    this.maxAdaPrice = _.maxBy(this.getHistoricalPriceData, (obj: any) => parseFloat(obj.priceUSD));
    this.minAdaPrice = _.minBy(this.getHistoricalPriceData, (obj: any) => parseFloat(obj.priceUSD));
    this.minTVL = _.minBy(this.getHistoricalPriceData, (obj: any) => parseFloat(obj.tvlUSD));
    this.maxTVL = _.maxBy(this.getHistoricalPriceData, (obj: any) => parseFloat(obj.tvlUSD));
    this.minTVLada = _.minBy(this.getHistoricalPriceData, (obj: any) => parseFloat(obj.tvlADA));
    this.maxTVLada = _.maxBy(this.getHistoricalPriceData, (obj: any) => parseFloat(obj.tvlADA));

    console.log(this.maxAdaPrice);
    console.log(this.minAdaPrice);
    console.log(this.minTVL);
    console.log(this.maxTVL);
    console.log(this.minTVLada);
    console.log(this.maxTVLada);
  }

  getSettings(id: string) {
    return this.timelineSettings[id];
  }

  switchSettings(id: string) {

    this.timelineSettings = {
      showPriceChart: false,
      showTVLusd: false,
      showTVLada: false
    }

    this.timelineSettings[id] = !this.timelineSettings[id];
  }

  public getOffset(el: any) {
    if(el && _.isFunction(el.getBoundingClientRect)) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
    }
    return {}
  }

  public get getConnectors() {
    return this.connectorsData;
  }

  public hasProperty(source: any, path: string) {
    return _.has(source, path);
  }

  public papersCount(markers: any) {
    return markers.filter((obj: any) => obj['category'] === "paper").length
  }

  /*
  public connectPoints() {
    console.log('');
    console.log('-- CONNECT POINTS --');
    let points = document.getElementsByClassName('connector-point');
    //console.log(points);

    let index = 0;
    _.forEach(points, item => {
      //console.log('-- '+ index);
      //console.log(item);
      //console.log(points[index]);
      //console.log(points[index+1]);

      let startPosition = this.getOffset(points[index]);
      let endPosition = this.getOffset(points[index+1]);
      //console.log(startPosition);
      //console.log(endPosition);


      this.connectorsData.push({
        startElem: startPosition,
        endElem: endPosition,
      })

      index++;
    });

    console.log(this.connectorsData);
  }
   */

  // VOLUME CHART
  public calculateTVLAdaRangePercentage(inputNumber: any) {

    const minValue = this.getMinTVLada;
    const maxValue = this.getMaxTVLada;

    if(_.has(inputNumber, 'markersData.tvlADA')) {
      inputNumber = inputNumber['markersData']['tvlADA'];
    }

    if(inputNumber < minValue || inputNumber > maxValue) {
      return "Zadane číslo je mimo rozsahu medzi minimálnou a maximálnou hodnotou.";
    }

    let range = maxValue - minValue;
    let relativeValue = inputNumber - minValue;

    let percentage = (relativeValue / range) * 100;

    return percentage * 0.6;
  }

  public calculateTVLRangePercentage(inputNumber: any) {

    const minValue = this.getMinTVL;
    const maxValue = this.getMaxTVL;

    if(_.has(inputNumber, 'markersData.tvlUSD')) {
      inputNumber = inputNumber['markersData']['tvlUSD'];
    }

    if(inputNumber < minValue || inputNumber > maxValue) {
      return "Zadane číslo je mimo rozsahu medzi minimálnou a maximálnou hodnotou.";
    }

    let range = maxValue - minValue;
    let relativeValue = inputNumber - minValue;

    let percentage = (relativeValue / range) * 100;

    return percentage * 0.6;
  }

  public calculatePriceRangePercentage(inputNumber: any) {

    const minValue = this.getMinAdaPrice;
    const maxValue = this.getMaxAdaPrice;

    if(_.has(inputNumber, 'markersData.priceUSD')) {
      inputNumber = inputNumber['markersData']['priceUSD'];
    }

    if(inputNumber < minValue || inputNumber > maxValue) {
      //console.log('SHIT');
      //console.log(inputNumber);
      //console.log(minValue);
      //console.log(maxValue);
      return "Zadane číslo je mimo rozsahu medzi minimálnou a maximálnou hodnotou.";
    }

    let range = maxValue - minValue;
    let relativeValue = inputNumber - minValue;

    let percentage = (relativeValue / range) * 100;

    return percentage * 0.6;
  }

  public get getMinAdaPrice() {
    return this.minAdaPrice['priceUSD'];
  }

  public get getMaxAdaPrice() {
    return this.maxAdaPrice['priceUSD'];
  }

  public get getMinTVL() {
    return this.minTVL['tvlUSD'];
  }

  public get getMaxTVL() {
    return this.maxTVL['tvlUSD'];
  }

  public get getMinTVLada() {
    return this.minTVLada['tvlADA'];
  }

  public get getMaxTVLada() {
    return this.maxTVLada['tvlADA'];
  }

  public get getHistoricalPriceData() {
    return historicalData;
  }

  public prepareTimelineSegments(priceData: any) {

    console.log('---------------------------')
    console.log('-- PREPARE TIME SEGMENTS --')
    console.log('---------------------------')

    let timelineStart = priceData[0];
    let timelineEnd = priceData[_.size(priceData) - 1];

    console.log(timelineStart['dateUnix']);
    console.log(timelineEnd['dateUnix']);
    ////////////////////////////////////

    const pastDate = moment.unix(timelineStart['dateUnix']);
    const today = moment.unix(timelineEnd['dateUnix']);
    let yearsAndMonths = [];

    console.log('start unix: '+ pastDate);
    console.log('end unix: '+ today);

    for (let y = pastDate.year(); y <= today.year(); y++) {

      console.log('%c'+ y, 'font-size: 18px;');

      let yearObj: any = {
        "yearName": y,
        "months": []
      };

      let startMonth: any = y === pastDate.year() ? pastDate.month() : 0;
      let endMonth: any = y === today.year() ? today.month() : 11;

      for (let m = startMonth; m <= endMonth; m++) {
        let monthName = moment().month(m).format('MMMM');
        let monthObj: any = {
          "monthName": monthName,
          "days": []
        };

        let startDate: any = m === startMonth && y === pastDate.year() ? pastDate.date() : 1;
        let endDate: any = m === endMonth && y === today.year() ? today.date() : moment([y, m]).daysInMonth();

        //console.log('start date: '+ startDate);
        //console.log('end date: '+ endDate);

        for (let d = startDate; d <= endDate; d++) {
          let dayStart: any = moment([y, m, d]).startOf('day').unix();
          let dayEnd: any = moment([y, m, d]).endOf('day').unix();

          //console.log('start day: '+ startDate);
          //console.log('end day: '+ dayEnd);

          // Find matching price data
          let priceDatum: any = priceData.find((data: any) => data.dateUnix >= dayStart && data.dateUnix <= dayEnd);

          if(!priceDatum) {
            //console.log('');
            //console.log('SHIT');
            //console.log(dayStart);
            //console.log(dayEnd);
            //console.log(priceDatum);
          }

          let dayObj: any = {
            "dayName": d,
            "dayStart": dayStart,
            "dayEnd": dayEnd,
            "markersData": priceDatum // This can be undefined if there is no matching price data
          };
          monthObj["days"].push(dayObj);
        }

        yearObj["months"].push(monthObj);
      }

      yearsAndMonths.push(yearObj);
    }

    //console.log(yearsAndMonths);
    return yearsAndMonths;



    /*
    for (let y = pastDate.year(); y <= today.year(); y++) {
      let yearObj: any = {
        "yearName": y,
        "months": []
      };

      let startMonth: any = y === pastDate.year() ? pastDate.month() : 0;
      let endMonth: any = y === today.year() ? today.month() : 11;

      for (let m = startMonth; m <= endMonth; m++) {
        let monthName = moment().month(m).format('MMMM');
        let monthObj: any = {
          "monthName": monthName,
          "days": []
        };

        let startDate: any = m === startMonth && y === pastDate.year() ? pastDate.date() : 1;
        let endDate: any = m === endMonth && y === today.year() ? today.date() : moment([y, m]).daysInMonth();

        for (let d = startDate; d <= endDate; d++) {
          let dayStart: any = moment([y, m, d]).startOf('day').unix();
          let dayEnd: any = moment([y, m, d]).endOf('day').unix();

          // Find matching price data
          let priceDatum: any = priceData.find((data: any) => data.dateUnix >= dayStart && data.dateUnix <= dayEnd);

          if(!priceDatum) {
            //console.log('');
            //console.log('SHIT');
            //console.log(dayStart);
            //console.log(dayEnd);
            //console.log(priceDatum);
          }

          let dayObj: any = {
            "dayName": d,
            "dayStart": dayStart,
            "dayEnd": dayEnd,
            "priceData": priceDatum // This can be undefined if there is no matching price data
          };
          monthObj["days"].push(dayObj);
        }

        yearObj["months"].push(monthObj);
      }

      yearsAndMonths.push(yearObj);
    }

    console.log(yearsAndMonths);
    return yearsAndMonths;
     */

  }
}
