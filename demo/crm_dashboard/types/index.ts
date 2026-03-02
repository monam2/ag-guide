export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "active" | "inactive" | "prospect" | "churned";
  revenue: number;
  joinDate: string;
  country: string;
  phone: string;
  hasNotification: boolean;
  tags: string[];
}

export interface Deal {
  id: string;
  title: string;
  amount: number;
  stage:
    | "prospecting"
    | "qualification"
    | "proposal"
    | "negotiation"
    | "won"
    | "lost";
  customer: string;
  customerId: string;
  assignee: string;
  closeDate: string;
  probability: number;
  createdAt: string;
  hasNotification: boolean;
}

export interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note" | "task";
  description: string;
  user: string;
  customerId: string;
  customerName: string;
  timestamp: string;
  hasNotification: boolean;
}

export interface Revenue {
  month: string;
  revenue: number;
  target: number;
  customers: number;
  newDeals: number;
  closedDeals: number;
}
