import Knex from 'knex';
import AppMode from '../config/mode';
const knexfile = require('../../knexfile');

const knex = Knex(knexfile[AppMode.mode]);

export default knex;
