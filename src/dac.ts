import { IContentCreation, IContentInteraction } from "./types";
import { Permission } from "skynet-mysky-utils";
import { DacLibrary } from 'skynet-js'

export class ContentRecordDAC extends DacLibrary {
  public constructor(dacUrl: string) {
    super(dacUrl);
  }
  
  public getPermissions(): Permission[] {
    return []
  }

  public async recordCreate(data: IContentCreation): Promise<string> {
    return await this.connector?.connection.remoteHandle().call("recordCreate", data)
  }

  public async recordInteraction(data: IContentInteraction): Promise<string> {
    return await this.connector?.connection.remoteHandle().call("recordInteraction", data)
  }
}
