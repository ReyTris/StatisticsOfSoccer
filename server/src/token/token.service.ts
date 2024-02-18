import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { IGenerateToken, ITokenService } from './token.service.interface';

@injectable()
export class TokenService implements ITokenService {
	generateToken(payload: string): IGenerateToken {
		const accessToken = jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET!, {
			expiresIn: '30m',
		});
		const refreshToken = jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET!, {
			expiresIn: '30d',
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	// saveToken() {

	// }
}
