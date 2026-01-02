
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  bio?: string;
  avatar?: string;
  interests: string[];
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  completed: boolean;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  createdAt: number;
}

export interface Comment {
  id: string;
  userName: string;
  content: string;
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  url: string;
}
