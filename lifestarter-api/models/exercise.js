const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {
  

  

  static async listExerciseForUser(user){
    const result = await db.query(
      ` SELECT * 
        FROM exercise
        WHERE user_id = $1;

      `, [user.id]
    )
   

    return result.rows

  }

  

  static async postExercise({exercises, user}) {
    if (exercises.exercise.length === 0) {
      throw new BadRequestError("No exercise name provided");
    }

    if (exercises.category.length === 0) {
      throw new BadRequestError("No exercise category provided");
    }

    if (exercises.duration === 0) {
      throw new BadRequestError("Exercise duration cannot be zero");
    }

    if (exercises.intensity === 0) {
      throw new BadRequestError("Exercise intensity cannot be zero");
    }

    const result = await db.query(
      `
        INSERT INTO exercise(
            exercise,
            category,
            duration,
            intensity,
            user_id
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING user_id,exercise,category,duration,intensity;
        `,
      [
        exercises.exercise,
        exercises.category,
        exercises.duration,
        exercises.intensity,
        user.id,
      ]
    );

    const res = result.rows[0];
    return res;
  }
}

module.exports = Exercise;
