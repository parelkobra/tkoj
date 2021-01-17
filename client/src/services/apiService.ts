import { INote, IUser } from '../types';

interface IApiService {
  getNotes(): Promise<INote[]>;
  createNote(note: INote): Promise<INote | null>;
  updateNote(note: INote): Promise<INote | null>;
  deleteNote(note: INote): Promise<boolean>;
}

export class ApiService implements IApiService {
  private token: string | null;
  private user: IUser | null;

  constructor() {
    this.token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.user = user !== null ? JSON.parse(user) : null;
  }

  async getNotes(): Promise<INote[]> {
    const response = await fetch(`/api/users/${this.user?._id}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
    });
    const data = await response.json();

    return data;
  }

  async createNote(note: INote): Promise<INote | null> {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) return null;
    const data = await response.json();

    return data.note;
  }

  async updateNote(note: INote): Promise<INote | null> {
    const response = await fetch('/api/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) return null;
    const data = await response.json();

    return data.note;
  }

  async updateUser(user: IUser): Promise<IUser | null> {
    const response = await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify(user),
    });
    console.log(response);
    if (!response.ok) return null;
    const data = await response.json();

    return data;
  }

  async deleteNote(note: INote): Promise<boolean> {
    const response = await fetch(`/api/notes/${note._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) return false;

    return true;
  }

  async deleteUser(id: string): Promise<boolean> {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok) return false;

    return true;
  }
}
