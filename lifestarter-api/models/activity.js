const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Activity {
  static async getSleepAvg() {
    const query = `SELECT strftime('%H', 'now') - strftime('%H', '2004-01-01')
                            FROM sleep
                            JOIN users ON users.id = sleep.user_id`;
    const result = await db.query(query);
    const sleep = result.rows;

    return sleep;
  }

  static async getCaloryAvg() {}

  static async getTotalExercise() {
    const query = `SELECT SUM(*)
                   FROM exercise
                            `;
    const result = await db.query(query);
   
   // const exercise = result.rows;

   // return exercise;

  }

  static async getAvgIntensity() {}
}

module.exports = Activity;
