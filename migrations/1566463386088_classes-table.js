/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("classes", {
    class_id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"'
    },
    class_id: {
      type: "integer",
      notNull: true,
      references: '"class"'
    },
    role_type: {
      type: "text"
    },
    date_joined: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
