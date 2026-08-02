const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION;

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

/* ------------------------------------------
   GraphQL Helper
------------------------------------------ */

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    console.log(JSON.stringify(data.errors, null, 2));
    return null;
  }

  return data.data;
}

/* ------------------------------------------
   Get Products By Collection
------------------------------------------ */

export async function getProducts(collection = "electronics") {
  const query = `
    query GetCollectionProducts($handle: String!) {

      collection(handle: $handle) {

        title

        products(first: 20) {

          nodes {

            id

            title

            handle

            vendor

            description

            featuredImage {
              url
            }

            variants(first: 1) {
              nodes {
                id
                availableForSale
              }
            }

            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }

          }

        }

      }

    }
  `;

  
  const data = await shopifyFetch(query, {
    handle: collection,
  });

  return data.collection?.products?.nodes || [];
}

/* ------------------------------------------
   Get All Products
------------------------------------------ */

export async function getAllProducts() {
  const query = `
    query {

      products(first: 50) {

        nodes {

          id

          title

          handle

          vendor

          description

          featuredImage {
            url
          }

          variants(first: 1) {
            nodes {
              id
              availableForSale
            }
          }

          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }

        }

      }

    }
  `;

  const data = await shopifyFetch(query);

  return data.products.nodes;
}

/* ------------------------------------------
   Get Single Product
------------------------------------------ */

