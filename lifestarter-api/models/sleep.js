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


  static async getSleepById(id) {
    const sleeps = await this.getSleep();

    const sleepItems = sleeps.filter((datum) => {
      return datum.id === id;
    });

    return sleepItems;
  }


  static async postSleep(sleep) {
    if (sleep.startTime.length === 0) {
      throw new BadRequestError("No start time provided");
    }

    if (sleep.endTime.length === 0) {
      throw new BadRequestError("No end time provided");
    }

    const result = await db.query(
      `
        INSERT INTO sleep(
            startTime,
            endTime,
            user_id
        )
        VALUES ($1,$2,$3)
        RETURNING user_id,startTime,endTime,user_id,createdAt;
        `,
      [
        sleep.startTime,
        sleep.endTime,
        sleep.user_id,
      ]
    );

    const res = result.rows[0];
    return res;
  }

}

module.exports = Sleep;
