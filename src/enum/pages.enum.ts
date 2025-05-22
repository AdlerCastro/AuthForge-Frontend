export enum NeedAuth {
  HOME_AUTH = '/home',
  USERS = '/users',
  USER = '/users/[id]',
  PROFILE = '/profile',
  ADMIN = '/admin',
}

export enum NoAuth {
  LOGIN = '/login',
  REGISTER = '/register',
  HOME = '/',
}
