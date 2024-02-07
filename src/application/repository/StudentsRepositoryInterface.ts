
export default interface StudentRepositoryInterface {
    GetOne(registration: string): Promise<any>;
    GetAll(organizationId: string): Promise<Array<any>>
}