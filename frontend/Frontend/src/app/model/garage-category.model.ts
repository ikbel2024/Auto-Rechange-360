export interface GarageCategory {
    _id: string; // Assurez-vous que cette propriété est définie
    name: string;
    specialization: string;
    servicesOffered: string[];
    size: string;
    equipment: string[];
    certifications: string[];
    pricingPolicy: string;
    customerRelations: string;
    location: {
      type: string;
      coordinates: number[];
    };
    address: string;
    city: string;
    postalCode: string;
  }
  