import { ReactNode } from "react";

export interface PostInterface {
  title: string;
  description: string;
  id?: string;
  created_at?: string;
  imageUrl?: string;
  videoUrl?: string;
  type?: "regular" | "video";
  videoID?: string;
}

export interface RequestInterface {
  type: string;
  description: string;
  amount: string;
  created_at?: string;
  id?: string;
}

export interface CustomModalInterface {
  isVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  children: ReactNode;
  title: string;
  isLoading?: boolean;
}
