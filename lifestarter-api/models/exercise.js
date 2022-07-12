const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {
  static async getExercise() {
    const query = `SELECT * 
                       FROM exercise 
                       JOIN users ON users.id = exercise.user_id`;
    const result = await db.query(query);
    const exercise = result.rows;

    return exercise;
  }

  static async listExerciseForUser(user){
    const result = await db.query(
      ` SELECT * 
        FROM exercise
        WHERE user_id = $1;

      `, [user.id]
    )
    console.log(result.rows)

    return result.rows

  }

  static async getExercisesById(id) {
    const exercises = await this.getExercise();

    const exerciseItems = exercises.filter((datum) => {
      return datum.id === id;
    });

    return exerciseItems;
  }

  static async postExercise(exercise) {
    if (exercise.exercise.length === 0) {
      throw new BadRequestError("No exercise name provided");
    }

    if (exercise.category.length === 0) {
      throw new BadRequestError("No exercise category provided");
    }

    if (exercise.duration === 0) {
      throw new BadRequestError("Exercise duration cannot be zero");
    }

    if (exercise.intensity === 0) {
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
        exercise.exercise,
        exercise.category,
        exercise.duration,
        exercise.intensity,
        exercise.user_id,
      ]
    );

    const res = result.rows[0];
    return res;
  }
}

module.exports = Exercise;
