import type { Models } from "react-native-appwrite";

export type Email = `${string}@${string}.${string}`;

export type URL = `${string}://${string}.${string}`;

export interface Simonorg_senaUsersType {
  username: string;
  email: Email;
  avatar: URL;
  accountId: string;
}

export interface Simonorg_senaUsersDocument
  extends Simonorg_senaUsersType,
    Models.Document {}

export interface Simonorg_senaVideosType {
  title: string;
  thumbnails: URL;
  prompt: string;
  video: URL;
  creator?: Simonorg_senaUsersType;
}

export interface Simonorg_senaVideosDocument
  extends Simonorg_senaVideosType,
    Models.Document {
  creator: Simonorg_senaUsersDocument;
}
