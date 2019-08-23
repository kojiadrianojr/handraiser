/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('queues', {
        qid: {
            type: 'serial',
            primaryKey: true
        },
        class_id: {
            type: 'integer',
            references: 'class'
        },
        student_id: {
            type: 'integer',
        },
        mentor_id: {
            type: 'integer'
        },
        status: {
            type: 'text'
        }
    })
};

exports.down = (pgm) => {

};
