export const REDDIT_APP_ID = 'Mcnxsc2BLOXi8w'
export const AUTH_URL = `https://www.reddit.com/api/v1/authorize.compact?client_id=${REDDIT_APP_ID}&response_type=token&state=REDDIT_APP_STATE&redirect_uri=about://callback/login&scope=read`
export const REDIRECT_URI_REGEX = /^about:\/\/callback\/login#access_token=(.+)&token_type=.+&expires_in=(\d+)/
export const MID_AUTH_URL = 'https://www.reddit.com/api/v1/authorize'
