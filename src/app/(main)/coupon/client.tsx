"use client"

import { Button, Card, CardBody, Form, Input } from "@heroui/react";
import { toast } from "sonner";
import { MoneyBar } from "@/containers/MoneyBar";
import withAuth from "@/components/withAuth";

function Client() {

    const ToastEE = () => {
        toast.success("awdawfg")
    }

    return (
        <div className="">
            <div>coupon</div>
            <Button onPress={ToastEE}>awgfsergbvwsed</Button>
        </div>
    );
}

export default withAuth(Client);