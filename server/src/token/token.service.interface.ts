export interface ITokenService {
    generateToken: (payload: string) => IGenerateToken
}

export interface IGenerateToken {
    accessToken: string;
    refreshToken: string;
}