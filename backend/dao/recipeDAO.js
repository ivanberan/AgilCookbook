import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId
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



   

    static async addRecipe(name, description, ingredients) {
        try {
            const recipeDoc = {
                name:  name,
                description: description,
                ingredients: ingredients,
            }

            return await recipe.insertOne(recipeDoc)
        } catch (e) {
            console.error(`Unable to add recipe: ${e}`)
            return { error: e }
        }
    }

    static async updateRecipe(_id, name, description, ingredients) {
        try {
            const updateResponse = await recipe.updateOne(
                { _id: ObjectId(_id) },
                { $set: { name: name, description: description,ingredients: ingredients } },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update recipe: ${e}`)
            return { error: e }
        }
    }

    static async deleteRecipe(_id) {

        try {
            const deleteResponse = await recipe.deleteOne({
                _id: ObjectId(_id),
            })
 
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete recipe: ${e}`)
            return { error: e }
        }
    }




    
    static async getRecipeById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "recipes",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "recipes",
                    },
                },
                {
                    $addFields: {
                        recipes: "$recipes",
                    },
                },
            ]
            console.log(pipeline)
            return await recipe.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getRecipeById: ${e}`)
            throw e
        }
    }

    static async getIngredients() {
        let ingredients = []
        try {
            ingredients = await recipe.distinct("ingredients")
            return ingredients
        } catch (e) {
            console.error(`Unable to get ingredients, ${e}`)
            return ingredients
        }
    }
}


