import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'chartjs-adapter-dayjs';

dayjs.extend(utc);

interface Product {
  name: string;
  price: number;
  store: string;
  date: string;
}

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  chart: any;
  mostExpensiveProduct: Product = { name: '', price: 0, store: '', date: '' };
  leastExpensiveProduct: Product = { name: '', price: 0, store: '', date: '' };

  ngOnInit() {
    let products: Product[] = history.state.products;
    products.sort((a, b) => dayjs(a.date).isBefore(b.date) ? -1 : 1);
    let labels = products.map((product: Product) => dayjs.utc(product.date).toDate());
    let data = products.map((product: Product) => product.price);

    this.mostExpensiveProduct = products.reduce((max, product) => max.price > product.price ? max : product);
    this.leastExpensiveProduct = products.reduce((min, product) => min.price < product.price ? min : product);

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: 'blue',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Price (€)'
            }
          }]
        }
      }
    });
  }
}
