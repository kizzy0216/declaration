const DeleteContentStar = `
  mutation DeleteContentStar($astronomer_uuid: uuid!, $content_uuid: uuid!) {
    delete_content_star_by_pk(astronomer_uuid: $astronomer_uuid, content_uuid: $content_uuid) {
      __typename
      amount
    }
  }
`;

export default DeleteContentStar;
