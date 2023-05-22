import { useQuery } from "@wasp/queries";
import Orders from "@wasp/queries/Orders";
import AppLayout from "./AppLayout";

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useQuery(Orders);

  return (
    <AppLayout>
      <div className="flex min-h-screen flex-col items-center gap-10 p-24">
        <h1 className="text-4xl">Orders</h1>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        {!isLoading && orders && (
          <ul className="flex flex-col gap-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex gap-3 bg-amber-200 text-black p-3 font-bold w-64 justify-between"
              >
                <p>Order #{order.id}</p>
                <p>{order.beverage.name}</p>
                <p>${order.totalCost.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}
