const db = require("../db");
const { BadRequestError } = require("../utils/errors");


class Nutrition {
  static async getNutrition() {
    const query = `SELECT * 
                       FROM nutrition 
                       JOIN users ON users.id = nutrition.user_id`;
    const result = await db.query(query);
    const nutrition = result.rows;
    console.log(nutrition);
    return nutrition;
  }

  static async postNutrition(nutrition) {
    if (nutrition.nutrient.length === 0) {
      throw new BadRequestError("No nutrient name provided");
    }

    if (nutrition.category.length === 0) {
      throw new BadRequestError("No nutrition category provided");
    }

    const result = await db.query(
      `
            INSERT INTO nutrition(
                nutrient,
                category,
                quantity,
                calories,
                imageUrl,
                user_id
            )
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING user_id,nutrient,category,quantity,calories;
            `,
      [
        nutrition.nutrient,
        nutrition.category,
        nutrition.quantity,
        nutrition.calories,
        nutrition.imageUrl,
        nutrition.user_id,
      ]
    );

    const res = result.rows[0];
    return res;
  }
}

module.exports = Nutrition;
