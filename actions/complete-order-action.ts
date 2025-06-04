"use server"
import { revalidatePath } from 'next/cache'
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

export async function completeOrder(formData: FormData) {
    // console.log(formData.get('order_id'));
    // const orderId = formData.get('order_id')!

    const data = {
        orderId : formData.get('order_id')
    }

    const reslut = OrderIdSchema.safeParse(data)
    if(reslut.success){
        try {
            await prisma.order.update({
                where: {
                    id: reslut.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
            revalidatePath('admin/orders') // recargar la pagina
        } catch (error) {
            console.log(error);
            
        }
    }

    
}