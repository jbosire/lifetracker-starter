const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Sleep {
  static async getSleep() {
     const query = `SELECT * 
                    FROM sleep 
                    JOIN users ON users.id = sleep.user_id`;
     const result = await db.query(query);
     const sleep = result.rows;
    return sleep;
  }
}

module.exports = Sleep;
