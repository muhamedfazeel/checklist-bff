/**
 * @param {number} id ID of the user in database.
 */
export interface TokenPayload {
  userId: string;
}

/**
 * @param {number} id ID of the user in database.
 * @param {string} refreshToken Refresh Token.
 */
export interface RefreshTokenPayload extends TokenPayload {
  refreshToken: string;
}
