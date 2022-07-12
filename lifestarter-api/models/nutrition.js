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

  static async listNutritionForUser(user){
    const result = await db.query(
      ` SELECT * 
        FROM nutrition
        WHERE user_id = $1;

      `, [user.id]
    )
   

    return result.rows

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
      
      return datum.id === id;
    });

    return nutritionItems;
  }

  static async postNutrition({nutritions, user}) {
    if (nutritions.nutrient.length === 0) {
      throw new BadRequestError("No nutrient name provided");
    }

    if (nutritions.category.length === 0) {
      throw new BadRequestError("No nutrition category provided");
    }

    if (nutritions.imageUrl.length === 0) {
      throw new BadRequestError("Must provide imageUrl");
    }

    if (nutritions.quantity === 0){
      throw new BadRequestError("Nutrition quantity cannot be zero");

    }

    if (nutritions.calories === 0){
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
        nutritions.nutrient,
        nutritions.category,
        nutritions.quantity,
        nutritions.calories,
        nutritions.imageUrl,
        user.id,
      ]
    );

    const res = result.rows[0];
    return res;
  }
}

module.exports = Nutrition;
