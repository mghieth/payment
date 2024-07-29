export class Transaction {

    Id: string =""
    UserId: string=""
    Amount:number =0
    Date: Date | undefined
    Description: string = ""
    Category: string = ""
    PaymentMethod: string =""
    Source: string=""
    Type: string=""

}

export class Category{
    
    Id: string =""
    UserId: string=""
    Name:string=""
  }
