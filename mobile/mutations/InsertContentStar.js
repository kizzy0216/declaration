const InsertContentStar = `
  mutation InsertContentStar($amount: Int, $content_uuid: uuid) {
    insert_content_star_one(object: {amount: $amount, content_uuid: $content_uuid}) {
      __typename
      amount
    }
  }
`;

export default InsertContentStar;
