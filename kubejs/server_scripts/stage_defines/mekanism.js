// priority: 90

/** @type {StageBase} */
const stageMekanism = {
  id: "mekanism",
  endItem: "mekanism:alloy_atomic",
  defaultStartItems: [
    "#forge:glass/silica",
    "#forge:glass/silica",
    "#forge:ingots/osmium",
  ],
  startWith: (recipesEvent, items) => {
    fillWithDefault(items, stageMekanism.defaultStartItems);
    recipesEvent.remove({ output: "mekanism:steel_casing" });
    recipesEvent.shaped("mekanism:steel_casing", ["ABA", "CDC", "ABA"], {
      A: "#forge:ingots/steel",
      B: items[0],
      C: items[1],
      D: items[2],
    });
  },
};
