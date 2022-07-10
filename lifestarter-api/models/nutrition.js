const db = require("../db");
const { BadRequestError } = require("../utils/errors");


class Nutrition {
  static async getNutrition() {
    const query = `SELECT * 
                       FROM nutrition 
                       JOIN users ON users.id = nutrition.user_id`;
    const result = await db.query(query);
    const nutrition = result.rows;
  
    return nutrition;
  }

  static async getNutrientById(id) {
    const query = `SELECT * 
                       FROM nutrition 
                       JOIN users ON users.id = nutrition.user_id`;
    const result = await db.query(query);
    const nutrition = result.rows;
  
    return nutrition;
  }

  static async getNutritionById(id) {
    const nutritions = await this.getNutrition();

    const nutritionItems = nutritions.filter((datum) => {
      console.log(datum.id)
      console.log(datum.user_id)
      return datum.id === id;
    });

    return nutritionItems;
  }

  static async postNutrition(nutrition) {
    if (nutrition.nutrient.length === 0) {
      throw new BadRequestError("No nutrient name provided");
    }

    if (nutrition.category.length === 0) {
      throw new BadRequestError("No nutrition category provided");
    }

    if (nutrition.imageUrl.length === 0) {
      throw new BadRequestError("Must provide imageUrl");
    }

    if (nutrition.quantity === 0){
      throw new BadRequestError("Nutrition quantity cannot be zero");

    }

    if (nutrition.calories === 0){
      throw new BadRequestError("Nutrition calories cannot be zero");
      
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
