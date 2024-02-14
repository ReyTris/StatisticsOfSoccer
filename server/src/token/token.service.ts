import jwt from 'jsonwebtoken';

export class TokenService {
	generateToken(payload: string): any {
		const accessToken = jwt.sign({ payload }, 'APPPROOFWORK', {
			expiresIn: '30m',
		});
		const refreshToken = jwt.sign({ payload }, 'APPPROOFWORK', {
			expiresIn: '30d',
		});

		return {
			accessToken,
			refreshToken,
		};
	}
}
