// POST
//   - network_uuid
//   - user_email
//   - ?user_name
//   - ?code
// Ensure email is not already associated with a User for the Network,
// If it is, return 405, not allowed as User already exists for the Network.
// If only email,
//   Create new Membership Invitation with email, name, and code.
//   Return 202 'Invitation email sent'.
// If email and code,
//   Ensure Membership Invitation exists, from email.
//   If not, return 403 'Invitation revoked'.
//   Ensure email and code match in Membership Invitation.
//   If matched Membership Invitation doesn't exist, return 403 'Email and code do not match'.
//   If User doesn't exist, create new User with email.
//   Add User to Network.
//   Delete Membership Invitation.
