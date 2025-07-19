export type ClientsResponseType = {
  users: ClientType[],
}

export type ClientType = {
  id: number,
  name: string,
  surname: string,
  email: string,
  phone: string,
}
