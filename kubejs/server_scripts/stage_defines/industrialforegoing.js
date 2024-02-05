// priority: 90

/** @type {StageBase} */
const stageIndustrialForegoing = {
  id: "industrialforegoing",
  endItem: "industrialforegoing:pink_slime_ingot",
  defaultStartItems: [
    "#forge:ingots/iron",
    "#forge:ingots/iron",
    "#forge:storage_blocks/redstone",
  ],
  startWith: (recipesEvent, items) => {
    fillWithDefault(items, stageIndustrialForegoing.defaultStartItems);
    recipesEvent.remove({ output: "industrialforegoing:machine_frame_pity" });
    recipesEvent.shaped(
      "industrialforegoing:machine_frame_pity",
      ["ABA", "CDC", "ABA"],
      {
        A: "#minecraft:logs",
        B: items[0],
        C: items[1],
        D: items[2],
      }
    );
  },
};