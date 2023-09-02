const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = {
  type: "service_account",
  project_id: "test-62e62",
  private_key_id: "d2bc5094938ea94642ca40d23b0f35ca012e1c5d",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjpHbi0N1pjvaF\njvj5RxyLuPuVDC9tQ856ezMGWNQSxO1w2rxZZGEl0NRLs4SsfL+ZT/y4tEcnZl8M\nZ1fogIgH4nSyaHSKzHgLIRupHs8DFev6gL1m5AJ9QYVgnDsKs2QROPQXDIhMqBH2\n2hFv5u61rgW1wQ5L1abVsqd3nVkd0YVEhdEV+ROvY51lG+5VdmrZ8lEcF/3LfsYW\nS6IMzgKwDSqm3sBUrMFnd9h4LHZut+ID4hgpxXz0HUgIp3xX/QfO7VoaNsfaOjDw\nH2ejDg2wXHXEPdd3IiYrHzClyvbKJXaZAaxU39Ghp11HIhQOd3oA4elLG6FTKEqt\nl9qKDOmbAgMBAAECggEABSAR3NqZhevsqtj6R5vSQfuUmU4pUczsVgLz9T4CXwQf\nB/50TArpud3KEj/6+pIu5XJeC/X+b5jbriqKwHZhLsfh3y50f149m6fvWACrBZ9B\n1vqzG1CkkNrRHCU00vY0oV4TSYHT5ren83V3yWuZ5SY0A0Wazy08CumzYzXXBtop\nbKL5geWDbwI8K72NPkhJ5Tbw5lZiFD0YSWK0iNC7NZzzl72dfv0VNRwS/pMY2KNn\nqcuqHvGMld4g9mKm5C1qErbzG3hRCIWhFkeHMXF+1PKQpz82Pd12CulMwQfEUpNb\nJzedV2/JENkbVVteyaeSjNJhZiPTaBvcF7UE69tNYQKBgQDkEQdcuI1TaEKVpzoF\nesWejoayCGc9sOUC2PKq9/sJs8ueUH7t4NIDjQbgSl28sMH7ULAtRECz3ee9XD0h\nq0oOZS1t+sYopJxTPP8myK3BKsi6Y608wDjROjG1oHRxZXyl75I9/z6yFnG0umL4\n0sXKFpEV6RI7qNRWi4/2uHu07QKBgQC3r28bEpi22WYECqXiKMjgGbxKamRyfVPa\nwt1tOJ+pfKOPqpxDFbSv/rzcwXuGH0ln83Eht1s1EfTVcNQmBDudpGmogt1kC6+f\n9zQQJihj+KSlxrxvVNykI6BZnNDsGYXU6FUJOCuYMVU36zIZL8WnsTZ0Jd2IjnGr\nUA6uQMAPpwKBgFGYQhELOgzINWJDVP/W39MNXOVfGki4/AYbxh4i4F6lQ8kdNXw3\nvgtlLjuaf5TdjFk0kgNv8tInJxzZXkmodbNWwX0ihjjOQ9uH7CVdEMUWYIBG3xjo\nEKvSbSx0/pP/Yiwf3StvIWgnnYCyWmx5RCg8EKZNH6fWjDl2bwgvEps1AoGAULEa\nx/PVbo32SNQ8pytvgzMLCk3OrpTr33A3QaHcUeJVH+m9F6NTavUnFntQvkzEPIwv\nKLaZtKicu58DM2gsoEX3vHUwuKCBmG5KSsXYfIJgIgs6AFZxTxHvgS5ogS99IVim\n8pPgYs1ZOGVz7qiT1eT9nOx9c13QBYf3ywja1oUCgYAxOcStQ7yCNS237Pc12d6E\n0ewwx+4S/uZs8kSETVribM7vuL+qIzwURigcpNPHBcrg1jLa9rSV9IHKKH4YR4Qm\nzS+FWD2+PzPygXGjCd21XNr3SFYJ50owTsV8yy3amy0mlppxAGX8kQ02cGkQG/5t\nEFkEIgyOCplHZTnuluX72g==\n-----END PRIVATE KEY-----\n".replace(
      /\\n/g,
      "\n"
    ),
  client_email: "firebase-adminsdk-az1p0@test-62e62.iam.gserviceaccount.com",
  client_id: "112184461419394697931",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-az1p0%40test-62e62.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATA_BASE_URL_HTTP,
});

module.exports = admin;

/* type: process.env.FIREBASE_TYPE,
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
  databaseURL: process.env.FIREBASE_DATABASE_URL, */
