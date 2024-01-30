import ManagerRepositoryInterface from "src/application/repository/ManagerRepositoryInterface";

export default class UsecaseLoginManager {
  constructor(readonly repo: ManagerRepositoryInterface) {}
  async execute(props: input): Promise<output> {
    await this.repo.logout(props.token)
  }
}

export type input = {
    token: string
};

export type output = void