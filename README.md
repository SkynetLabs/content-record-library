# Content Record Library

## NOTE

Currently needs:
```
npm link skynet-mysky-utils
npm link skynet-js // dac branch
```

## Introduction

The Content Record library is a small convenience class that extends from the
`DacLibrary` and exposes all of the methods defined in the Content Record API.
This library can be imported by skapp developers and provides an easy way to get
started and use the DAC.

The library will take care of setting up the iframe and initiating the handshake
to establish a connection with the DAC.

## Usage

In this section we'll show an example of how a skapp could use the content
record DAC. It shows how it would be loaded and interacted with from the context
of a skapp.

```typescript
    import { SkynetClient } from 'skynet-js';
    import { ContentRecordDAC } from 'content-record-library';

    const DATA_DOMAIN = "mynewskapp.hns"

    class ExampleSkapp {
        private contentRecord: ContentRecordDAC;

        function init() {
            // create client
            const client = new SkynetClient();

            // load mysky
            const mySky = await client.loadMySky(DATA_DOMAIN);

            // create content record DAC
            this.contentRecord = new ContentRecordDAC()

            // load DAC
            mySky.loadDac(this.contentRecord);

            // check whether the user is logged in
            try {
                const loggedIn = mySky.checkLogin();
                if (!loggedIn) {
                    // handle
                }
            } catch(error) {
                // handle
            }
        }

        // example create function
        function createContent(skylink: string) {
            const result = await this.contentRecord.recordNewContent({
                skylink,
                metadata: {"foo": "bar"}
            });
            // possibly check result
        }

        // example interact function
        function interactWithContent(skylink: string) {
            const result = await this.contentRecord.recordInteraction({
                skylink,
                metadata: {"action": "liked"}
            });
            // possibly check result
        }
    }

```
