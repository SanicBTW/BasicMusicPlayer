//remember how file system was in the same index (didnt know how to make it in a sepparate file)
export async function readFile(file:string, turnIntoArray:boolean = false):Promise<string | Array<string>> {
    var allText:(string | Array<string>) = "";
    var raw:Response = await fetch(file);
    try{
        if(turnIntoArray){
            allText = (await raw.text()).trim().split('\n');
        } else {
            allText = (await raw.text());
        }
    } catch (exception){
        alert(exception);
    }

    return allText;
}

export async function readFileJSON(file:string):Promise<string> {
    var allText:string = "";
    var raw:Response = await fetch(file);
    try{
        allText = JSON.parse(await raw.text())
    } catch (exp){
        alert(exp)
    }
    return allText;
}