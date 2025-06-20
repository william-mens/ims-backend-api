import { getParameter } from '@aws-lambda-powertools/parameters/ssm';


export const getDbCredentials = async () => {
  const credentials = await getParameter(process.env.CRED_PATH as string, {
    decrypt:true,
    maxAge: 300,         
  });

  if (!credentials) {
    throw new Error('DB credentials not found');
  }

  console.log('credentialsss',typeof credentials)
  return JSON.parse(credentials); 
};
