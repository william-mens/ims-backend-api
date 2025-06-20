import { SSMProvider } from '@aws-lambda-powertools/parameters/ssm';

const ssmProvider = new SSMProvider();

export const getDbCredentials = async () => {
  const credentials = await ssmProvider.get(process.env.CRED_PATH as string, {
    withDecryption: true, 
    maxAge: 300,         
  });

  if (!credentials) {
    throw new Error('DB credentials not found');
  }

  console.log('credentialsss',credentials)
  return JSON.parse(credentials); 
};
