import * as cheerio from 'cheerio';
import { Recipe } from '../api/schemas';

export const parseRecipe = (htmlContent: string): Recipe => {
  const $ = cheerio.load(htmlContent);

  const recipe: Recipe = {
    description: $("meta[name='description']").attr('content') || '',
    id: '88888',
    name: $('title').text() || '',
    url: $("meta[name='og:url']").attr('content') || '',
    author: $('a[rel="author"]').attr('content') || '',
    ingredients: [],
    method: [],
    image:
      $("meta[property='og:image']").attr('content') ||
      $("meta[name='og:image']").attr('content') ||
      $("meta[itemprop='image']").attr('content'),
  };

  const ingredients = $('.recipe__ingredients')
    .find('li')
    .each((i, el) => {
      recipe.ingredients.push($(el).text().replace(' ,', ','));
    });

  $('.recipe__method-steps')
    .find('p')
    .each((i, el) => {
      recipe.method.push($(el).text());
    });

  // $(".cook-and-prep-time")
  //     .find(".list-item")
  //     .each((i, el) => {
  //         const text = $(el).text();
  //         if (text.includes("Prep")) {
  //             time.prep = $(el)
  //                 .find("time")
  //                 .text();
  //         } else if (text.includes("Cook")) {
  //             time.cook = $(el)
  //                 .find("time")
  //                 .text();
  //         }
  //     });

  // servings = $(".post-header__servings .icon-with-text__children")
  //     .text()
  //     .replace("Makes ", "");

  return recipe;
};
