import { IContentCreation, IContentInteraction, IDACResponse } from "./types";
import { PermCategory, Permission, PermType } from "skynet-mysky-utils";
import { DacLibrary } from 'skynet-js';

// TODO: replace with live DAC domain
// const DAC_DOMAIN = "graio.hns";
const DAC_DOMAIN = "skynetbridge.hns";

export class ContentRecordDAC extends DacLibrary {
  public constructor() {
    super(DAC_DOMAIN);
  }
  
  public getPermissions(): Permission[] {
    return [
      new Permission(
        DAC_DOMAIN,
        DAC_DOMAIN,
        PermCategory.Discoverable,
        PermType.Read
      ),
      new Permission(
        DAC_DOMAIN,
        DAC_DOMAIN,
        PermCategory.Discoverable,
        PermType.Write
      )
    ];
  }

  public async recordNewContent(data: IContentCreation): Promise<IDACResponse> {
    return await this.connector?.connection.remoteHandle().call("recordNewContent", data);
  }

  public async recordInteraction(data: IContentInteraction): Promise<IDACResponse> {
    return await this.connector?.connection.remoteHandle().call("recordInteraction", data);
  }
}
