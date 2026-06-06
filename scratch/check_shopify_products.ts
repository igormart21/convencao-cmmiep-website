
const SHOPIFY_API_VERSION = '2026-04';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'store-store-builder-joaax.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '5da1ec1247816f2b379b4204005b92ad';

const query = `
  query GetProducts {
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function check() {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json() as any;
    if (data.errors) {
      console.error('Errors:', data.errors);
      return;
    }

    const products = data.data.products.edges;
    console.log(`Encontrados ${products.length} produtos:`);
    products.forEach((p: any) => {
      console.log(`- Título: ${p.node.title} | Handle: ${p.node.handle} | ID: ${p.node.id}`);
      p.node.variants.edges.forEach((v: any) => {
        console.log(`   * Variante: ${v.node.title} | ID: ${v.node.id} | Preço: ${v.node.price.amount}`);
      });
    });
  } catch (e) {
    console.error('Erro:', e);
  }
}

check();
