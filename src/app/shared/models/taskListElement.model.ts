import { taskModel } from './taskModel';

export class taskListElement {
    name: string;
    tasks: Array<taskModel>;
    constructor(name: string, tasks: Array<taskModel>){
        this.name = name;
        this.tasks = tasks;
    }
}