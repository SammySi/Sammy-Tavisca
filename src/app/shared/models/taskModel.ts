export class taskModel {
    name: string;
    description: string;
    date: string;
    constructor(name: string, desc: string, date: string){
        this.name = name;
        this.description = desc;
        this.date = date;
    }
}