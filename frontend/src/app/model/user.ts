export interface User {
    id?: string;
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    num_tel: string;
    mot_de_passe: string;
    role: string;
    matricule_fiscale?: string;
    isBanned?: boolean;
    isValidated?: boolean;
    loginCount?: number;
  }
  