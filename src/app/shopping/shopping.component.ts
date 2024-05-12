import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
  products: any[] = [];
  filteredProducts: any[] = [];

  productNames: string[] = [
    "Apples (1 kg)",
    "Bananas (1 kg)",
    "Beef (1 kg)",
    "Bottled water (1 L)",
    "Bread (1 kg)",
    "Canned beans (1 kg)",
    "Canned fruits (1 kg)",
    "Canned soups (1 kg)",
    "Canned vegetables (1 kg)",
    "Carrots (1 kg)",
    "Cereal (1 kg)",
    "Cheese (1 kg)",
    "Chicken (1 kg)",
    "Chips (1 kg)",
    "Chocolate (1 kg)",
    "Coffee (1 kg)",
    "Cookies (1 kg)",
    "Cooking oil (1 L)",
    "Crackers (1 kg)",
    "Eggs (1 kg)",
    "Fish (1 kg)",
    "Flour (1 kg)",
    "Frozen fruits (1 kg)",
    "Frozen meals (1 kg)",
    "Frozen vegetables (1 kg)",
    "Ice cream (1 kg)",
    "Juice (1 L)",
    "Ketchup (1 L)",
    "Lettuce (1 kg)",
    "Mayonnaise (1 kg)",
    "Milk (1 L)",
    "Mustard (1 kg)",
    "Nuts (1 kg)",
    "Onions (1 kg)",
    "Oranges (1 kg)",
    "Pasta (1 kg)",
    "Pasta sauce (1 kg)",
    "Pepper (1 kg)",
    "Pet food (1 kg)",
    "Pork (1 kg)",
    "Potatoes (1 kg)",
    "Rice (1 kg)",
    "Salad dressing (1 kg)",
    "Salt (1 kg)",
    "Snack bars (1 kg)",
    "Soda (1 L)",
    "Sugar (1 kg)",
    "Tea (1 kg)",
    "Tomatoes (1 kg)",
    "Vinegar (1 L)"
  ];

  stores: string[] = [
    "Metro",
    "Plodine",
    "Interspar",
    "Decentia",
    "Studenac",
    "Konzum",
    "Kaufland",
    "Lidl"
  ];

  selectedProducts: string[] = [];
  selectedDate: string = '';  // Default value as empty string
  bestStore: string = '';     // Default value as empty string
  bestPrice: number = 0; 

  constructor(private http: HttpClient, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  findBestStore(): void {
    if (this.selectedProducts.length === 0 || !this.selectedDate) {
      alert('Please select a date and at least one product.');
      return;
    }
  
    // Convert selectedDate to MySQL format (YYYY-MM-DD)
    const selectedDate = new Date(this.selectedDate);
  
    // Filter products based on selected products
    const filteredProducts = this.products.filter(product => this.selectedProducts.includes(product.name));
  
    // Initialize an object to store the best store for each selected product
    const bestStores: { [productName: string]: { store: string, price: number } } = {};
  
    // Find the best store for each selected product for the selected date and subsequent dates
    let currentDate = new Date(selectedDate);
    while (Object.keys(bestStores).length < this.selectedProducts.length && currentDate <= new Date()) {
      const productsForDate = filteredProducts.filter(product => new Date(product.date) >= currentDate);
      productsForDate.forEach(product => {
        if (!bestStores[product.name] || product.price < bestStores[product.name].price) {
          bestStores[product.name] = { store: product.store, price: product.price };
        }
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    // Display the best store for each selected product
    if (Object.keys(bestStores).length === 0) {
      alert('No best stores found for the selected date and subsequent dates.');
    } else {
      // Update best store and price for display
      this.bestStore = Object.keys(bestStores).map(productName => bestStores[productName].store).join(', ');
      this.bestPrice = Object.keys(bestStores).reduce((totalPrice, productName) => totalPrice + bestStores[productName].price, 0);
    }
  }
  
}
