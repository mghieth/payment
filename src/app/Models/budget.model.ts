export class Budget {

    Id: string =""
    UserId: string=""
    TotalBudget:number=0
    Month: Date | undefined
    AllocatedAmounts: {[key:string]:any;} = {}
}
