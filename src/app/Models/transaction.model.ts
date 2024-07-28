export class Transaction {

    Id: string =""
    UserId: string=""
    Amount:number =0
    Date: Date | undefined
    Description: string = ""
    Category: Category | Category = new Category
    PaymentMethod: string =""
    Source: string=""
    Type: string=""

}

export class Category{
    Id:number =0
    Name:string=""
  }
