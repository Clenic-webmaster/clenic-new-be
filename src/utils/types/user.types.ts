export type IUserPersonalInformation = {
    firstName?: string,
    lastName?: string,
    birthday?: Date,
    createdAt?: Date,
    imageProfile?: string,
    active?: boolean,
}

export type IUserSession = {
    jwt: string,
    identifierDevice?: string,
    location?: string,
    lastActive?: Date,
}