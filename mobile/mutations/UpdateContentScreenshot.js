const UpdateContentScreenshot = `
  mutation UpdateContentScreenshot($uuid: uuid!, $screenshot: String) {
    update_content_by_pk(pk_columns: {uuid: $uuid}, _set: {screenshot: $screenshot}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateContentScreenshot;
