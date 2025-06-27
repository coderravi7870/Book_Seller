import connectDB from "@/config/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";


export async function POST(request) {
    
    try {
        // const {track} = 
        const {ordertrack,orderId} = await request.json();

        console.log(ordertrack,orderId)

        await connectDB();

        const order = await Order.findByIdAndUpdate(orderId,{status: ordertrack });
        
        return NextResponse.json({success: true, message: "Order Track Updated Successfully"});
        
    } catch (error) {
        return NextResponse.json({success: false, message: error.message});
    }
}