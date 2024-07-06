export interface User {
[x: string]: any;
_id: string;
nom: string;
prenom: string;
adresse: string;
email: string;
num_tel: string;
mot_de_passe: string;
role: string;
matricule_fiscale?: string;
googleId?: string;
isValidated?: boolean;
isBanned?: boolean;
loginCount?: number;
validationToken?: string;
validationTokenExpiry?: Date;
profilePhotoUrl?: string;
resetPasswordToken?: string; 
resetPasswordExpires?: Date;
  }
  