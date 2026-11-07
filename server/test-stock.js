// Run: npm run test:stock  -> shows exactly what Shopify tells the bot about your stock
import "dotenv/config";

const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || process.env.VITE_SHOPIFY_API_VERSION;

const query = `{
  products(first: 5) {
    nodes { title variants(first: 5) { nodes { title availableForSale quantityAvailable } } }
  }
}`;

const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
  body: JSON.stringify({ query }),
});
const json = await res.json();

if (json.errors) {
  console.log("\n❌ SHOPIFY REFUSED STOCK NUMBERS:");
  console.log(JSON.stringify(json.errors, null, 2));
  console.log("\nFIX: turn on 'unauthenticated_read_product_inventory' for your Storefront token (see steps).");
} else {
  for (const p of json.data.products.nodes) {
    for (const v of p.variants.nodes) {
      console.log(`${p.title} / ${v.title}: availableForSale=${v.availableForSale}, quantity=${v.quantityAvailable}`);
    }
  }
  const anyNumber = json.data.products.nodes.some((p) => p.variants.nodes.some((v) => typeof v.quantityAvailable === "number"));
  console.log(anyNumber
    ? "\n✅ Stock numbers work. Restart the bot server and ask again."
    : "\n⚠️ Permission is OK, but quantity is null. Turn on 'Track quantity' for the products in Shopify (see steps).");
}