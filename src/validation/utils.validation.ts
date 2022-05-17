// common functions to check things

// chk: is a number and not a string or smth else
// chk: is an integer
// chk: is between supported postgres range 1 and 2147483647
export function isValidPostgresNumber(param: any): boolean {
    let retValue: boolean = false
    if ((!isNaN(Number(param)) && Number.isInteger(parseInt(param)) && (parseInt(param) >= 1 && parseInt(param) < 2147483647))) {
        retValue = true
    }
    return retValue
}
