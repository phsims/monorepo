import { Input } from "@shared";
import { Recipe } from "../../api/schemas";


/* eslint-disable-next-line */
export interface EditRecipeProps { }

export function EditRecipe({ title, description, servings, ingredients }: Recipe) {
  return (
    <div >
      <form>
        <div><Input label={"title"} value={title} /></div>
        <div><Input label={"description"} value={description} /></div>
        <div><Input label={"servings"} value={servings} /></div>

        {ingredients && ingredients.map((item, index) => (<p key={index}><Input label={"item"} value={item} /></p>))}
        <div></div>
      </form>
    </div>
  );
}

export default EditRecipe;
