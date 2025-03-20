import { UserServiceClient } from '../proto/UserServiceClientPb';
import { GetUserRequest } from '../proto/user_pb';

// ユーザーサービスクライアントのインスタンス化
const userService = new UserServiceClient('http://localhost:8080', null, {
  format: 'text'
});

// ユーザー情報を取得する関数
export async function getUser(id: string) {
  const request = new GetUserRequest();
  request.setId(id);
  return await userService.getUser(request);
}

// ユーザーサービスの型定義
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GetUserResponse {
  user: User;
}

// ユーザーサービスのインターフェース
export interface UserService {
  getUser(request: GetUserRequest): Promise<GetUserResponse>;
} 