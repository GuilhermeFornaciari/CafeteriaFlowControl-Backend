import ManagerRepositoryInterface from "src/application/repository/ManagerRepositoryInterface";
import Manager from "src/domain/Manager";
import nodeSchedule from 'node-schedule';

export default class UsecaseLoginManager {
  constructor(readonly repo: ManagerRepositoryInterface) {}
  async execute(props: input): Promise<output> {
    const manager = Manager.create(props);
    const getManager = await this.repo.GetOne(props.name);
    const token = await manager.generateToken(getManager.id);
    if (manager.validPassword(getManager.password)) {
        const objectReturn = {
            token: token,
            name: getManager.name,
            type: getManager.type,
            id: getManager.id,
            organizationId: getManager.organizationId,
        };
        nodeSchedule.scheduleJob("0 0 * * 7", () => this.repo.logout(token));
        return objectReturn;
    }}
}

export type input = {
    name: string,
    password: string,
};

export type output = {
    token: string,
    name: string,
    type: string,
    id: string,
    organizationId: string,
};