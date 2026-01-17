import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($pagination: PaginationArg) {
  products_connection(pagination: $pagination) {
    nodes {
      documentId
      name
      price
      description
      images {
        url
      }
    }
    pageInfo {
      page
      pageSize
      pageCount
      total
    }
  }
}

`;

export const GET_PRODUCT_BY_ID = gql`
  query Product($documentId: ID!) {
    product(documentId: $documentId) {
      documentId
      name
      price
      description
      images {
        url
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query Categories {
    categories {
      documentId
      name
    }
  }
`;

export const GET_ALL_PRODUCTS_BY_CATEGORY = gql`
  query Category($documentId: ID!) {
    category(documentId: $documentId) {
      products {
        name
        price
        description
        images {
          url
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_NAME = gql`
  query Products_connection($filters: ProductFiltersInput) {
    products_connection(filters: $filters) {
      nodes {
        documentId
        name
      }
    }
  }
`;
