import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/categorie.service';
import { Stock } from 'src/app/model/Stock';

interface CategoryQuantity {
  name: string;
  totalQuantity: number;
}

@Component({
  selector: 'app-count-categorie',
  templateUrl: './count-categorie.component.html',
  styleUrls: ['./count-categorie.component.css']
})
export class CountCategorieComponent implements OnInit {
  countResult: number | undefined;
  categoryQuantities: CategoryQuantity[] = [];
  groupedData: any;
  subscriptions: any;
  router: any;

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    // Optional initialization logic
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: { unsubscribe: () => any; }) => sub.unsubscribe());
}

fetchData(): void {
    this.subscriptions.push(
        this.categorieService.countTotalStocks().subscribe(
            (data: any) => {
                this.countResult = data.count;
            },
            (error) => {
                console.error('Error counting stocks:', error);
                // Handle error as needed
            }
        )
    );

    this.subscriptions.push(
        this.categorieService.calculateTotalStockQuantity().subscribe(
            (data: any) => {
                if (data && data.totalQuantity) {
                    this.categoryQuantities = [{
                        name: 'Total',
                        totalQuantity: data.totalQuantity
                    }];
                } else {
                    console.error('Invalid response for total quantity:', data);
                }
            },
            (error) => {
                console.error('Error calculating total quantity:', error);
                // Handle error as needed
            }
        )
    );
}

  // Function to fetch total count of stocks
  onCountByCategory(): void {
    this.categorieService.countTotalStocks()
      .subscribe(
        (data) => {
          this.countResult = data.count;
          this.fetchCategoryQuantities(); // Fetch category quantities after counting stocks
        },
        (error) => {
          console.error('Error counting stocks:', error);
          // Handle error as needed
        }
      );
  }

  calculateTotalQuantity(): void {
    this.categorieService.calculateTotalStockQuantity()
      .subscribe(
        (data) => {
          if (data && data.stocks && data.stocks.length > 0) {
            this.categoryQuantities = data.stocks.map((stock: any) => ({
              name: stock.name,
              totalQuantity: stock.quantity
            }));
          } else {
            console.error('No data received from API or invalid data structure:', data);
            // Handle empty or invalid data as needed
          }
        },
        (error) => {
          console.error('Error calculating total quantity:', error);
          // Handle error as needed, e.g., show error message to the user
        }
      );
  }


  // Function to fetch and calculate category quantities
  fetchCategoryQuantities(): void {
    this.categorieService.getCategories()
      .subscribe(
        (categories: Stock[]) => {
          const categoryQuantities: { [key: string]: number } = {};
          categories.forEach(stock => {
            const categoryName = stock.nom; // Adjust property names based on your Stock model
            if (categoryQuantities[categoryName]) {
              categoryQuantities[categoryName] += stock.quantité; // Adjust property names based on your Stock model
            } else {
              categoryQuantities[categoryName] = stock.quantité; // Adjust property names based on your Stock model
            }
          });

          this.categoryQuantities = Object.keys(categoryQuantities).map(name => ({
            name,
            totalQuantity: categoryQuantities[name]
          }));
        },
        (error) => {
          console.error('Error fetching category quantities:', error);
          // Handle error as needed
        }
      );
  }

  // Placeholder function for navigation logic
  goBack(): void {
    this.router.navigate(['/administration']); // Navigate back to the administration dashboard
  }
}
