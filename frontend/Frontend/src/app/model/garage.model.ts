export interface Garage
{
  _id: string; // Remarquez que _id est requis dans MongoDB
  name: string;
  address: string;
  city: string;
  postalCode: any; // PostalCode est défini comme String dans le backend
  phone: string;
  email: string;
  openingHours: string;
  servicesOffered: string[]; // servicesOffered est un tableau de strings
  employees: Employee[]; // employees est un tableau d'objets Employee
  vehiclesUnderRepair: Repair[]; // vehiclesUnderRepair est un tableau d'objets Repair
  rating: number;
  reviews: Review[]; // reviews est un tableau d'objets Review
  }

export interface Review {
  rating: number;
  comment: string;
  user: string; // Supposons que user est une chaîne représentant l'ID de l'utilisateur
  _id?: string; // Peut être optionnel selon votre besoin
  garage: string;
    }

  export interface Employee {

    name: string;
    position: string;
    phone: string;
    email: string;
    _id?: string; // Peut être optionnel selon votre besoin
  }

  export interface Repair{
    
    marke: string;
    model: string;
    year: number;
    owner: string;
    licensePlate: string;
    issues: string;
    _id?: string; // Peut être optionnel selon votre besoin
  }