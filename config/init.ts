import Knex from 'knex';
import { Model } from 'objection';
import AppMode from './mode';
const knexfile = require('../../knexfile');

const knex = Knex(knexfile[AppMode.mode]);

Model.knex(knex);
