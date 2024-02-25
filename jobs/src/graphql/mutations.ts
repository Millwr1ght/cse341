/* tslint:disable */
/* eslint-disable */

mutation createRecipe($input: CreateRecipeInput!){
    createRecipe(input: $input) {
      _id
      name
      book
      page
    }
  }