



async function UsersList() 
{
  // try {
  //   const users = await db.getAllStatusWithPid( "Nov" ); 
  //   console.log(users);
  // return (
  //   <div>
  //     <h1>Users</h1>
  //     <ul>
  //       {users.map((user) => (
  //         <li key={user.id}>
  //           {user.name} - {user.payments[0].paymentId} - {user.payments[0].status ? "Paid" : "Not Paid"}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );}
  // catch (error) {
  //   console.error(error);
  // }

  // try {
  //   const hist = await db.getHistoryWithUid( 6 ); 
  //   console.log(hist);
  
  //   if (hist === null) {
  //     return (
  //       <div>
  //         <h1>Hist</h1>
  //         <p>No history found.</p>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div>
  //       <h1>History of {hist.name}</h1>
  //       <ul>
  //         {hist.payments.map((payment, index) => (
  //           <li key={index}>
  //             {payment.payment.id} - {payment.payment.dueDate.getFullYear()}/{payment.payment.dueDate.getMonth() + 1}/{payment.payment.dueDate.getDate()} - {payment.payment.amount} - {payment.status ? "Paid" : "Not Paid"}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );}
  // catch (error) {
  //   console.error(error);
  // }


  // try {
  //   const status = await db.getStatusWithUidPid( 2 , 'Nov'); 
  //   console.log(status);

  //   if (status === null) {
  //         return (
  //           <div>
  //             <h1>Status</h1>
  //             <p> No userpayment row found </p>
  //           </div>
  //         );
  //       }
  //   return (
  //     <div>
  //       <h1>Status of {status.user.name} on payment {status.paymentId}</h1>
  //       <ul>
  //         <li key={status.userId}>
  //           {status.payment.id} - {status.payment.dueDate.getFullYear()}/{status.payment.dueDate.getMonth() + 1}/{status.payment.dueDate.getDate()} - {status.payment.amount} - {status.status ? "Paid" : "Not Paid"}
  //         </li>
  //       </ul>
  //     </div>
  //   );}
  // catch (error) {
  //   console.error(error);
  // }

  // try {
  //   const pmethod = await db.setPaymentMethod( 2 , 'William He Yu', '8888888888888888', 2024, 12, 123); 
  //   console.log(pmethod);

  //   if (pmethod === null) {
  //         return (
  //           <div>
  //             <h1>Payment method</h1>
  //             <p> Error </p>
  //           </div>
  //         );
  //       }
  //   return (
  //     <div>
  //       <h1>payment method</h1>
  //       <ul>
  //         <li key={pmethod.userId}>
  //           {pmethod.nameInCard} - {pmethod.cardNum} - {pmethod.expDate.toDateString()} - {pmethod.cvv}
  //         </li>
  //       </ul>
  //     </div>
  //   );}
  // catch (error) {
  //   console.error(error);
  // }


  // try {
  //   const user = await db.getUserPriv( 2 ); 
  //   console.log(user);

  //   if (user === null) {
  //         return (
  //           <div>
  //             <h1>USER NOT FOUND</h1>
  //           </div>
  //         );
  //       }
  //   return (
  //     <div>
  //       <h1>User privilage</h1>
  //       <ul>
  //         <li>
  //           The user {user.name} with user id {user.id} {user.admin? "IS" : "IS NOT"} an admin
  //         </li>
  //       </ul>
  //     </div>
  //   );}
  // catch (error) {
  //   console.error(error);
  // }

  // try {
  //     const pmethod = await db.getPaymentMethod( 2 ); 
  //     console.log(pmethod);
  
  //     if (pmethod === null) {
  //           return (
  //             <div>
  //               <h1>USER NOT FOUND</h1>
  //             </div>
  //           );
  //         }
  //     return (
  //       <div>
  //         <h1>payment method of {pmethod.userId}</h1>
  //         <ul>
  //           <li>
  //             The user with user id {pmethod.userId} has payment method {pmethod.nameInCard} - {pmethod.cardNum} - {pmethod.expDate.toDateString()} - {pmethod.cvv}
  //           </li>
  //         </ul>
  //       </div>
  //     );}
  //   catch (error) {
  //     console.error(error);
  //   }

  // try {
  //   const rmethod = await db.setRemindMethod( 2 , 'email'); 
  //   console.log(rmethod);

  //   if (rmethod === null) {
  //         return (
  //           <div>
  //             <h1>USER NOT FOUND</h1>
  //           </div>
  //         );
  //       }
  //   return (
  //     <div>
  //       <h1>payment method of {2}</h1>
  //       <ul>
  //         <li>
  //           The user with user id {2} has remind method {rmethod.remindMethod}
  //         </li>
  //       </ul>
  //     </div>
  //   );}
  // catch (error) {
  //   console.error(error);
  // }


  // try {
  //   const rmethod = await db.getRemindMethod( 2 ); 
  //   console.log(rmethod);

  //   if (rmethod === null) {
  //         return (
  //           <div>
  //             <h1>USER NOT FOUND</h1>
  //           </div>
  //         );
  //       }
  //   return (
  //     <div>
  //       <h1>payment method of {2}</h1>
  //       <ul>
  //         <li>
  //           The user with user id {2} has remind method {rmethod.remindMethod}
  //         </li>
  //       </ul>
  //     </div>
  //   );}
  // catch (error) {
  //   console.error(error);
  // }

  // try {
  //   const rtime = await db.getRemindTime( 2 ); 
  //   console.log(rtime);

  //   if (rtime === null) {
  //         return (
  //           <div>
  //             <h1>USER NOT FOUND</h1>
  //           </div>
  //         );
  //       }
  //   return (
  //     <div>
  //       <h1>payment method of {2}</h1>
  //       <ul>
  //         <li>
  //           The user with user id {2} has remind time {rtime.remindTime?.toDateString()}
  //         </li>
  //       </ul>
  //     </div>
  //   );}
  // catch (error) {
  //   console.error(error);
  // }
  

  // try {
  //   const rtime = await db.setRemindTime( 2 , 2024, 11, 31); 
  //   console.log(rtime);

  //   if (rtime === null) {
  //         return (
  //           <div>
  //             <h1>USER NOT FOUND</h1>
  //           </div>
  //         );
  //       }
  //   return (
  //     <div>
  //       <h1>payment method of {2}</h1>
  //       <ul>
  //         <li>
  //           The user with user id {2} has remind time {rtime.remindTime?.toDateString()}
  //         </li>
  //       </ul>
  //     </div>
  //   );}
  // catch (error) {
  //   console.error(error);
  // }


}

  export default UsersList
