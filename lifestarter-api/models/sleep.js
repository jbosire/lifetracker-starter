const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Sleep {
  


  static async listSleepForUser(user){
    const result = await db.query(
      ` SELECT * 
        FROM sleep
        WHERE user_id = $1;

      `, [user.id]
    )
    

    return result.rows

  }




  static async postSleep({sleeps,user}) {
    if (sleeps.startTime.length === 0) {
      throw new BadRequestError("No start time provided");
    }

    if (sleeps.endTime.length === 0) {
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
        sleeps.startTime,
        sleeps.endTime,
        user.id,
      ]
    );

    const res = result.rows[0];
    return res;
  }

}

module.exports = Sleep;
