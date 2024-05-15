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
  bestStores: { [productName: string]: { store: string, price: number } } = {};
  total: number = 0;


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

  findBestStores(): void {
    if (this.selectedProducts.length === 0 || !this.selectedDate) {
      alert('Please select a date and at least one product.');
      return;
    }
  
    // Convert selectedDate to MySQL format (YYYY-MM-DD)
    const selectedDate = new Date(this.selectedDate);
  
    // Filter products based on selected products
    const filteredProducts = this.products.filter(product => this.selectedProducts.includes(product.name));
  
    // Initialize an object to store the best store for each selected product
    this.bestStores = {};
  
    // Find the best store for each selected product for the selected date and subsequent dates
    let currentDate = new Date(selectedDate);
    while (Object.keys(this.bestStores).length < this.selectedProducts.length && currentDate <= new Date()) {
      const productsForDate = filteredProducts.filter(product => new Date(product.date) >= currentDate);
      productsForDate.forEach(product => {
        if (!this.bestStores[product.name] || product.price < this.bestStores[product.name].price) {
          this.bestStores[product.name] = { store: product.store, price: product.price };
        }
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    
  }
  
  // Assuming you have bestStores populated with the data
  // Assuming you have bestStores populated with the data

  generateBestStoresSummary(): string {
    let summary = 'You can do your shopping in following stores on this date (' + this.selectedDate + '):\n\n';

    // Iterate over bestStores object
    Object.keys(this.bestStores).forEach(product => {
      const store = this.bestStores[product].store;
      const price = this.bestStores[product].price.toFixed(2);
      
      summary += `**${store}:** ${product} (${price}€)\n\n`;
    });

    summary += 'Happy shopping!';
    
    return summary;
  }

  generateBestStoresMessages(): string[] {
    let messages: string[] = [];
  
    // Create a map to group products by store
    let storeProductsMap: { [store: string]: string[] } = {};
    let totalPrice: number = 0;
  
    // Iterate over bestStores object
    Object.keys(this.bestStores).forEach(product => {
      const store = this.bestStores[product].store;
      const price = this.bestStores[product].price.toFixed(2);
  
      // Add the price to the total
      totalPrice += parseFloat(price);
  
      // Check if the store already exists in the map, if not, initialize an empty array
      if (!storeProductsMap[store]) {
        storeProductsMap[store] = [];
      }
      
      // Push the product and price to the respective store's array
      storeProductsMap[store].push(`${product} (${price}€)`);
    });
  
    // Iterate over the storeProductsMap to construct the messages
    Object.keys(storeProductsMap).forEach(store => {
      const products = storeProductsMap[store].join(', ');
      messages.push(`<span class="store-name">${store}</span>: ${products}`);
    });
  
    // Add the total price as the last row
    messages.push(`Total Price: ${totalPrice.toFixed(2)}€`);
  
    return messages;
  }
  
  
  
  


  
}
