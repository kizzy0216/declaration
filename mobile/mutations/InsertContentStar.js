const InsertContentStar = `
  mutation InsertContentStar($amount: Int) {
    insert_content_star_one(object: {amount: $amount}) {
      __typename
      amount
    }
  }
`;

export default InsertContentStar;
