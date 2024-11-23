"use server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


async function main() {

    await prisma.payment.createMany({
        data: [
          {id: 'Sep', dueDate: new Date("2024-10-01"), amount: 300000},
          {id: 'Oct', dueDate: new Date("2024-11-01"), amount: 200000},
          {id: 'Nov', dueDate: new Date("2024-12-01"), amount: 500000},
          {id: 'Dec', dueDate: new Date("2025-01-01"), amount: 100000},
          ] 
    })
    await prisma.user.create({
      data: 
      { name: 'William He Yu', 
        email: 'wheyu@ttu.edu', 
        homeId: 'A01',
        paymentInfo:
        {
            create: {
                nameInCard: 'William He Yu',
                cardNum: '1234123412341234',
                expDate: new Date(2024,12),
                cvv: 123
            }
        },

        payments: 
        {
          createMany: {
            data: [
              {paymentId: 'Sep', status: true},
              {paymentId: 'Oct', status: true},
              {paymentId: 'Nov', status: false},
              {paymentId: 'Dec', status: false}
            ]
          }
        }
      },
    })

    await prisma.user.create({
      data: 
      { name: 'Santiago Jimenez', 
        email: 'sjc@ttu.edu', 
        homeId: 'A02',
        paymentInfo:
        {
            create: {
                nameInCard: 'Santiago Jimenez',
                cardNum: '1111111111111111',
                expDate: new Date(2024,11),
                cvv: 111
            }
        },

        payments: 
        {
          createMany: {
            data: [
              {paymentId: 'Sep', status: true},
              {paymentId: 'Oct', status: true},
              {paymentId: 'Nov', status: true},
              {paymentId: 'Dec', status: true}
            ]
          }
        }
      },
    })

    await prisma.user.create({
      data: 
      { name: 'Ana Aguilar', 
        email: 'agu@ttu.edu', 
        homeId: 'A03',
        paymentInfo:
        {
            create: {
                nameInCard: 'Ana Aguilar',
                cardNum: '2222222222222222',
                expDate: new Date(2024,11),
                cvv: 222
            }
        },

        payments: 
        {
          createMany: {
            data: [
              {paymentId: 'Sep', status: false},
              {paymentId: 'Oct', status: false},
              {paymentId: 'Nov', status: false},
              {paymentId: 'Dec', status: false}
            ]
          }
        }
      },
    })

    await prisma.user.create({
      data: 
      { name: 'Jose Campos', 
        email: 'jca@ttu.edu', 
        homeId: 'A04',
        paymentInfo:
        {
            create: {
                nameInCard: 'Jose Campos',
                cardNum: '3333333333333333',
                expDate: new Date(2024,11),
                cvv: 222
            }
        },

        payments: 
        {
          createMany: {
            data: [
              {paymentId: 'Sep', status: true},
              {paymentId: 'Oct', status: false},
              {paymentId: 'Nov', status: false},
              {paymentId: 'Dec', status: false}
            ]
          }
        }
      },
    })

  }

  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
