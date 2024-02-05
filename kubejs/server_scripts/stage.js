// priority: 100
/**
 * stage.js - Define the stages.
 */

// Helper functions
/**
 * @param {*[]} arr
 * @param {*[]} def
 * @returns {void}
 */
function fill_with_default(arr, def) {
    for (let i = arr.length; i < def.length; i++) {
        arr.push(def[i]);
    }
}

// Stage defines
var stage_industrialforegoing = {
    /**
     * @type { string }
     */
    id: "industrialforegoing",

    /**
     * @type { string }
     */
    end_item: "industrialforegoing:pink_slime_ingot",

    /**
     * @type { string[] }
     */
    default_start_items: ["#forge:ingots/iron", "#forge:ingots/iron", "#forge:storage_blocks/redstone"],

    /**
     * @type { function (Internal.RecipesEventJS, string[]) : void }
     */
    start_with: (recipes_event, items) => {
        fill_with_default(items, stage_industrialforegoing.default_start_items);
        recipes_event.remove({ output: "industrialforegoing:machine_frame_pity" });
        recipes_event.shaped(
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

var stage_mekanism = {
    /**
     * @type { string }
     */
    id: "mekanism",

    /**
     * @type { string }
     */
    end_item: "mekanism:alloy_atomic",

    /**
     * @type { string[] }
     */
    default_start_items: ["#forge:glass/silica", "#forge:glass/silica", "#forge:ingots/osmium"],

    /**
     * @type { function (Internal.RecipesEventJS, string[]) : void }
     */
    start_with: (recipes_event, items) => {
        fill_with_default(items, stage_mekanism.default_start_items);
        recipes_event.remove({ output: "mekanism:steel_casing" });
        recipes_event.shaped(
            "mekanism:steel_casing",
            ["ABA", "CDC", "ABA"],
            {
                A: "#forge:ingots/steel",
                B: items[0],
                C: items[1],
                D: items[2],
            }
        );
    },
};

var stage_final = {
    /**
     * @type { string }
     */
    id: "final",

    /**
     * @type { string }
     */
    end_item: "randomprocess:final_item",

    /**
     * @type { string[] }
     */
    default_start_items: ["#forge:ingots/iron", "#forge:ingots/iron", "#forge:ingots/iron"],

    /**
     * @type { function (Internal.RecipesEventJS, string[]) : void }
     */
    start_with: (recipes_event, items) => {
        fill_with_default(items, stage_final.default_start_items);
        recipes_event.shaped(
            "randomprocess:final_item",
            ["ABA", "CDC", "ABA"],
            {
                A: "#forge:gems/diamond",
                B: items[0],
                C: items[1],
                D: items[2],
            }
        );
    },
};

const stage_list = [stage_industrialforegoing, stage_mekanism];
