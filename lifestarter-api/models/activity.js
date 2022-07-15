const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Activity {

  static async getTotalSleep({user}){
    const result = await db.query(`
    SELECT  SUM(endTime - startTime)
    FROM sleep
    WHERE user_id = $1

      `, [user.id]
    )

   

     const row = result.rows[0];
    
    const total = (row.sum.days * 24) + row.sum.hours
    return total
    
  }

  

  static async getCaloryAvg({user}) {
    
    const result = await db.query( `
       SELECT AVG(calories) 
       FROM nutrition
       WHERE user_id = $1
    
    `, [user.id])

    return result.rows[0].avg

  }

  static async getTotalCalory({user}){
    const result = await db.query( `
       SELECT SUM(calories) 
       FROM nutrition
       WHERE user_id = $1
    
    `, [user.id])

    return result.rows[0].sum

  }


  static async getTotalDuration({user}){
    const result = await db.query( `
       SELECT SUM(duration) 
       FROM exercise
       WHERE user_id = $1
    
    `, [user.id])

    return result.rows[0].sum
    
  }

  static async getAvgIntensity({user}){
    const result = await db.query( `
       SELECT AVG(intensity) 
       FROM exercise
       WHERE user_id = $1
    
    `, [user.id])

    return result.rows[0].avg

  }

  

  static async getStats({user}){
  
    var result = {
      caloryAvg: await this.getCaloryAvg({user}),
      caloryTot: await this.getTotalCalory({user}),
      durationTot: await this.getTotalDuration({user}),
      intensityAvg: await this.getAvgIntensity({user}),
      totalSleep: await this.getTotalSleep({user})
    }

    return result;
  }




  

  
}

module.exports = Activity;
