export interface GuestbookFormData {
  name: string;
  password: string;
  message: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}
