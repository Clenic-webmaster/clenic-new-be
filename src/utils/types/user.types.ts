export type IUserPersonalInformation = {
    firstName?: string,
    lastName?: string,
    birthday?: string,
    createdAt?: string,
    imageProfile?: string,
    active?: boolean,
}

export type IUserSession = {
    jwt: string,
    identifierDevice?: string,
    location?: string,
    lastActive?: string,
}