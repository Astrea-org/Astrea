export type UserProfile = {
  PID: string;
  bio: string;
  profile_img: string;
  username: string;
  wallet_address: string;
};

export interface ProccessItem {
  id: string;
  title: string;
  content_type: string;
}