export async function getProduct(handle) {
  console.log("Handle received:", handle);

  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        vendor
        description

        featuredImage {
          url
        }

        images(first: 10) {
          nodes {
            url
          }
        }
variants(first: 20) {
  nodes {
    id
    title
    availableForSale

    price {
      amount
      currencyCode
    }
  }
}
      }
    }
  `;

  const data = await shopifyFetch(query, {
    handle,
  });

  console.log("Shopify Product:", data);

  return data?.product || null;
}
/* ------------------------------------------
   Get All Collections
------------------------------------------ */

export async function getCollections() {
  const query = `
    query {

      collections(first:20){

        nodes{

          id

          title

          handle

        }

      }

    }
  `;

  const data = await shopifyFetch(query);

  return data.collections.nodes;
}

/* ------------------------------------------
   Search Products
------------------------------------------ */

export async function searchProducts(search) {
  const query = `
    query SearchProducts($search: String!) {

      products(first:20, query:$search){

        nodes{

          id

          title

          handle

          vendor

          featuredImage{
            url
          }

          variants(first: 1) {
            nodes {
              id
              availableForSale
            }
          }

          priceRange{
            minVariantPrice{
              amount
              currencyCode
            }
          }

        }

      }

    }
  `;


  const data = await shopifyFetch(query, {
    search,
  });

  return data.products.nodes;
}


/* ------------------------------------------
   Create Shopify Cart
------------------------------------------ */

export async function createCart() {
  const query = `
    mutation {

      cartCreate {

        cart {

          id

          checkoutUrl

        }

      }

    }
  `;

  const data = await shopifyFetch(query);

  return data.cartCreate.cart;
}

/* ------------------------------------------
   Add Product To Cart
------------------------------------------ */

export async function addToCart(cartId, variantId, quantity = 1) {
  const query = `
    mutation CartLinesAdd(
      $cartId: ID!
      $lines: [CartLineInput!]!
    ) {
      cartLinesAdd(
        cartId: $cartId
        lines: $lines
      ) {

        cart {
          id

          totalQuantity

          checkoutUrl

          cost {
            subtotalAmount {
              amount
              currencyCode
            }

            totalAmount {
              amount
              currencyCode
            }
          }

          lines(first: 10) {
            nodes {
              id

              quantity

              merchandise {
                ... on ProductVariant {
                  id

                  title

                  price {
                    amount
                    currencyCode
                  }

                  product {
                    id

                    title

                    vendor

                    featuredImage {
                      url
                    }
                  }
                }
              }
            }
          }
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  console.log({
    cartId,
    variantId,
    quantity,
  });

  const data = await shopifyFetch(query, {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  });

  if (!data) {
    return null;
  }

  console.log(
    "Cart Response:",
    JSON.stringify(data.cartLinesAdd, null, 2)
  );

  if (data.cartLinesAdd.userErrors.length > 0) {
    console.error(data.cartLinesAdd.userErrors);
  }

  return data.cartLinesAdd.cart;
}

/* ------------------------------------------
   Get Shopify Cart
------------------------------------------ */

export async function getCart(cartId) {
  const query = `
    query GetCart($cartId: ID!) {

      cart(id: $cartId) {

        id

        totalQuantity

        checkoutUrl

        cost {
          totalAmount {
            amount
            currencyCode
          }
        }

        lines(first: 20) {

          nodes {

            id

            quantity

            merchandise {

              ... on ProductVariant {

                id

                title

                product {

                  title

                  handle

                  featuredImage {
                    url
                  }

                }

                price {
                  amount
                  currencyCode
                }

              }

            }

          }

        }

      }

    }
  `;

  const data = await shopifyFetch(query, {
    cartId,
  });

  return data.cart;
}
/* ------------------------------------------
   Update Cart Line Quantity
------------------------------------------ */

export async function updateCartLine(
  cartId,
  lineId,
  quantity
) {

  const query = `
    mutation CartLinesUpdate(
      $cartId: ID!,
      $lines: [CartLineUpdateInput!]!
    ) {

      cartLinesUpdate(
        cartId: $cartId,
        lines: $lines
      ) {

        cart {

          id

          totalQuantity

          cost {
            totalAmount {
              amount
            }
          }

          lines(first:20){

            nodes{

              id

              quantity

            }

          }

        }

        userErrors{

          field

          message

        }

      }

    }
  `;

  const data = await shopifyFetch(query, {
    cartId,
    lines: [
      {
        id: lineId,
        quantity,
      },
    ],
  });

  return data.cartLinesUpdate.cart;
}

/* ------------------------------------------
   Remove Product From Cart
------------------------------------------ */

export async function removeCartLine(
  cartId,
  lineId
) {

  const query = `
    mutation CartLinesRemove(
      $cartId: ID!,
      $lineIds: [ID!]!
    ) {

      cartLinesRemove(
        cartId: $cartId,
        lineIds: $lineIds
      ) {

        cart {

          id

          totalQuantity

          cost {
            totalAmount {
              amount
            }
          }

          lines(first:20){

            nodes{

              id

              quantity

            }

          }

        }

        userErrors{

          field

          message

        }

      }

    }
  `;

  const data = await shopifyFetch(query, {
    cartId,
    lineIds: [lineId],
  });

  return data.cartLinesRemove.cart;
}

/* ------------------------------------------
   Create Shopify Customer
------------------------------------------ */
export async function createCustomer(
  firstName,
  lastName,
  email,
  password
) {
  const query = `
    mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {

        customer {
          id
          firstName
          lastName
          email
        }

        customerUserErrors {
          field
          message
        }

      }
    }
  `;

  const data = await shopifyFetch(query, {
    input: {
      firstName,
      lastName,
      email,
      password,
    },
  });

  if (!data) return null;

  return data.customerCreate;
}

/* ------------------------------------------
   Login Shopify Customer
------------------------------------------ */

export async function loginCustomer(email, password) {
  const query = `
    mutation CustomerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {

        customerAccessToken {
          accessToken
          expiresAt
        }

        customerUserErrors {
          field
          message
        }

      }
    }
  `;

  const data = await shopifyFetch(query, {
    input: {
      email,
      password,
    },
  });

  if (!data) return null;

  return data.customerAccessTokenCreate;
}

/* ------------------------------------------
   Get Logged In Customer
------------------------------------------ */

export async function getCustomer(customerToken) {
  const query = `
    query GetCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {

        firstName
        lastName
        email

      }
    }
  `;

  const data = await shopifyFetch(query, {
    customerAccessToken: customerToken,
  });

  if (!data) return null;

  return data.customer;
}

export async function recoverCustomer(email) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(query, {
    email,
  });

  return data.customerRecover;
}

export async function getNewArrivals() {
  const query = `
    query {
      products(first: 6, sortKey: CREATED_AT, reverse: true) {
        nodes {
          id
          title
          handle
          vendor

          featuredImage {
            url
          }

          priceRange {
            minVariantPrice {
              amount
            }
          }

          variants(first: 1) {
            nodes {
              availableForSale
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);

  return data.products.nodes;
}