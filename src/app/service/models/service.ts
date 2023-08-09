export class Service {

    constructor() {
        this.active = null;
        this.databaseConnectionString = null;
        this.endpoint = null;
        this.id = null;
        this.name = null;
        this.tenantId = null;

    }
    active: boolean;
    databaseConnectionString: string;
    endpoint: string;
    id : string;
    name : string;
    tenantId: string;
}
