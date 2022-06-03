export async function readFile(file:string, turnIntoArray:boolean = false):Promise<any> { //lets just change it to any, kind of lazy to deal with type shit lol
    var allText:string = "";
    var raw:Response = await fetch(file);
    try{
        if(turnIntoArray){
            var theList:Array<string> = [];
            theList = (await raw.text()).trim().split('\n');
            return theList;
        } else {
            allText = (await raw.text());
        }
    } catch (exception){
        alert(exception);
    }

    return allText;
}

//not used anymore, ig
export async function readFileJSON(file:string):Promise<any> {
    var allText:any;
    var raw:Response = await fetch(file);
    try
    {
        allText = JSON.parse(await raw.text()) //??
    } 
    catch (exp)
    {
        alert(exp)
    }
    return allText;
}