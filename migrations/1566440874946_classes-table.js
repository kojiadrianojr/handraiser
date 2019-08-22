/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('classes', {
        classes_id: {
            type: 'serial',
            primaryKey: true,
        },
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
        },
        class_id: {
            type: 'integer',
            notNull: true,
            references: '"class"',
        },
        role_type: {
            type: 'text',
            notNull: true,
        },
        date_joined: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func("current_timestamp")
        },
    });
};

exports.down = (pgm) => {

};
