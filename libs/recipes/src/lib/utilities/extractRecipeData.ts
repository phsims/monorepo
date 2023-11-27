import * as cheerio from 'cheerio';
import { Recipe, Times } from '../api/schemas';

const getMetaContent = (
  $: cheerio.CheerioAPI,
  selector: string
): string | undefined => {
  const content = selector && $(selector)?.attr('content');
  return content || undefined;
};

const getIngredients = ($: cheerio.CheerioAPI): Recipe['ingredients'] | [] => {
  const array: Recipe['ingredients'] = [];

  $('.recipe__method-steps')
    .find('p')
    .each((i, el) => {
      array.push($(el).text());
    });

  return array || [];
};

const getTimes = ($: cheerio.CheerioAPI): Times => {
  const times: Times = {};
  $('.cook-and-prep-time')
    .find('.list-item')
    .each((i, el) => {
      const text = $(el).text();
      if (text.includes('Prep')) {
        times.prep = $(el).find('time').text();
      } else if (text.includes('Cook')) {
        times.cook = $(el).find('time').text();
      }
    });
  return times;
};

export const extractRecipeData = (htmlContent: string): Recipe => {
  const $ = cheerio.load(htmlContent);

  const recipe: Recipe = {
    description: getMetaContent($, "meta[name='description']") || '',
    name: $('title').text() || '',
    url: getMetaContent($, "meta[name='og:url']") || '',
    author: $('a[rel="author"]').attr('content') || '',
    ingredients: getIngredients($),
    method: [],
    image:
      getMetaContent($, "meta[property='og:image']") ||
      getMetaContent($, "meta[name='og:image']") ||
      getMetaContent($, "meta[itemprop='image']"),
    times: getTimes($),
    servings: $('.post-header__servings .icon-with-text__children')
      .text()
      .replace('Makes ', ''),
  };
  return recipe;
};
