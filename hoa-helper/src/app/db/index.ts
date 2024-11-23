"use server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export async function getUserPriv( userId: number ) {
    const user = await prisma.user.findUnique({ 
        where: { id: userId }
    });
  
    return user;
}



export async function getAllStatusWithPid( paymentId: string ) {
    console.log("fetching all users");
    const users = await prisma.user.findMany({ 
        include: { payments: { where: { paymentId: paymentId } } }
    });
  
    return users;
}


export async function getHistoryWithUid( userId: number ) {
console.log("getting history of user", userId);
const hist = await prisma.user.findUnique({ 
    where: { id: userId },
    include: { 
        payments: {
            select: {payment : true, 
                    status: true }
        }
    }
});

return hist;
}

export async function getStatusWithUidPid( userId: number, paymentId: string ) {
    console.log("getting status of", userId ,"on", paymentId);
    const status = await prisma.userPayments.findUnique({ 
        where: { userId_paymentId: { userId: userId, paymentId: paymentId } },
        include: { payment: true, user : {select: {name: true}} }
    });
    
    return status;
}

export async function setPaymentMethod( userId: number, nameInCard: string, cardNum: string ,expYear: number, expMonth: number, cvv: number) {
    console.log("adding or updating payment method of", userId);
    const pmethod = await prisma.paymentInfo.upsert({ 
        where: { userId: userId },
        update: { nameInCard: nameInCard, cardNum: cardNum, expDate: new Date(expYear, expMonth), cvv: cvv },
        create: { userId: userId, nameInCard: nameInCard, cardNum: cardNum, expDate: new Date(expYear, expMonth), cvv: cvv }

    });
    
    return pmethod;
}

export async function getPaymentMethod( userId: number) {
    console.log("getting payment method of", userId);
    const pmethod = await prisma.paymentInfo.findUnique({ 
        where: { userId: userId },
    });
    
    return pmethod;
}