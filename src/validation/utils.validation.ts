// common functions to check things
export function isValidPostgresNumber(param: any): boolean {
    let retValue: boolean = true
    if (!(isNaN(Number(param)) || !Number.isInteger(parseInt(param)) || ! (parseInt(param) > 1 && parseInt(param) < 2147483647))) {
        retValue = false
    }
    return retValue
}
