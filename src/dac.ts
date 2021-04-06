import { IContentCreation, IContentInteraction } from "./types";
import { PermCategory, Permission, PermType } from "skynet-mysky-utils";
import { DacLibrary } from 'skynet-js';

const DAC_DOMAIN = "contentrecord.hns";

export class ContentRecordDAC extends DacLibrary {
  public constructor() {
    super(DAC_DOMAIN);
  }
  
  public getPermissions(): Permission[] {
    const perm = new Permission(DAC_DOMAIN, DAC_DOMAIN, PermCategory.Discoverable, PermType.Read);
    return [perm];
  }

  public async recordCreate(data: IContentCreation): Promise<string> {
    return await this.connector?.connection.remoteHandle().call("recordCreate", data);
  }

  public async recordInteraction(data: IContentInteraction): Promise<string> {
    return await this.connector?.connection.remoteHandle().call("recordInteraction", data);
  }
}
