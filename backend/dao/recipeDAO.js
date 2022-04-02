import mongodb from "mongodb"

let recipe

export default class recipeDAO {
    static async injectDB(conn) {
        if (recipe) {
            return
        }
        try {

            recipe = await conn.db(process.env.RECIPES_NS).collection("recipes")

        } catch (e) {
            console.error(
                `Unable to establish a collection handle in recipeDAO: ${e}`,
            )
        }
    }

    static async getRecipes({
        filters = null,
        page = 0,
        recipesPerPage = 20,
    } = {}) {

        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("ingredients" in filters) {
                query = { "ingredients": { $eq: filters["ingredients"] } }
            } 
        }
        
        let cursor

        try {
            cursor = await recipe
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { recipeList: [], totalNumrecipes: 0 }
        }

        const displayCursor = cursor.limit(recipesPerPage).skip(recipesPerPage * page)

        try {
            const recipeList = await displayCursor.toArray()
            const totalNumrecipes = await recipe.countDocuments(query)


            return { recipeList, totalNumrecipes }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { recipeList: [], totalNumrecipes: 0 }
        }
    }
    /*
    static async getRestaurantByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews",
                    },
                },
                {
                    $addFields: {
                        reviews: "$reviews",
                    },
                },
            ]
            return await recipe.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getRestaurantByID: ${e}`)
            throw e
        }
    }

    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await recipe.distinct("cuisine")
            return cuisines
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`)
            return cuisines
        }
    }*/
}


