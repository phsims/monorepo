import {
  SpoonacularClient,
  createSpoonacularClient,
} from './spoonacular-api.js';

describe('createSpoonacularClient', () => {
  it('returns a SpoonacularClient', () => {
    const client = createSpoonacularClient('test-key');
    expect(client).toBeInstanceOf(SpoonacularClient);
  });

  it('throws when apiKey is empty', () => {
    expect(() => createSpoonacularClient('')).toThrow(
      'Spoonacular API key is required',
    );
    expect(() => createSpoonacularClient('   ')).toThrow(
      'Spoonacular API key is required',
    );
  });
});

describe('SpoonacularClient#getRandomRecipes', () => {
  const apiKey = 'test-api-key';
  let client: SpoonacularClient;
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    client = new SpoonacularClient(apiKey);
    fetchSpy = jest.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('requests the random recipes endpoint with apiKey', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: [] }),
    });

    await client.getRandomRecipes();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url] = fetchSpy.mock.calls[0];
    expect(url).toContain('https://api.spoonacular.com/recipes/random');
    expect(url).toContain('apiKey=test-api-key');
  });

  it('passes number, includeNutrition, includeTags, excludeTags', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: [] }),
    });

    await client.getRandomRecipes({
      number: 3,
      includeNutrition: true,
      includeTags: 'vegetarian,dessert',
      excludeTags: 'nuts',
    });

    const [url] = fetchSpy.mock.calls[0];
    expect(url).toContain('number=3');
    expect(url).toContain('includeNutrition=true');
    expect(url).toContain('include-tags=vegetarian%2Cdessert');
    expect(url).toContain('exclude-tags=nuts');
  });

  it('clamps number between 1 and 100', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: [] }),
    });

    await client.getRandomRecipes({ number: 200 });
    expect(fetchSpy.mock.calls[0][0]).toContain('number=100');

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: [] }),
    });
    await client.getRandomRecipes({ number: 0 });
    expect(fetchSpy.mock.calls[1][0]).toContain('number=1');
  });

  it('returns recipes from the API', async () => {
    const recipes = [
      {
        id: 123,
        title: 'Test Recipe',
        image: 'https://example.com/img.jpg',
        imageType: 'jpg',
        servings: 4,
        readyInMinutes: 30,
        cuisines: [],
        dishTypes: [],
        diets: [],
      },
    ];
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes }),
    });

    const result = await client.getRandomRecipes({ number: 1 });
    expect(result.recipes).toHaveLength(1);
    expect(result.recipes[0].id).toBe(123);
    expect(result.recipes[0].title).toBe('Test Recipe');
  });

  it('throws when response is not ok', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 402,
      statusText: 'Payment Required',
      text: async () => 'Quota exceeded',
    });

    await expect(client.getRandomRecipes()).rejects.toThrow(
      'Spoonacular API error 402: Quota exceeded',
    );
  });
});

describe('SpoonacularClient#getRecipeInformation', () => {
  const apiKey = 'test-api-key';
  let client: SpoonacularClient;
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    client = new SpoonacularClient(apiKey);
    fetchSpy = jest.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('requests the recipe information endpoint with apiKey and id', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 716429,
        title: 'Example',
        image: 'https://example.com/img.jpg',
        imageType: 'jpg',
        servings: 2,
        readyInMinutes: 45,
        cuisines: [],
        dishTypes: [],
        diets: [],
      }),
    });

    await client.getRecipeInformation(716429);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url] = fetchSpy.mock.calls[0];
    expect(url).toContain(
      'https://api.spoonacular.com/recipes/716429/information',
    );
    expect(url).toContain('apiKey=test-api-key');
  });

  it('passes includeNutrition, addWinePairing, addTasteData', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        title: 'Test',
        image: '',
        imageType: 'jpg',
        servings: 1,
        readyInMinutes: 10,
        cuisines: [],
        dishTypes: [],
        diets: [],
      }),
    });

    await client.getRecipeInformation(1, {
      includeNutrition: true,
      addWinePairing: true,
      addTasteData: true,
    });

    const [url] = fetchSpy.mock.calls[0];
    expect(url).toContain('includeNutrition=true');
    expect(url).toContain('addWinePairing=true');
    expect(url).toContain('addTasteData=true');
  });

  it('returns the recipe from the API', async () => {
    const recipe = {
      id: 999,
      title: 'Returned Recipe',
      image: 'https://example.com/recipe.jpg',
      imageType: 'jpg',
      servings: 4,
      readyInMinutes: 60,
      cuisines: ['italian'],
      dishTypes: ['main course'],
      diets: ['vegetarian'],
    };

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => recipe,
    });

    const result = await client.getRecipeInformation(999, {
      includeNutrition: true,
    });

    expect(result.id).toBe(999);
    expect(result.title).toBe('Returned Recipe');
    expect(result.servings).toBe(4);
    expect(result.cuisines).toContain('italian');
  });

  it('throws when response is not ok', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: async () => 'Recipe not found',
    });

    await expect(client.getRecipeInformation(1234)).rejects.toThrow(
      'Spoonacular API error 404: Recipe not found',
    );
  });
});

describe('SpoonacularClient#getSimilarRecipes', () => {
  const apiKey = 'test-api-key';
  let client: SpoonacularClient;
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    client = new SpoonacularClient(apiKey);
    fetchSpy = jest.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('requests the similar recipes endpoint with apiKey, id, and number', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await client.getSimilarRecipes(715538, 5);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url] = fetchSpy.mock.calls[0];
    expect(url).toContain('https://api.spoonacular.com/recipes/715538/similar');
    expect(url).toContain('apiKey=test-api-key');
    expect(url).toContain('number=5');
  });

  it('clamps number between 1 and 100', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    await client.getSimilarRecipes(1, 0);
    expect(fetchSpy.mock.calls[0][0]).toContain('number=1');

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    await client.getSimilarRecipes(1, 200);
    expect(fetchSpy.mock.calls[1][0]).toContain('number=100');
  });

  it('returns similar recipes from the API', async () => {
    const similar = [
      {
        id: 209128,
        title: 'Dinner Tonight: Grilled Romesco-Style Pork',
        imageType: 'jpg',
        readyInMinutes: 45,
        servings: 4,
        sourceUrl: 'http://example.com/romesco-pork',
      },
    ];

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => similar,
    });

    const result = await client.getSimilarRecipes(715538, 1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(209128);
    expect(result[0].title).toBe('Dinner Tonight: Grilled Romesco-Style Pork');
  });

  it('throws when response is not ok', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      text: async () => 'Internal error',
    });

    await expect(client.getSimilarRecipes(715538, 3)).rejects.toThrow(
      'Spoonacular API error 500: Internal error',
    );
  });
});
