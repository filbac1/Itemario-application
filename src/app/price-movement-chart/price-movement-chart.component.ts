import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
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
  selector: 'app-price-movement-chart',
  templateUrl: './price-movement-chart.component.html',
  styleUrls: ['./price-movement-chart.component.css']
})
export class PriceMovementChartComponent implements OnInit {
  chart: any;

  ngOnInit() {
    const products: Product[] = history.state.products;
    const selectedProduct = history.state.selectedProduct;

    // Filter products by selected product name
    const filteredProducts = products.filter(product => product.name === selectedProduct);

    // Sort products by date
    filteredProducts.sort((a, b) => dayjs(a.date).isBefore(b.date) ? -1 : 1);

    // Get unique stores
    const stores = [...new Set(filteredProducts.map(product => product.store))];

    // Prepare data for each store
    const datasets: ChartDataSets[] = stores.map(store => {
      const storeProducts = filteredProducts.filter(product => product.store === store);
      return {
        label: store,
        data: storeProducts.map(product => ({ x: dayjs.utc(product.date).toDate(), y: product.price })),
        borderColor: this.getRandomColor(),
        fill: false,
        lineTension: 0, // Ensure straight lines
        borderWidth: 2, // Increase the border width for sharper lines
        borderCapStyle: 'butt' as CanvasLineCap, // Sharp line caps
        borderJoinStyle: 'miter' as CanvasLineJoin // Sharp line joins
      };
    });

    // Render the chart
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        devicePixelRatio: 1, // Set device pixel ratio for sharp lines
        elements: {
          line: {
            tension: 0 // Disable bezier curves for sharp lines
          },
          point: {
            radius: 2 // Smaller points for sharper appearance
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10 // Limit the number of x-axis ticks for better clarity
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
