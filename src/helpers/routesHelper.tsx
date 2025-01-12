export const getLoginRoute = (domain: string) => {
  switch (domain) {
    case 'institution':
      return '/institutions/login'
    case 'student':
      return '/students/login'
    default:
      return '';
  }
};
