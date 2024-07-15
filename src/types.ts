export interface TagType {
  name: string;
  value: string;
}

export enum PROCCESSID {
  profile = "iJ8bCUv-RGfWYF-fiGS_A_4d7fUtSwy9su9IcS48n2c",
  assetSrc = "2ZDuM2VUCN8WHoAKOOjiH4_7Apq0ZHKnTWdLppxCdGY",
}

export const CONTENT_TYPES = {
  json: "application/json",
  mp4: "video/mp4",
  textPlain: "text/plain",
};

export interface AssetItem {
  title: string;
  description: string;
  tags: TagType[];
  content_type: string;
  content: string;
  license: string;
  owner: string;
  file: FileList;
  proof: string;
  banner?: File;
  thumbnail?: File;
}
