/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("class", {
    class_id: {
      type: "serial",
      primaryKey: true
    },
    class_name: {
      type: "text"
    },
    date_created: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {};
