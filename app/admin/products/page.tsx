import ProductPagination from '@/components/products/ProductPagination'
import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductTable from '@/components/products/ProductTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function productsCount() {
    return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize // saltos segun la pagina
    const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
            category: true
        }
    })
    return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductPage({searchParams}: {searchParams: Promise<{page: string}>}) {

    const { page } = await searchParams
    const currentPage =  +page || 1 // pagina actual si no tinen le asigna el 1
    const pageSize = 10 // numero de productos a mostrar

    if(currentPage < 0) redirect('/admin/products')
    
    // const products = await getProducts(page, pageSize)
    // const totalProducts = await productsCount()
    const productsData =  getProducts(currentPage, pageSize)
    const totalProductsData =  productsCount()
    const [products, totalProducts ] = await Promise.all([productsData, totalProductsData])
    const totalPages = Math.ceil(totalProducts/pageSize)

    if(currentPage > totalPages) redirect('/admin/products')

    return (
        <>
            <Heading>Administrar Productos</Heading>

            <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
                <Link
                    href={'/admin/products/new'}
                    className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
                >Crear Producto</Link>

                <ProductSearchForm />
            </div>

            <ProductTable 
                products={products}
            />

            <ProductPagination 
                page={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}
