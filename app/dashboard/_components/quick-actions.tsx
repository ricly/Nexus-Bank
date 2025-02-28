import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  FileText,
  PlaneIcon as PaperPlane,
  Receipt,
} from "lucide-react";

const actions = [
  {
    title: "Send Money",
    description:
      "Send money to 80+ countries instantly and conviniently without any hustle",
    icon: PaperPlane,
    href: "/send",
  },
  {
    title: "Invoices",
    description:
      "Create and send multi-currency invoices to clients and employers",
    icon: FileText,
    href: "/invoices",
  },
  {
    title: "Virtual card",
    description: "Shop, subscribe and pay bills securely online",
    icon: CreditCard,
    href: "/cards",
  },
  {
    title: "Pay Bills",
    description:
      "Pay for your internet, cable subscription and other utility bills all in one place",
    icon: Receipt,
    href: "/bills",
  },
];

const QuickActions = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Card
            key={action.title}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <action.icon className="h-8 w-8 text-blue-500" />
              <CardTitle className="text-lg">{action.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
