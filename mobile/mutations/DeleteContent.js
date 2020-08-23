const DeleteContent = `
  mutation DeleteContent($uuid: uuid!) {
    delete_content_by_pk(uuid: $uuid) {
      __typename
      uuid
      id
    }
  }
`;

export default DeleteContent;
