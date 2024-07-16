export interface TagType {
  name: string;
  value: string;
}

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
