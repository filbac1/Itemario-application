import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'chartjs-adapter-dayjs';
import { Router } from '@angular/router';

dayjs.extend(utc);

interface Product {
  name: string;
  price: number;
  store: string;
  date: string;
}

@Component({
  selector: 'app-price-movement-chart',
  templateUrl: './price-movement-chart.component.html',
  styleUrls: ['./price-movement-chart.component.css']
})
export class PriceMovementChartComponent implements OnInit {
  chart: any;
  products: Product[] = [];
  selectedProduct: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (history.state && history.state.products && history.state.selectedProduct) {
      this.products = history.state.products;
      this.selectedProduct = history.state.selectedProduct;
    } else {
      console.error('No product data available');
      this.router.navigate(['/']); // Navigate back to home or another suitable route if data is missing
      return;
    }

    // Filter products by selected product name
    const filteredProducts = this.products.filter(product => product.name === this.selectedProduct);

    // Sort products by date
    filteredProducts.sort((a, b) => dayjs(a.date).isBefore(b.date) ? -1 : 1);

    // Get unique stores
    const stores = [...new Set(filteredProducts.map(product => product.store))];

    // Prepare data for each store
    const datasets = stores.map(store => {
      const storeProducts = filteredProducts.filter(product => product.store === store);
      return {
        label: store,
        data: storeProducts.map(product => ({ x: dayjs.utc(product.date).toDate(), y: product.price })),
        borderColor: this.getRandomColor(),
        fill: false
      };
    });

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: datasets
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

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
