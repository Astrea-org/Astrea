export interface TagType {
  name: string;
  value: string;
}

export type UserProfile = {
  PID: string;
  bio: string;
  profile_img: string;
  username: string;
  wallet_address: string;
};

export enum PROCCESSID {
  profile = "iJ8bCUv-RGfWYF-fiGS_A_4d7fUtSwy9su9IcS48n2c",
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
