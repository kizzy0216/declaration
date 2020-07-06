const VerificationCodeFragment = `
  fragment VerificationCodeFragment on verification_code {
    __typename
    uuid
    id
    text
    created_at
  }
`

export default VerificationCodeFragment;
