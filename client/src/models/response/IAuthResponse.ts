export interface IAuthResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
	isActivated: boolean;
	activationLink: string | null;
	created_at: Date;
	updated_at: Date;
}

export interface IEmailPassword {
	email: string,
	password:string,
	name?: string
}
