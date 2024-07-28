export class Debt {
    Id: string = ""
    UserId: string = ""
    DebtType: string = ""
    PrincipalAmount: number | undefined
    InterestRate : number  | undefined
    RemainingAmount : number  | undefined
    DueDate: Date | undefined
}
