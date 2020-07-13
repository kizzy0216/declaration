# Authentication and authorization

As new User, log in with email

As User with prior initiation but no verification, log in with email associated with the system

As fully verified User, log in with email associated with the system

As authenticated, log out of the system

As unauthenticated, accept Network Membership Invitation

As authenticated, accept Network Membership Invitation, with authenticated email matching invitation email

As authenticated, accept Network Membership Invitation, with authenticated email mismatching invitation email

As Super Admin, log in to Dashboard

As Network Admin, log in to Dashboard

As Member, log in to Dashboard

# Network management

As Super Admin, create new Network

As Super Admin, view all Networks

# Network Membership Invitation management

As Super Admin, create new Network Membership Invitation

As Super Admin, revoke Network Membership Invitation

As Network Admin, create new Network Membership Invitation

As Network Admin, revoke Network Membership Invitation

# Network Membership Request management

As Super Admin, approve Network Membership Request

As Super Admin, deny Network Membership

As Network Admin, approve Network Membership Request

As Network Admin, deny Network Membership

# Network User (aka Member) management

As Super Admin, view all Network Members

As Super Admin, promote Network Member

As Super Admin, demote Network Member

As Super Admin, block Network Member

As Super Admin, unblock Network Member

As Network Admin, view all Network Members

As Network Admin, promote Network Member

As Network Admin, demote Network Member

As Network Admin, block Network Member

As Network Admin, unblock Network Member

As System, upon Network User creation, all Network Membership Requests and
Network Membership Invitation associated with the Network User's email should
be deleted.

# User management

As Super Admin, view all Users

# Dashboard view switching

As Super Admin, switch view between Super Admin and any Network of the system

As Network Admin, switch view between Networks administered by you

# Mobile view switching

As User, switch view between Networks you belong to

# Email Notifications

As User, upon authentication intitiation, receive email with link to complete authentication

As Email address holder, upon Network Membership Invitation creation, receive email with link to join Network

# Blocked Network Members

As a Blocked Member, posting comments is disabled

As a Blocked Member, posting content is disabled

As a Blocked Member, upon navigating to the Network, a message is displayed indicating blocked access

As a Member, when viewing a Blocked Member's profile, an indicator is shown representing the block
