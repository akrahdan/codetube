import algoliasearch from 'algoliasearch/lite';
import { autocomplete } from '@algolia/autocomplete-js';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

export const autoSearch = autocomplete({
    getSources() {
      return [
        {
          sourceId: 'tags',
          getItems({ query }) {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'tags_index',
                  query
                },
              ],
            });
          },
          getItemUrl({ item }) {
            return item.url
          },
        },
      ];
    },
  });


