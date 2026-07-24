import { Link } from "react-router-dom";
import {
  User,
  Wrench,
  Star,
  Wallet,
} from "lucide-react";

const actions = [
  {
    title: "Edit Profile",
    description: "Update your profile",
    icon: User,
    color: "bg-blue-500",
    link: "/provider/profile",
  },
  {
    title: "Manage Services",
    description: "Update your services",
    icon: Wrench,
    color: "bg-green-500",
    link: "/provider/my-services",
  },
  {
    title: "Reviews",
    description: "View customer reviews",
    icon: Star,
    color: "bg-yellow-500",
    link: "/provider/reviews",
  },
  {
    title: "Earnings",
    description: "View payment history",
    icon: Wallet,
    color: "bg-purple-500",
    link: "/provider/earnings",
  },
];

const ProviderQuickActions= () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <Link
              key={index}
              to={action.link}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`${action.color} w-14 h-14 rounded-full flex items-center justify-center mb-4`}
              >
                <Icon
                  size={26}
                  className="text-white"
                />
              </div>

              <h3 className="font-semibold text-lg">
                {action.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProviderQuickActions;