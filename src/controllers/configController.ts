import { Context } from 'hono';
import { prepareResponse } from '../helpers/response';

export const globalConfig = async (c:Context) => {
    try {

        const { default: config } = await import('../appconfig.json');
        console.log('config',JSON.stringify(config));
        
        return c.json(prepareResponse('success', config ));
    } catch (error) {
        
        console.log('an error occurred retrieving config', [error]);
        return c.json(prepareResponse('failure', {} ));
    }
};
