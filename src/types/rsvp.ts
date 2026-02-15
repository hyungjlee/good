export interface RsvpFormData {
  name: string;
  phone: string;
  side: "groom" | "bride";
  attending: boolean;
  partySize: number;
  mealPref: "korean" | "western" | "none";
  message: string;
}

export interface RsvpRecord extends RsvpFormData {
  id: string;
  createdAt: string;
}
