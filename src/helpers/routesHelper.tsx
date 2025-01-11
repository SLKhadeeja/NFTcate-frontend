export const getLoginRoute = (domain: string) => {
  switch (domain) {
    case 'instituiton':
      return '/institution/login'
    case 'student':
      return '/student/login'
    default:
      return '';
  }
};

export const getSignupRoute = (domain: string) => {
  switch (domain) {
    case 'instituiton':
      return '/institution/register'
    case 'student':
      return '/student/register'
    default:
      return '';
  }
}
