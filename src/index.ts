import { IContentCreation, IContentInteraction } from "./types";
import { PermCategory, Permission, PermType } from "skynet-mysky-utils";
import { DacLibrary } from 'skynet-js';

// DAC_DOMAIN_NOOP points to a DAC that essentially only performs the handshake
// and exposes the API methods, but doesn't actually do anything aside from
// returning success responses.
const DAC_DOMAIN_NOOP = "vg1fcigo04n0nh1vj0s4tavso6anv8bqjfk9bs16s094gcjqm5dre48"

// TODO: replace with live DAC domain
const DAC_DOMAIN = "graio.hns";

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
