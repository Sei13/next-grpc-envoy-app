import { UserServiceClient } from '../proto/UserServiceClientPb';
import { GetUserRequest, GetUserResponse, User } from '../proto/user_pb';

// ユーザーサービスクライアントのインスタンス化
const userService = new UserServiceClient('http://localhost:8080', null, {
  format: 'text'
});

// ユーザー情報を取得する関数
export async function getUser(id: string): Promise<User.AsObject> {
  const request = new GetUserRequest();
  request.setId(id);
  const response = await userService.getUser(request);
  const user = response.getUser();
  if (!user) {
    throw new Error('User not found');
  }
  return {
    id: user.getId(),
    name: user.getName(),
    email: user.getEmail()
  };
}

// ユーザーサービスの型定義
export type { User } from '../proto/user_pb';

// ユーザーサービスのインターフェース
export interface UserService {
  getUser(request: GetUserRequest): Promise<User.AsObject>;
} 