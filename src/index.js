import  './styles.scss';
import  'bootstrap';

import init from './init';
import view from './view';
import app from './app';
import config from './config';

const initState = init();
const state = view(initState, config);
app(state, config);
