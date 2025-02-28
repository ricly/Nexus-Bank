import {
  Clock,
  CreditCard,
  Globe,
  LineChart,
  Lock,
  PiggyBank,
  Shield,
  Smartphone,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-emerald-400" />,
      title: "Advanced Security",
      description:
        "Bank-grade encryption and multi-factor authentication keep your financial data protected 24/7.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-emerald-400" />,
      title: "Instant Card Controls",
      description:
        "Freeze, unfreeze, or set limits on your cards instantly through the app for complete control.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-emerald-400" />,
      title: "Mobile Banking",
      description:
        "Manage your finances on the go with our award-winning mobile app for iOS and Android.",
    },
    {
      icon: <Clock className="h-8 w-8 text-emerald-400" />,
      title: "24/7 Banking",
      description:
        "Access your accounts, make transfers, and pay bills any time of day or night.",
    },
    {
      icon: <Globe className="h-8 w-8 text-emerald-400" />,
      title: "Global Access",
      description:
        "Use your accounts worldwide with no foreign transaction fees and competitive exchange rates.",
    },
    {
      icon: <PiggyBank className="h-8 w-8 text-emerald-400" />,
      title: "Automated Savings",
      description:
        "Set up rules to automatically save money based on your spending patterns and goals.",
    },
    {
      icon: <LineChart className="h-8 w-8 text-emerald-400" />,
      title: "Financial Insights",
      description:
        "Track your spending habits with interactive charts and personalized recommendations.",
    },
    {
      icon: <Lock className="h-8 w-8 text-emerald-400" />,
      title: "Fraud Prevention",
      description:
        "AI-powered systems detect and prevent unauthorized transactions before they happen.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-emerald-400/30 transition-colors"
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
          <p className="text-sm text-zinc-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
