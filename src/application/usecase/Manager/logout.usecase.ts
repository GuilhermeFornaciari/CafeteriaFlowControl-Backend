import Manager from "../../../domain/Manager";
import LogoutRepositoryInterface from "../../repository/LogoutRepositoryInterface";

export default class UsecaseLogoutManager {
  constructor(readonly repo: LogoutRepositoryInterface) {}
  async execute(token: input): Promise<output> {
    if(Manager.validToken(token))
    await this.repo.logout(token)
  }
}

export type input = string

export type output = void