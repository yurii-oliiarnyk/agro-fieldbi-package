import { useSelector } from 'react-redux';
import { moduleName as authModuleName } from '../../store/auth/auth';
import { ROLES } from '../../config';

const useUser = () => {
  const currentUser = useSelector(state => state[authModuleName].user);

  const isAdmin = (user = currentUser) => user.roles[0] === ROLES.ADMIN;
  const isUser = (user = currentUser) => user.roles[0] === ROLES.USER;
  const isObserver = (user = currentUser) => user.roles[0] === ROLES.OBSERVER;
  const isLandLord = (user = currentUser) => user.roles[0] === ROLES.LANDLORD;
  const isCurrentUser = user => user.id === currentUser.id;
  const isActiveUser = (user = currentUser) => isAdmin(user) || isUser(user);

  return {
    currentUser,
    isAdmin,
    isUser,
    isObserver,
    isCurrentUser,
    isLandLord,
    isActiveUser
  };
};

export default useUser;
