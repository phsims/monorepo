import { RecipeList } from 'meal-planner/components/RecipeList/RecipeList';

const DefaultPage = () => {
  const [allRecipes, setallRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    client.getRecipes().then((recipes) => {
      setallRecipes(recipes);
    });
  }, []);

  return (
    <RecipeList
      title="All Recipes"
      discription="Explore our recipes from around the world on our website."
      recipes={allRecipes}
    />
  );
};

export default DefaultPage;
