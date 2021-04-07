import { IContentCreation, IContentInteraction } from "./types";
import { PermCategory, Permission, PermType } from "skynet-mysky-utils";
import { DacLibrary } from 'skynet-js';

const DAC_DOMAIN = "vg1bhl7fpjrrg40hlnst9786af862nvcrvl2c0ujumsh9uis7j3g4q8";

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

  public async recordNewContent(data: IContentCreation): Promise<string> {
    return await this.connector?.connection.remoteHandle().call("recordNewContent", data);
  }

  public async recordInteraction(data: IContentInteraction): Promise<string> {
    return await this.connector?.connection.remoteHandle().call("recordInteraction", data);
  }
}
