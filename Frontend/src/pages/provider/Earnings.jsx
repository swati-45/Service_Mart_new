import React, { useEffect, useState } from "react";
import api from "../../api/api";
import {
  Wallet,
  IndianRupee,
  TrendingUp,
  CreditCard,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Earnings = () => {
  const [loading, setLoading] = useState(true);
  

  const [stats, setStats] = useState({
    totalEarnings: 0,
    thisMonth: 0,
    pendingPayout: 0,
  });

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await api.get("/providers/earnings");

      const data = res.data.data;

      setStats({
        totalEarnings: data.totalEarnings,
        thisMonth: data.thisMonth,
        pendingPayout: data.pendingPayout,
      });

      setMonthlyRevenue(data.monthlyRevenue);

      setTransactions(data.transactions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Earnings",
      value: `₹${stats.totalEarnings}`,
      icon: Wallet,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "This Month",
      value: `₹${stats.thisMonth}`,
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Payout",
      value: `₹${stats.pendingPayout}`,
      icon: CreditCard,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }
  

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Earnings
          </h1>

          <p className="mt-2 text-slate-500">
            Track your income and recent transactions.
          </p>
        </div>

        <button className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          Withdraw
        </button>
      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Placeholder */}
<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
  <h2 className="mb-6 text-2xl font-bold text-slate-900">
    Monthly Revenue
  </h2>

  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={monthlyRevenue}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

      {/* Transactions */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Transactions
          </h2>
        </div>

        {transactions.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No completed transactions yet.
          </div>
        ) : (
          transactions.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-slate-100 px-6 py-5 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-emerald-50 p-3">
                  <IndianRupee
                    className="text-emerald-600"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.customer}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.service}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <h3 className="font-bold text-slate-900">
                  ₹{item.amount}
                </h3>

                <p className="text-sm text-slate-500">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
                {item.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Earnings;