// import { PrismaClient } from '@prisma/client'
import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

// const prismaClient = new PrismaClient()

async function getCategories() {
  // return await prismaClient.category.findMany()
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {
  const categories = await getCategories()  

  return (
    <div className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className="mt-10">
        {categories.map(category => (
          <CategoryIcon 
            key={category.id} 
            category={category}  
          />
        ))}
      </nav>
    </div>
  )
}
