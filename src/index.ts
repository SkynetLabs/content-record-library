import { DacLibrary } from 'skynet-js';
import { PermCategory, Permission, PermType } from "skynet-mysky-utils";

import { IContentCreation, IContentInteraction, IContentRecordDAC, IDACResponse } from "./types";

const DAC_DOMAIN = "crqa.hns";

export class ContentRecordDAC extends DacLibrary implements IContentRecordDAC {
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

  public async recordNewContent(...data: IContentCreation[]): Promise<IDACResponse> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }

    return await this.connector.connection.remoteHandle().call("recordNewContent", ...data);
  }

  public async recordInteraction(...data: IContentInteraction[]): Promise<IDACResponse> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }

    return await this.connector.connection.remoteHandle().call("recordInteraction", ...data);
  }
}
