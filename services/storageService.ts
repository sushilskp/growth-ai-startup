
import { User, Task, Post } from '../types';

export const storageService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  },
  
  saveUser: (user: User) => {
    const users = storageService.getUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index > -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));
  },

  getSession: (): User | null => {
    const data = localStorage.getItem('sessionUser');
    return data ? JSON.parse(data) : null;
  },

  setSession: (user: User | null) => {
    if (user) {
      localStorage.setItem('sessionUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('sessionUser');
    }
  },

  getTasks: (email: string): Task[] => {
    const data = localStorage.getItem(`tasks_${email}`);
    return data ? JSON.parse(data) : [];
  },

  saveTasks: (email: string, tasks: Task[]) => {
    localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
  },

  getPosts: (): Post[] => {
    const data = localStorage.getItem('posts');
    return data ? JSON.parse(data) : [];
  },

  savePosts: (posts: Post[]) => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }
};
