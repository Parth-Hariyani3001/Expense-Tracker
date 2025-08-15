import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Calendar,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "$12,345.67",
      change: "+2.5%",
      changeType: "positive",
      icon: DollarSign,
      color: "blue",
    },
    {
      title: "Monthly Expenses",
      value: "$3,456.78",
      change: "+12.3%",
      changeType: "negative",
      icon: TrendingDown,
      color: "red",
    },
    {
      title: "Monthly Income",
      value: "$8,900.00",
      change: "+5.2%",
      changeType: "positive",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Savings",
      value: "$5,443.22",
      change: "+8.1%",
      changeType: "positive",
      icon: CreditCard,
      color: "purple",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      category: "Food & Dining",
      amount: -85.5,
      date: "2024-01-15",
      type: "expense",
    },
    {
      id: 2,
      description: "Salary Deposit",
      category: "Income",
      amount: 3500.0,
      date: "2024-01-15",
      type: "income",
    },
    {
      id: 3,
      description: "Netflix Subscription",
      category: "Entertainment",
      amount: -15.99,
      date: "2024-01-14",
      type: "expense",
    },
    {
      id: 4,
      description: "Gas Station",
      category: "Transportation",
      amount: -45.2,
      date: "2024-01-14",
      type: "expense",
    },
    {
      id: 5,
      description: "Freelance Payment",
      category: "Income",
      amount: 750.0,
      date: "2024-01-13",
      type: "income",
    },
  ];

  const categories = [
    {
      name: "Food & Dining",
      amount: 456.78,
      percentage: 35,
      color: "bg-red-500",
    },
    {
      name: "Transportation",
      amount: 234.56,
      percentage: 18,
      color: "bg-blue-500",
    },
    {
      name: "Entertainment",
      amount: 189.34,
      percentage: 15,
      color: "bg-purple-500",
    },
    { name: "Shopping", amount: 167.89, percentage: 13, color: "bg-green-500" },
    {
      name: "Utilities",
      amount: 145.23,
      percentage: 11,
      color: "bg-yellow-500",
    },
    { name: "Others", amount: 98.76, percentage: 8, color: "bg-gray-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">This Month</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Transaction
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === "blue"
                      ? "bg-blue-100"
                      : stat.color === "red"
                      ? "bg-red-100"
                      : stat.color === "green"
                      ? "bg-green-100"
                      : "bg-purple-100"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "red"
                        ? "text-red-600"
                        : stat.color === "green"
                        ? "text-green-600"
                        : "text-purple-600"
                    }`}
                  />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : ""}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Spending by Category
              </h2>
              <button>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      ${category.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
