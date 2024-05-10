/**
 * @param {number} id ID of the user in database.
 */
export interface TokenPayload {
  userId: string;
}

/**
 * @param {number} id ID of the user in database.
 * @param {string} refresh_token Refresh token.
 */
export interface RefreshTokenPayload extends TokenPayload {
  refresh_token: string;
}
