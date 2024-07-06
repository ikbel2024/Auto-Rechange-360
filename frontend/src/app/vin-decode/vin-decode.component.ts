import { Component, OnInit } from '@angular/core';
import { VinDecodeService } from '../vin-decode.service';


@Component({
  selector: 'app-vin-decode',
  templateUrl: './vin-decode.component.html',
  styleUrls: ['./vin-decode.component.css']
})
export class VinDecodeComponent implements OnInit {
  vin!: string;
  modelYear!: string;
  decodedData: any[] = []; // Assuming this is where you store the API response

  // Example extracted properties
  make: string = '';
  modelYearResult: string = '';
  manufacturerName: string = '';
  vehicleType: string = '';
  errorMessage!: string;

  constructor(private vinDecodeService: VinDecodeService) { }

  ngOnInit(): void {
    // Example usage after receiving data from API
    this.decodeVin();
  }

  decodeVin(): void {
    this.vinDecodeService.decodeVin(this.vin, this.modelYear)
      .subscribe(
        (data: any[]) => {
          this.decodedData = data;

          // Example extraction of specific properties
          this.make = this.getValueByVariable('Make');
          this.modelYearResult = this.getValueByVariable('Model Year');
          this.manufacturerName = this.getValueByVariable('Manufacturer Name');
          this.vehicleType = this.getValueByVariable('Vehicle Type');
        },
        (error) => {
          console.error('Error decoding VIN:', error);
          this.errorMessage = 'Failed to decode VIN';
        }
      );
  }

  getValueByVariable(variable: string): string {
    const foundVariable = this.decodedData.find(item => item.Variable === variable);
    return foundVariable ? foundVariable.Value : '';
  }

  reset(): void {
    this.vin = '';
    this.modelYear = '';
    this.decodedData = [];
    this.make = '';
    this.modelYearResult = '';
    this.manufacturerName = '';
    this.vehicleType = '';
    this.errorMessage = '';
  }
}
