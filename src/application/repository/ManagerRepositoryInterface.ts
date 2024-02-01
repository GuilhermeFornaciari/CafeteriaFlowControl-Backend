export default interface ManagerRepositoryInterface {
    GetOne(name: string): Promise<any>;
    logout(token: string): Promise<void>;
}