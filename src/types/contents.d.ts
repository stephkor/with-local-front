type desc = "question" | "restaurant" | "help";

interface guListResponse {
  gu: string;
  latitude: string;
  longitude: string;
  subAddressId: number;
}

interface TabListResponse {
  categoryId: number;
  text: string;
}

interface PostBodyParams {
  title: string;
  description: string;
  categoryId: number;
  files?: Array<any>;
}

interface BoardResponse {
  categoryId: number;
  category: string;
  description: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  postId: number;
}
