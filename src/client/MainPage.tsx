import { useState } from "react";
import Catalog from "@wasp/queries/Catalog";
import { useQuery } from "@wasp/queries";
import PlaceOrder from "@wasp/actions/PlaceOrder";
import useAuth from "@wasp/auth/useAuth";
import { Link, useHistory } from "react-router-dom";

import "./Main.css";
import AppLayout from "./AppLayout";

export default function MainPage() {
  return (
    <AppLayout>
      <div className="flex min-h-screen flex-col items-center gap-10 p-24">
        <h1 className="text-4xl">Welcome to the Serverlesspresso Cafe</h1>
        <OrderEspresso />
      </div>
    </AppLayout>
  );
}

export const OrderEspresso = () => {
  const [selected, setSelected] = useState<number>();
  const [ordering, setOrdering] = useState(false);
  // const [placedOrder, setPlacedOrder] = useState<Order>();

  const { data: auth } = useAuth();

  const { data: beverages, isFetching, error } = useQuery(Catalog);

  const selectedBeverage = beverages?.find((b) => b.id === selected);

  const history = useHistory();

  return (
    <>
      {isFetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        beverages?.map((b) => (
          <div
            className={`flex rounded-2xl cursor-pointer hover:scale-105 transition ${
              selected === b.id ? "bg-amber-800 scale-105" : "bg-amber-700"
            } w-80 h-32`}
            onClick={() => setSelected(b.id)}
            key={b.id}
          >
            <img
              src={b.imageUrl}
              alt={b.name}
              width={120}
              className="rounded-full m-3"
            />
            <p className="flex items-center justify-center flex-col px-10">
              <span className="text-2xl">{b.name}</span>
              <span className="text-xl">${b.cost}</span>
            </p>
          </div>
        ))
      )}

      {selectedBeverage &&
        (auth ? (
          <div className="flex flex-col items-center gap-4 py-24 px-10">
            <h3>Are you sure you want to place this order?</h3>
            <h4 className="font-semibold">
              {selectedBeverage.name} for ${selectedBeverage.cost}
            </h4>
            <div className="flex flex-row gap-10 mt-5">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                disabled={ordering}
                onClick={async () => {
                  setOrdering(true);

                  await PlaceOrder({
                    beverageId: selectedBeverage.id,
                  });

                  setOrdering(false);
                  history.push("/orders");
                  setSelected(undefined);
                }}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSelected(undefined)}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 px-10">
            <h3>
              Please{" "}
              <Link to="/login" className="text-amber-300 hover:underline">
                log in
              </Link>{" "}
              to place an order.
            </h3>
          </div>
        ))}
      {/* {placedOrder && (
        <div className="flex flex-col items-center gap-4 py-24 px-10">
          <h3>Order placed!</h3>
          <h4 className="font-semibold">
            {beverages?.find((b) => b.id === placedOrder.beverageId)?.name} for
            ${beverages?.find((b) => b.id === placedOrder.beverageId)?.cost}
          </h4>
          <h4 className="font-semibold">Order ID: {placedOrder.id}</h4>
        </div>
      )} */}
    </>
  );
};
