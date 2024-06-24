export interface Garage
{
    _id?: string,
    name: string,
    address: string,
    city: string,
    postalCode: number,
    phone: string,
    email: string,
    openingHours: string,
    servicesOffered?: Array<string>
    employees: Array<Employee>,
    vehiclesUnderRepair?: Array<Repair>, 
    __v?: number,
    rating: number,
    reviews?: Array<Review>,
  }

export interface Review {
        rating: number,
        comment: string,
        user: string,
        _id: string
    }

  export interface Employee {

            name:string,
            position: string,
            phone: string,
            email:  string,
            _id:  string
  }

  export interface Repair{
    
            model: string,
            year: number,
            owner: string,
            licensePlate: string,
            issues: string,
            _id: string
     
  }