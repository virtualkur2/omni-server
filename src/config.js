const expirationTime = 1800000; //this is milliseconds

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || '10E57825F89949BD99BF7714C02064C8431A28E322A17CC15E3B07C791AFFE78', // taken from https://www.grc.com/passwords.htm
  cookieSecret: process.env.COOKIE_SECRET || '4I4B!E;B$Abo9{*d<@lD$c{E{[8E_ShNF/NMt!l7Lgx.oE!|53}1iQb25l@&q)U', // taken from https://www.grc.com/passwords.htm
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/omni_db',
  saltingRounds: 12,
  saltLength: 16,
  passLength: 6,
  charArray: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ|!@#$%&()=?ç[]{}.,;+-*/~_:abcdefghijklmnopqrstuvwxyz0123456789', // for pepper maker
  sessionExpireTime: expirationTime,
  cookieName: 'omnisys',
  cookieOptions: {
    maxAge: expirationTime,
    secure: process.env.NODE_ENV ? true : false,
    signed: true,
  },
  GMAIL: {
    clientID: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectURL: process.env.GMAIL_REDIRECT_URL,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    emailUser: process.env.GMAIL_USER
  },
  MAILGUN: {
    host: process.env.MAILGUN_HOST,
    port: process.env.MAILGUN_PORT,
    secure: process.env.NODE_ENV ? true : false,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASS
    }
  }
}

export default config;
