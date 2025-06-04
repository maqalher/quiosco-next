"use client"

import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
// import { revalidatePath } from "next/cache";
import useSWR from "swr";

// async function getPendingOrders() {
//     const orders = await prisma.order.findMany({
//         where: {
//             status: false
//         },
//         include: {
//             orderProducts: {
//                 include: {
//                     product: true
//                 }
//             }
//         }
//     })
//     return orders
// }

export default function OrdersPage() {

    const url = '/admin/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const {data, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000, // cada minuto
        revalidateOnFocus: false
    })

    // const orders = await getPendingOrders()
    // console.log(JSON.stringify(orders, null, 2));

    // const refreshOders = async () => {
    //     "use server"
    //     revalidatePath('/admin/orders')
    // }

    if(isLoading) return <p>Cargando...</p>

    if(data) return (
        <>
            <Heading>Administrar Ordenes</Heading>

            {/* <form
                action={refreshOders}
            >
                <input 
                    type="submit"
                    value='Actualizar Ordenes'
                    className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
                />
            </form> */}

            {
                data.length ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                        { data.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                            />
                        ))}
                    </div>
                ): <p className="text-center">No hay ordenes Pendientes</p>
            }
        </>
    )
}
