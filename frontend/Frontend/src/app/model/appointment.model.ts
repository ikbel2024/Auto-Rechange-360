export interface Appointment {
    clientName: string;
    clientPhone: string;
    appointmentDate: Date;
    serviceRequired: string;
    garage: string; // ou mongoose.Types.ObjectId si vous préférez typiquement des identifiants d'objet
    timeSlot: string;
  }