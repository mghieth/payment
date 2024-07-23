export class Debt {
    Id: string = ""
    UserId: string = ""
    DebtType: string = ""
    PrincipalAmount: number = 0
    InterestRate : number = 0
    RemainingAmount : number = 0
    DueDate: Date | undefined
}
