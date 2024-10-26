import { useState } from "react";
import { AllOrdersNew, columns } from "./columns";
import { DataTable } from "./data-table";
import Addorders from "./AddOrders";
import EditAllOrdersPopup from "./editOrdersPopup";
import OrderDetailPopup from "./OrderDetailPopup";
import { ColumnDef } from "@tanstack/react-table";
import OrderItemsTable from "./_components/OrderItemsTable";
const COUPON_VALUE = 10; // Static coupon value of $10

function calculateOrderTotal(
  items: { regularPrice: number; quantity: number }[]
) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.regularPrice * item.quantity,
    0
  );
  return subtotal - COUPON_VALUE;
}

function getInitialData(): AllOrdersNew[] {
  return [
    {
      id: "728ed52f",
      order_id: "#254GF45",
      date: "23/05/2024",
      username: "SteveSmith",
      order_total: "",
      status: "Approved",
      items: [
        {
          productImage: "/images/all-orders/cod.jpeg",
          productName: "Call of Duty",
          productCode: "#COD451",
          regularPrice: 15, // Convert to number
          quantity: 3,
          total: 45, // Convert to number
        },
        {
          productImage: "/images/all-orders/battlefield.jpg",
          productName: "Battlefield 2042",
          productCode: "#BFD800",
          regularPrice: 20, // Convert to number
          quantity: 2,
          total: 40, // Convert to number
        },
      ],
    },

    {
      id: "728ed52f2",
      order_id: "#254GF96",
      date: "12/01/2022",
      username: "RickyPonting",
      order_total: "",
      status: "Rejected",
      items: [
        {
          productImage: "/images/all-orders/aoe.jpg",
          productName: "Age of Empires",
          productCode: "#AOE923",
          regularPrice: 22, // Convert to number
          quantity: 3,
          total: 66, // Convert to number
        },
      ],
    },
  ].map((order) => ({
    ...order,
    order_total: `$${calculateOrderTotal(order.items).toFixed(2)}`, // Calculate the order total
  }));
}

export default function AllOrders() {
  const [orders, setOrders] = useState<AllOrdersNew[]>(getInitialData());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<AllOrdersNew | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AllOrdersNew | null>(null);

  const handleViewOrder = (order: AllOrdersNew) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleAddOrder = (newOrder: AllOrdersNew) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const handleEditOrder = (order: AllOrdersNew) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  const handleSaveOrder = (updatedOrder: AllOrdersNew) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const actionColumn: ColumnDef<AllOrdersNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteOrder(row.original.id)}
        >
          Delete
        </button>

        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleViewOrder(row.original)}
        >
          View
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllOrdersNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10 text-white">
      <h1 className="text-2xl font-bold mb-4 text-white">All Orders</h1>
      {/* Add Orders Component */}
      <Addorders onAddOrder={handleAddOrder} />
      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={orders} />
      {/* Edit order Modal */}
      <EditAllOrdersPopup
        order={editingOrder}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveOrder}
      />

      {/* Order Details Popup */}
      {selectedOrder && (
        <OrderDetailPopup
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          customerName={selectedOrder.username} // Use username for customer name
          customerEmail={
            selectedOrder.username === "SteveSmith"
              ? "Steve@gmail.com"
              : "Ricky@gmail.com"
          }
          date={selectedOrder.date}
          items={selectedOrder.items} // Pass the order items correctly
        />
      )}
    </div>
  );
}
