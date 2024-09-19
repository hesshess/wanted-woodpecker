import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly KAKAO_API_URL = 'https://kapi.kakao.com/v2/user/me';

  async getKakaoUser(token: string) {
    const response = await axios.get(this.KAKAO_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async getAccessToken(code: string) {
    const tokenResponse = await axios.post(`https://kauth.kakao.com/oauth/token`, null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
      },
    });

    return tokenResponse.data.access_token;
  }
}