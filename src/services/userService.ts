import type { User } from '@/types/user';

let cachedUser: User | null = null;

export async function fetchCurrentUser(): Promise<User> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (cachedUser) {
        resolve(cachedUser);

        return;
      }

      cachedUser = {
        id: '1',
        name: 'Ronnie Radke',
        avatar: '/src/assets/icons/avatar.svg',
      };
      resolve(cachedUser);
    }, 500);
  });
}

