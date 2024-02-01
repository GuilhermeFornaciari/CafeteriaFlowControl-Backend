import ManagerRepositoryInterface from "src/application/repository/ManagerRepositoryInterface";
import Manager from "src/domain/Manager";

export default class UsecaseLoginManager {
  constructor(readonly repo: ManagerRepositoryInterface) {}
  async execute(props: input): Promise<output> {
    const manager = Manager.create(props)
    if(manager.validToken(props.token))
    await this.repo.logout(props.token)
  }
}

export type input = {
    token: string,
};

export type output = void