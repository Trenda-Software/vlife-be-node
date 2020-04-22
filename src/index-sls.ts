const http = require('serverless-http');
import api from './api';

export const handler = http(api);
