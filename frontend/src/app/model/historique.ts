export interface Historique {
    _id?: string;
    date_entered: Date;
    release_date: Date;
    maintenance_description: string;
    matricule: string;
    maintenance_days?: number;
    alert?: string;
  }
  