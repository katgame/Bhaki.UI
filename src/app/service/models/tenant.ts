import { Service } from "./service";

export class Tenant {

    constructor() {
        this.active = null;
        this.environmentTypeId = null;
        this.description = null;
        this.id = null;
        this.hostSystemId = null;
        this.name = null;

    }
    active: boolean;
    environmentTypeId: string;
    description: string;
    id : string;
    hostSystemId : string;
    name : string;
}
