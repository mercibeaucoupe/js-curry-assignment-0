'use strict'

const entries =
  obj =>
    Object.keys(obj)
      .map(key => [key, obj[key]])

const listing =
  (name, price) => ({
    name,
    price
  })

const customer =
  (name, shoppingList) => ({
    name,
    shoppingList
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

/**
 * should return an array with the `itemName` repeated `count` number of times
 */
const itemRepeater =
  itemName =>
    count => {
      var arr = []
      for (let i = 0; i < count; i++) {
        arr.push(itemName)
      }
      return arr
    }

/**
 * should return an array of carts with each given customer's shopping list
 * as an array of items
 */
const constructCarts =
  listings =>
    customers => {
      return customers.map(customer => ({                             // Pulls out each customer element in customers
        customer: customer.name,                                      // Sets customer's name property with the key customer:
          items: ( entries(customer.shoppingList)                     // entries(obj) sets shoppingList item's key's to it's value
            .reduce((acc, next) =>                                    // E.g. [ ['item name' : quantity/count], ... ]
              [...acc, ...itemRepeater(next[0])(next[1])], []))       // next becomes an Element of the Nested Array.
                .reduce((acc, next) => [...acc, ...listings           // Spread operator spreads the nested arrays to create one array
                  .filter(listing => next === listing.name) ], [])    // Currying, Index 0 holds item name, Index 1 holds count.
      })                                                              // itemRepeater()() returns an array with JUST the item name.
    )                                                                 // Need to replace all of the populated item names with
}                                                                     // useable Objects. Need to grab the objects from listings.
                                                                      // Removes listings item objects if it's NOT in shoppingList.
                                                                      // Now has name and price property and is an Object    



module.exports = {
  listing,
  customer,
  constructCarts
}
