# Content Record Library

## Description

The content record library is a library for skapp developers, allowing them to
record the interactions of their users with pieces of content within the skapp
that they are building. The main purpose of this tool is content discovery; if
all skapps were to make use of this library, the end result would be a scrapable
global record of all content and the popularity of that content and the skapp.

This information will eventually get displayed in a type of leaderboard that
ranks top pieces of content and top skapps.

## Interface

The library itself is a simple class that acts as a wrapper around the Content
Record DAC. This DAC, or Data Access Controller, is built and hosted by
Skynetlabs. The library will contain a hardcoded reference to its domain, thus
abstracting all of its complexities from the skapp developer.

The skapp developer is expected to call upon the content record when its user
perform the following two types of actions. This is when a user

- `creates` content
- `interacts` with a piece of content

The content record library exports the following types, allowing the skapp
developer to record new entries in the content record. Note that the content
info has a metadata field, the skapp developer can add whatever metadata he
would like to add here. In the case of an interaction with a piece of content,
the metadata could give more information about the type of interaction for
instance, e.g. "liked", "commented", etc...

```typescript
export interface IContentRecordDAC {
  recordNewContent(content: IContentInfo): Promise<IResult>;
  recordInteraction(content: IContentInfo): Promise<IResult>;
}

export interface IContentInfo {
  skylink: string;
  metadata: object; // should be valid JSON (capped in size ~=4kib)
}

export interface IResult {
  success: boolean;
  error?: string;
}
```

## Usage

Using the library is very straightforward. In this section we'll show an example
of how a skapp could use the content record library and record user interactions.

```typescript
import { SkynetClient } from "skynet-js";
import { ContentRecordDAC } from "skynet-content-record-library";

(async () => {
  // create client
  const client = new SkynetClient();

  // create content record
  const contentRecord = new ContentRecordDAC();

  // load mysky
  const mySky = await client.loadMySky("exampleskapp.hns");

  // load DACs
  await mySky.loadDacs(contentRecord);

  // check login
  const isLoggedIn = await mySky.checkLogin();
  if (!isLoggedIn) {
    // request login access
  }

  // DAC is now loaded and ready for use:
  //
  // - on content being created we can call:
  //
  // await contentRecord.recordNewContent({
  //     skylink,
  //     metadata: {"foo": "bar"}
  // });
  //
  // - on content being interacted with we can call:
  //
  // await contentRecord.recordInteraction({
  //     skylink,
  //     metadata: {"action": "liked"}
  // });
})();
```
