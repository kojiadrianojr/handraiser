/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("queues", {
    queue_id: {
      type: "serial",
      primaryKey: true
    },
    class_id: {
      type: "integer",
      notNull: true,
      references: '"class"'
    },
    student_id: {
      type: "text"
    },
    mentor_id: {
      type: "text"
    },
    status: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
