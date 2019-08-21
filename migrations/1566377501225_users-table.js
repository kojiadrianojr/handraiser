/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        uid: {
            type: 'serial',
            primaryKey: true,
        },
        username: {
            type: 'text',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {

};
