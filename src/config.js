const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || '10E57825F89949BD99BF7714C02064C8431A28E322A17CC15E3B07C791AFFE78', // taken from https://www.grc.com/passwords.htm
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/omni_db',
  saltingRounds: 12,
  saltLength: 16,
  passLength: 6,
  charArray: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ|!@#$%&()=?ç[]{}.,;+-*/~_:abcdefghijklmnopqrstuvwxyz0123456789', // for pepper maker
  sessionExpireTime: 1800000, //this is milliseconds
  cookieName: 'omnisys'
}

export default config;
