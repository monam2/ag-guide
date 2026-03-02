import { Customer, Deal, Activity, Revenue } from "@/types";
import customersData from "@/data/customers.json";
import dealsData from "@/data/deals.json";
import activitiesData from "@/data/activities.json";
import revenueData from "@/data/revenue.json";

export const customers: Customer[] = customersData as Customer[];
export const deals: Deal[] = dealsData as Deal[];
export const activities: Activity[] = activitiesData as Activity[];
export const revenue: Revenue[] = revenueData as Revenue[];

export function getDashboardStats() {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.revenue, 0);
  const activeDeals = deals.filter(
    (d) => !["won", "lost"].includes(d.stage),
  ).length;
  const wonDeals = deals.filter((d) => d.stage === "won").length;
  const conversionRate = ((wonDeals / deals.length) * 100).toFixed(1);
  const avgDealSize = Math.round(
    deals.reduce((sum, d) => sum + d.amount, 0) / deals.length,
  );

  return {
    totalCustomers,
    activeCustomers,
    totalRevenue,
    activeDeals,
    wonDeals,
    conversionRate,
    avgDealSize,
  };
}

export function getDealsByStage() {
  const stages = [
    "prospecting",
    "qualification",
    "proposal",
    "negotiation",
    "won",
    "lost",
  ];
  return stages.map((stage) => ({
    stage,
    count: deals.filter((d) => d.stage === stage).length,
    total: deals
      .filter((d) => d.stage === stage)
      .reduce((sum, d) => sum + d.amount, 0),
  }));
}
