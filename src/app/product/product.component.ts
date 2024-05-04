import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  nameFilter: string = '';
  storeFilter: string = '';
  minPrice: number = 0.99;
  maxPrice: number = 20.99;
  startDate: Date | undefined;
  endDate: Date | undefined;
  
  // Define product names and stores
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

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const productPrice = parseFloat(product.price);
      let priceMin = 0, priceMax = Infinity;
      if (this.minPrice && this.maxPrice) {
        priceMin = this.minPrice;
        priceMax = this.maxPrice;
      }
      return (
        (product.name.toLowerCase().includes(this.nameFilter.toLowerCase()) || this.nameFilter === '') &&
        (product.store.toLowerCase().includes(this.storeFilter.toLowerCase()) || this.storeFilter === '') &&
        (productPrice >= priceMin && productPrice <= priceMax) &&
        (!this.startDate || new Date(product.date) >= new Date(this.startDate)) &&
        (!this.endDate || new Date(product.date) <= new Date(this.endDate))
      );
    });
  }

  analyzeProducts() {
    // Pass the filtered products data to the analysis component
    this.router.navigate(['/analysis'], { state: { products: this.filteredProducts } });
  }
  
}
