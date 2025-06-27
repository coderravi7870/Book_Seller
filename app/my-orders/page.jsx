"use client";
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(`/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders.reverse());
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }

    // setOrders(orderDummyData)
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6">My Orders</h2>
          {loading ? (
            <Loading />
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="box_icon"
                    />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium text-base">
                        {order.items
                          .map(
                            (item) => item.product.name + ` x ${item.quantity}`
                          )
                          .join(", ")}
                      </span>
                      <span>Items : {order.items.length}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">
                        {order.address.fullName}
                      </span>
                      <br />
                      <span>{order.address.area}</span>
                      <br />
                      <span>{`${order.address.city}, ${order.address.state}`}</span>
                      <br />
                      <span>{order.address.phoneNumber}</span>
                    </p>
                  </div>
                  <p className="font-medium my-auto">
                    {currency}
                    {order.amount}
                  </p>
                  <div>
                    <p className="flex flex-col">
                      <span>Method : COD</span>
                      <span>
                        Date : {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span>Payment : Pending</span>
                      <Dialog>
                        <form>
                          <DialogTrigger asChild>
                            <Button
                              className="text-xs border px-4 py-1.5 rounded-full border-gray-600"
                              variant="outline"
                            >
                              Track Your Order
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Here is Your Order Status
                              </DialogTitle>
                              <DialogDescription className="flex flex-col gap-5 text-lg">
                                <h1 >step 1:- <span className={`${order.status === "Order Placed" && "text-blue-600"}`}>Order Placed</span></h1>
                                <h1>step 2:- <span className={`${order.status === "Order Confirmed" && "text-blue-600"}`}>Order Confirmed</span></h1>
                                <h1>step 3:- <span className={`${order.status === "Order Packed" && "text-blue-600"}`}>Order Packed</span></h1>
                                <h1>step 4:- <span className={`${order.status === "Order Shipped" && "text-blue-600"}`}>Order Shipped</span></h1>
                                <h1>step 5:- <span className={`${order.status === "In Transit" && "text-blue-600"}`}>In Transit</span></h1>
                                <h1>step 6:- <span className={`${order.status === "Out for Delivery" && "text-blue-600"}`}>Out for Delivery</span></h1>
                                <h1>step 7:- <span className={`${order.status === "Delivered" && "text-blue-600"}`}>Delivered</span></h1>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </form>
                      </Dialog>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
