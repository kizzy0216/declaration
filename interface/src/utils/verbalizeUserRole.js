import {
  NETWORK_ADMIN_ROLE,
  COMMUNITY_MANAGER_ROLE,
  MEMBER_ROLE,
} from '../constants';

const verbalizeUserRole = role => (() => {
  switch (role) {
    case NETWORK_ADMIN_ROLE:
      return 'Admin';
    case COMMUNITY_MANAGER_ROLE:
      return 'Community Manager';
    case MEMBER_ROLE: 
      return 'Member';
    default:
      return 'Unknown Role';
  }
})();

export default verbalizeUserRole;
