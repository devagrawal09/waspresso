import { Orders } from "@wasp/queries/types";
import { PlaceOrder } from "@wasp/actions/types";
import { Beverage, Order } from "@wasp/entities";

type PlaceOrderArgs = {
  beverageId: number;
};

export const placeOrder: PlaceOrder<PlaceOrderArgs, Order> = async (
  args,
  context
) => {
  const { beverageId } = args;
  const {
    entities: { Order, Beverage },
    user,
  } = context;

  if (!user) {
    throw new Error("You must be logged in to place an order");
  }

  const beverage = await Beverage.findUnique({
    where: { id: beverageId },
  });

  if (!beverage) {
    throw new Error(`Beverage with id ${beverageId} not found`);
  }

  const order = await Order.create({
    data: {
      customerId: user.id.toString(),
      beverageId,
      totalCost: beverage.cost * 1.1,
    },
  });

  return order;
};

export const getOrders: Orders<
  never,
  (Order & {
    beverage: Beverage;
  })[]
> = async (_, context) => {
  const {
    entities: { Order },
    user,
  } = context;

  if (!user) {
    throw new Error("You must be logged in to get orders");
  }

  const orders = await Order.findMany({
    where: { customerId: user.id.toString() },
    include: { beverage: true },
    orderBy: { id: "desc" },
  });

  return orders;
};
