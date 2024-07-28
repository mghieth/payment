export class Budget {

    Id: string =""
    UserId: string=""
    TotalBudget:number | undefined
    Month: Date | undefined
    AllocatedAmounts: {[key:string]:any;} = {}
}
