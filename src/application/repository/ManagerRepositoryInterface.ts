import manager from "src/domain/Manager";

export default interface ManagerRepositoryInterface {
    login(manager: manager): Promise<any>;
    logout(token: string): Promise<void>;
}