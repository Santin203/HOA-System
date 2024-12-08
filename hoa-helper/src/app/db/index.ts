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

export async function getAllUsers() {
    console.log("fetching all users");
    const users = await prisma.user.findMany();
    return users;
}

export async function createEmailTemplate(subject: string, body: string) {
    console.log("creating email template");
    const temp = await prisma.emailTamplates.create({
        data:{
            subject: subject,
            body: body
        }});
    return temp;
}

export async function getEmailTemplates() {
    console.log("retrieving email template");
    const temp = await prisma.emailTamplates.findMany({
        select: {id : true, subject: true, body: true}
        });
    return temp;
}

export async function getRemindMethod(userId: number) {
    console.log("retrieving remind method of user", userId);
    const method = await prisma.user.findUnique({
        where: { id: userId },
        select: {remindMethod : true}
        });
    return method;
}

export async function setRemindMethod(userId: number, remindMethod: string) {
    console.log("setting remind method");
    const method = await prisma.user.update({
        where: { id: userId },
        data: {remindMethod: remindMethod},
        });
    return method;
}


export async function getRemindTime(userId: number) {
    console.log("retrieving remind method of user", userId);
    const method = await prisma.user.findUnique({
        where: { id: userId },
        select: {remindTime : true}
        });
    return method;
}

export async function setRemindTime(userId: number, remindYear: number, remindMonth: number, remindDay: number) {
    console.log("setting remind method");
    const method = await prisma.user.update({
        where: { id: userId },
        data: {remindTime: new Date(remindYear, remindMonth, remindDay)},
        });
    return method;
}

export async function getRemindFreq(userId: number) {
    console.log("retrieving remind method of user", userId);
    const method = await prisma.user.findUnique({
        where: { id: userId },
        select: {remindFrequency : true}
        });
    return method;
}

export async function setRemindFreq(userId: number, remindFrequency: string) {
    console.log("setting remind method");
    const method = await prisma.user.update({
        where: { id: userId },
        data: {remindFrequency: remindFrequency},
        });
    return method;
}



export async function getUserInfo(userId: number) {
    console.log("setting remind method");
    const user = await prisma.user.findUnique({
        where: { id: userId }
        });
    return user;
}

export async function getDelinquent() {
    console.log("getting delinquent users");
    const users = await prisma.userPayments.groupBy({
        by: ['userId'],
        where: { status: false },
        _count:{_all: true},
        having: {
            paymentId: {
                _count: {
                    gte: 3
                }
            }
        }
    });
    return users;
}


export async function getPending(userId: number) {
    console.log("getting pending payments of user", userId);
    const users = await prisma.userPayments.findMany({
        where: {userId : userId, status: false},
        include: { payment: true, user : {select: {name: true}} }
    });
    return users;
}