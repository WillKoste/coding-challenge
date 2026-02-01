// import {WebServiceClient} from '@maxmind/geoip2-node';
import {Reader} from '@maxmind/geoip2-node';
import './index.js';

// Really we'd want to add Env variable validatiion rather than treating it as optional
export const geoIp = Reader.open('./GeoLite2-Country.mmdb');
