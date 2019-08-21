/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('class', {
        class_id: {
            type: 'serial',
            primaryKey: true,
        },
        class_name: {
            type: 'text',
            notNull: true,
        },
        date_created: {
            type: 'text',
            notNull: true,
        }
    });
};

exports.down = (pgm) => {

};
