import http from "../http-common";

class RecipeDataServices {
    getAll(page = 0) {
        return http.get(`/`);
    }
    /*getAll(page = 0) {
        return http.get(`/page=${page}`);
    }*/

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    addRecipe(data) {
        console.log("!!!!!")

        return http.post("/recipe", data);
    }

    updateRecipe(data) {
        return http.put("/recipe", data);
    }

    deleteRecipe(id) {
        return http.delete(`/recipe?id=${id}`);
    }

    getIngredients(id) {
        return http.get(`/ingredients`);
    }
}
export default new RecipeDataServices();