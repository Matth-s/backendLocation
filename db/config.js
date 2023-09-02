const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCaoC/Mxup603Dz\npA5I+PfGWhxTEngV+ExF1xXiVDV1/aCAT2ZrnXSbzo+rurnlBwB65ehiR53Z0zvD\nUvTi2cEeNnuH/0HPP5UWVAUpHNtYfCSJQl088Oa72EvWdxKA1WO5DMgIgjShnXZy\nZ4G8iRKkU7oo6x7ESsOYxRWwYYZKZ0Ody5/Tp4BdnYtWjRBXhyVSVl48p/q5XRXn\nR8ndonPvRxYEspYXLBZciaIt9XQyOzQk/T+R6Z0h1eUTXzlPx2sws5KyC+wtIzxy\npVe2Jlq2Vae4YDd1oSCa7O9186+QN39nu4k1b9mI3MoWLWMS9Ni550+RO/ZPG6d4\nWjz3HWaDAgMBAAECggEAKu8+xpAXLKrIasaLduS2vBtqUQDIWmVbHGtoNrOmMpCN\nwAMMD+alKdw11XvgQUFr9zQejiePo5u9NPO0bscDEhYTwAP3LIpdpdkHo85Q86Vo\n6boFNLY5g0BAcpkWiLJ34bq0UnSBE70q1gJ6qjSvefSLtO/wV5Xg8OsMpjC2PrM1\n81Ob/CdcbqVdStmnuewS6gCgNHTSvTyybMmkkj9X3IfznsXlS36qvnrZV46T9wvc\nO7y2hAOwEQrdDDKI4/bmOdpoaPUMsPBnltnfCu2/xk6S0PAIWHyvxwIfg1WbFpQt\nW4ZoqNzTSorHyPf4ouJfnEiv6s1eWNrThUyeMMSGjQKBgQDVxePObu5CZstSP117\nmFPKo2nTOtWdPGc0SP8hQiBSm+3Qxc31AcZwyU1l5kQWbDPx0C2IMSni29RsAPXd\nBL3JVHLUm2Zp/mcVnVq/pes/8vHLTrcfCVnkinjTBpB9P+lL9ehHHjnpScneJaGI\nQevJG35hhAfr1Rs/bBGgEv2lHwKBgQC5K1O/z9wPDgPR9L3OXFk4XuX8BSmXGit2\nquULyZa88jLbJlLFy5OTM0/u2ET5G/NHX42PAcm4wgdvuuFQ5CCKAwPYmB7l5x02\naORZqUHMSOyl7X/qLn3icwAX1Bcz+JpH50uSLNq0yItJ6qCN3D2FKR80U+eERBdR\nVWna+WYOHQKBgG47RsbyCMYQv5M/vXK4D60UKsOTOQeFWCpr4bNCp+wxH6Zh+Vv3\neF48Tz7WSBHP5dExaekqgNDMTnMK47z+bubcNwJOx7asSneo1lywr+gf3HLbui20\n4reod7lJT0RmqmRS/118xpv3QrLccLkUVQM0vCyIqpT/JLfFgCks4cI9AoGBAIMK\nOXN1uwrgZS2xIJ2oVu+AoQsv8BXhzD5nhD5KRCWk1P6n6U3W2rICTx/85xrPf+PT\nqE86+bGJhk+4lflz598jcRZX2Q3j95Vot6kIEetq9CYcpDhq/GVD8x3p1x3NYgle\nkul4WrIzdfcyVrrt0I+q4U1bz2yX71R8uLPhaSq1AoGACdU2mIfX/44TT4cFqtK/\nRaHhrkSPQcGLcT3b6wQvLPNXU73A3ZVTqlMWfN6wCLvsrqMWXreIs20LxWEuctBT\ntDh7r4QhSMmHcGkXqZi8ZBFpSeVFA4ByoJN5GJ2vc8mjYHzNclKvX615LbSmN5i+\noydjivNf0wCYPWiEvXVUm84=\n-----END PRIVATE KEY-----\n".replace(
      /\\n/g,
      "\n"
    ),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATA_BASE_URL_HTTP,
});

module.exports = admin;
