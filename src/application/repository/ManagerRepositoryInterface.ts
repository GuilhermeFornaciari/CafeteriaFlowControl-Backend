import Manager from "../../domain/Manager";

    export default interface ManagerRepositoryInterface {
        GetOne(name: string): Promise<Manager>;
        logout?(token: string): Promise<void>;
    }