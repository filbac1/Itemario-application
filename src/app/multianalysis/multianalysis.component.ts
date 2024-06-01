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
  date: Date;
}

@Component({
  selector: 'app-multianalysis',
  templateUrl: './multianalysis.component.html',
  styleUrls: ['./multianalysis.component.css']
})
export class MultianalysisComponent implements OnInit {
  chart: any;
  products: Product[] = [];
  private aggregatedData: { [productName: string]: { [date: string]: number } } = {};

  ngOnInit() {
    this.products = history.state.products || [];
    this.formatData();
    this.aggregateProducts();
    const labels = this.createLabels();
    const datasets = this.createDatasets(labels);
    this.initializeChart(labels, datasets);
  }

  private formatData(): void {
    this.products.forEach(product => {
      product.date = new Date(product.date);
    });
    this.products.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private aggregateProducts(): void {
    this.products.forEach(product => {
      if (!this.aggregatedData[product.name]) {
        this.aggregatedData[product.name] = {};
      }
      const dateKey = this.formatDate(product.date);
      this.aggregatedData[product.name][dateKey] = product.price;
    });
  }

  private createDatasets(labels: string[]): Chart.ChartDataSets[] {
    return Object.keys(this.aggregatedData).map(productName => {
      const data = labels.map(label => this.aggregatedData[productName][label] || null);
      return {
        data: data,
        borderColor: this.getRandomColor(),
        fill: false,
        label: productName,
        tension: 0 
      };
    });
  }

  private createLabels(): string[] {
    return Array.from(new Set(this.products.map(p => this.formatDate(p.date)))).sort();
  }

  private formatDate(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  private getRandomColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
  }

  private initializeChart(labels: string[], datasets: Chart.ChartDataSets[]) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels.map(label => new Date(label)),
        datasets: datasets
      },
      options: {
        responsive: true,
        spanGaps: true,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM D, YYYY'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            },
            distribution: 'linear'
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
