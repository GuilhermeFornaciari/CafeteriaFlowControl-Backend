import ManagerRepositoryInterface from "src/application/repository/ManagerRepositoryInterface";
import Manager from "src/domain/Manager";

export default class UsecaseLoginManager {
  constructor(readonly repo: ManagerRepositoryInterface) {}
  async execute(props: input): Promise<output> {
    const manager = Manager.create(props);
    const token = await this.repo.login(manager)
    return {
        token: token
    };
  }
}

export type input = {
    user: string,
    password: string,
};

export type output = {
    token: string,
};