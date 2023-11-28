import { Recipe } from '../../api/schemas';

/* eslint-disable-next-line */
// export interface ViewRecipeProps {
//   title: string;
// }

export function ViewRecipe({ name }: Recipe) {
  return (
    <h2 className="text-primary text-lg font-normal mb-3 tracking-widest uppercase ls-51">
      {name}
    </h2>
  );
}

export default ViewRecipe;
