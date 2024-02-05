// priority: 90

/** @type {StageBase} */
const stageFinal = {
  id: "final",
  endItem: "randomprocess:final_item",
  defaultStartItems: [
    "#forge:ingots/iron",
    "#forge:ingots/iron",
    "#forge:ingots/iron",
  ],
  startWith: (recipesEvent, items) => {
    fillWithDefault(items, stageFinal.defaultStartItems);
    recipesEvent.shaped("randomprocess:final_item", ["ABA", "CDC", "ABA"], {
      A: "#forge:gems/diamond",
      B: items[0],
      C: items[1],
      D: items[2],
    });
  },
};
