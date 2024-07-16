export const TAGS = {
  keys: {
    ans110: {
      title: "Title",
      description: "Description",
      topic: "Topic:*",
      type: "Type",
      implements: "Implements",
      license: "License",
    },
    appName: "App-Name",
    avatar: "Avatar",
    banner: "Banner",
    channelTitle: "Channel-Title",
    collectionId: "Collection-Id",
    collectionName: "Collection-Name",
    contentLength: "Content-Length",
    contentType: "Content-Type",
    contractManifest: "Contract-Manifest",
    contractSrc: "Contract-Src",
    creator: "Creator",
    currency: "Currency",
    dataProtocol: "Data-Protocol",
    dataSource: "Data-Source",
    dateCreated: "Date-Created",
    handle: "Handle",
    initState: "Init-State",
    initialOwner: "Initial-Owner",
    license: "License",
    name: "Name",
    profileCreator: "Profile-Creator",
    profileIndex: "Profile-Index",
    protocolName: "Protocol-Name",
    renderWith: "Render-With",
    smartweaveAppName: "App-Name",
    smartweaveAppVersion: "App-Version",
    target: "Target",
    thumbnail: "Thumbnail",
    topic: (topic: string) => `topic:${topic}`,
    udl: {
      accessFee: "Access-Fee",
      commercialUse: "Commercial-Use",
      dataModelTraining: "Data-Model-Training",
      derivations: "Derivations",
      paymentAddress: "Payment-Address",
      paymentMode: "Payment-Mode",
    },
  },
  values: {
    ansVersion: "ANS-110",
    collection: "AO-Collection",
    comment: "comment",
    document: "Document",
    followDataProtocol: "Follow",
    license: "dE0rmDfl9_OWjkDznNEXHaSO_JohJkRolvMzaCroUdw",
    licenseCurrency: "xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10",
    profileVersions: {
      "1": "Account-0.3",
    },
    ticker: "ATOMIC ASSET",
    title: (title: string) => `${title}`,
  },
};

export enum PROCCESSID {
  profile = "iJ8bCUv-RGfWYF-fiGS_A_4d7fUtSwy9su9IcS48n2c",
  assetSrc = "2ZDuM2VUCN8WHoAKOOjiH4_7Apq0ZHKnTWdLppxCdGY",
  assetxDb = "aIUubYMhqljSmoPxydPHtRQ7A2_EiuaQUHMUz9bXWnE",
}

export const CONTENT_TYPES = {
  json: "application/json",
  mp4: "video/mp4",
  textPlain: "text/plain",
};
export const DEFAULT_BANNER = "eXCtpVbcd_jZ0dmU2PZ8focaKxBGECBQ8wMib7sIVPo";
export const DEFAULT_THUMBNAIL = "lJovHqM9hwNjHV5JoY9NGWtt0WD-5D4gOqNL2VWW5jk";

export const AO_MODULE = "Pq2Zftrqut0hdisH_MC2pDOT6S4eQFoxGsFUzR6r350";

export const AO_SCHEDULER = "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA";
