import {WebServiceClient} from '@maxmind/geoip2-node';

const MAX_MIND_ACCOUNT_ID = process.env.MAX_MIND_ACCOUNT_ID ?? '';
const MAX_MIND_LICENSE_KEY = process.env.MAX_MIND_LICENSE_KEY ?? '';

// Really we'd want to add Env variable validatiion rather than treating it as optional
export const maxMindClient = new WebServiceClient(MAX_MIND_ACCOUNT_ID, MAX_MIND_LICENSE_KEY);
