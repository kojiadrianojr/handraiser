/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        uid: {
            type: 'serial',
            primaryKey: true,
        },
        first_name: {
            type: 'text',
            notNull: true,
        },
        last_name: {
            type: 'text',
            notNull: true,
        },
        image: {
            type: 'text',
        },
        email: {
            type: 'text',
            notNull: true,
        }
    });
};

exports.down = (pgm) => {

};
