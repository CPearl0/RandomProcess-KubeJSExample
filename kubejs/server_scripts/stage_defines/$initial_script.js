// priority: 100

/**
 * stage.js - Define the stages.
 */

// Helper functions
/**
 * @param {Any[]} targetArray
 * @param {Any[]} sourceArray
 * @returns {void}
 */
function fillWithDefault(targetArray, sourceArray) {
  return targetArray.concat(sourceArray.slice(targetArray.length));
}

/**
 * @typedef {Object} StageBase
 * @property {String} id
 * @property {Internal.ItemStack_} endItem
 * @property {Internal.ItemStack_[]} defaultStartItems
 * @property {(recipesEvent: Internal.RecipesEventJS, items: Internal.ItemStack_[]) => void} startWith
 */
