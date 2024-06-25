import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerProductService } from '../../services/consumer-product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../model/product'; // Assurez-vous d'importer le modèle de produit si nécessaire

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  selectedProduct: any;
  productId: string = '';
  dataFile: File | null = null;
  fileName: any;
  brand_Id = '123';
  supplierId = '1234';

  constructor(
    private fb: FormBuilder,
    private productService: ConsumerProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: [undefined, Validators.required],
      reference: [undefined, Validators.required],
      dateAdded: [undefined, Validators.required],
      price: [undefined, Validators.required],
      description: [undefined, Validators.required],
      category: [undefined, Validators.required],
      stockQuantity: [undefined, Validators.required],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      console.log('Product ID:', this.productId); // Vérifiez que l'ID du produit est récupéré correctement

      this.loadProductDetails(this.productId);
    });
  }

  loadProductDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (product: any) => {
        console.log('Product details:', product); // Vérifiez les détails du produit récupérés
        this.initForm(product); // Initialisez le formulaire avec les détails du produit
      },
      (error: any) => {
        console.error('Error fetching product:', error); // Gérez les erreurs de récupération du produit
      }
    );
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


  initForm(product: any): void {
    this.selectedProduct = product;
    console.log('selectedProduct', this.selectedProduct)
    if (product) {
      this.productForm.patchValue({
        id: product.id,
        name: product.name,
        reference: product.reference,
        dateAdded: this.formatDate(product.dateAdded),
        price: product.price,
        description: product.description,
        category: product.category,
        stockQuantity: product.stockQuantity,

        // Mettez à jour d'autres champs selon les besoins
      });

      if (product.image && product.image.length > 0) {
        const documentNames = product.image.map((document: string) => this.getFileNameFromPath(document));
        this.fileName = documentNames.join(', ');
        console.log('Image file names:', documentNames); // Ajout du log pour les noms des fichiers d'image
      } else {
        this.fileName = '';
        console.log('No image files found.'); // Log si aucune image n'est trouvée
      }
    }
  }

  updateProduit() {
    if (this.productForm.valid) {
      const productId = this.selectedProduct._id; // Récupère l'id du produit sélectionné

      const updatedProduitData = {
        id: productId,
        name: this.productForm.value.name,
        reference: this.productForm.value.reference,
        dateAdded: this.productForm.value.dateAdded,
        price: this.productForm.value.price,
        brandid: this.brand_Id,
        supplierId: this.supplierId,
        description: this.productForm.value.description,
        category: this.productForm.value.category,
        stockQuantity: this.productForm.value.stockQuantity,
      };

      const formData = new FormData();
      Object.keys(updatedProduitData).forEach(key => {
        const value = updatedProduitData[key as keyof typeof updatedProduitData];
        if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      // Ajoute l'image mise à jour si elle existe
      if (this.dataFile) {
        formData.append('image', this.dataFile, this.dataFile.name);
      }

      // Appel du service pour mettre à jour le produit
      this.productService?.updateProduit(formData, productId)?.subscribe(
        (response: any) => {
          console.log('Service response:', response);
          // Traitez la réponse ou effectuez des actions supplémentaires si nécessaire
          this.router.navigate(['/administration']); // Navigate after successful submission
        },
        (error: any) => {
          console.error('Error updating product:', error);
          // Gérez les erreurs ici
        }
      );
    } else {
      console.log('Invalid form or missing edit product data.');
    }
  }



  selectFile(event: any) {
    if (event.target.files.length > 0) {
      this.dataFile = event.target.files[0];
    }
  }
  getFileNameFromPath(filePath: string) {
    return filePath.split('/').pop();
  }
  goBack() {
    this.router.navigate(['/administration']); // Naviguez vers le tableau de bord d'administration après la mise à jour
  }
}
