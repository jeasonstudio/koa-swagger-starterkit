export type ID = number

export type Order = {
  id?: number,
  petId?: ID,
  quantity?: number,
  shipDate?: string,
  status?: 'placed' | 'approved' | 'delivered',
  complete?: boolean,
}

export type Category = {
  id?: ID,
  name?: string,
}

export type User = {
  id?: ID,
  username?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  phone?: string,
  userStatus?: number,
}

export type Tag = {
  id?: ID,
  name?: string,
}

export type Pet = {
  id?: ID,
  category?: Category,
  name: string,
  photoUrls: string[],
  tags?: Tag[],
  status?: 'available' | 'pending' | 'sold',
}

export type ApiResponse = {
  code?: number,
  type?: string,
  message: string,
}
