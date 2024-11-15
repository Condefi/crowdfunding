import { createKintoSDK } from "kinto-web-sdk";

const KINTO_APP_ADDRESS = "0x14A1EC9b43c270a61cDD89B6CbdD985935D897fE";

export const kintoSDK = createKintoSDK(KINTO_APP_ADDRESS);
