import { Adapter } from '../Interface/adapter';

export interface UserInterface {
    	id: string;
		name: string;
    	email: string;
		avatar: string;
		active: boolean;
        companyName: string;
        phoneNumber: string;
        companyWeb: string;
        userType: string;
		createdAt: Date;
		updatedAt: Date;
	}

export class UserModel implements UserInterface {
    constructor(
		public id: string,
		public name: string,
		public email: string, 
		public avatar: string,
		public active: boolean,
        public companyName: string,
        public phoneNumber: string,
        public companyWeb: string,
        public userType: string,
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}

export class UserAdapter implements Adapter<UserModel> {
    adapt(item: any): UserModel {
        return new UserModel(
            item.id,
            item.name,
            item.email,
            item.avatar,
            item.active,
            item.companyName,
            item.phoneNumber,
            item.companyWeb,
            item.userType,
            item.createdAt,
            item.updatedAt
        );
    }
}