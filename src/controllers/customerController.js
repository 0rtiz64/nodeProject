const controller = {};
controller.list = (req,res) =>{
req.getConnection((err,conn)=>{ //GETCONNECTION ES UN METODO AGREGADO POR EXPRESS MY CONNECTION PARA OBTENER LA CONEXION MYSQL POR EXPRESS.
    conn.query('select * from customer',(err,customers)=>{
        if(err){
            res.json(err)
        }else{
            console.log(customers);
            res.render('customers',{
                data:customers
            });
        }
    });
})
};//CUANDO INGRESEMOS A ESTA RUTA, NOS MOSTRARA ESTO;



controller.save = (req,res) => {
    const  data = req.body;
    req.getConnection((err,conn)=>{
       conn.query('INSERT INTO  customer  set ?', [data],(err,customer)=>{
           if(err){
               res.send(err);
           }else {
               res.redirect('/');
           }

       });
    });


};

controller.edit =(req,res)=>{
const  { id } = req.params;
req.getConnection((err,conn)=>{
   conn.query('SELECT * FROM customer WHERE id = ?',[id] ,(err,customer)=>{
      console.log(customer[0]);
       res.render('edit',{
           data: customer[0]
       });
       });
});
};


controller.update = (req,res)=>{
  const {id}=req.params;
  const newCustomer = req.body;
  req.getConnection((err,conn)=>{
     conn.query('UPDATE customer set ? WHERE id = ?',[newCustomer,id],(err,rows)=>{
       res.redirect('/');
     });
  });
};

controller.delete = (req,res)=>{
req.getConnection((err,conn)=>{
    const { id } = req.params;
   conn.query('DELETE FROM customer WHERE id = ?',[id],(err,rows)=>{
       res.redirect('/');
   });
});
};

module.exports= controller; // EXPORTAMAOS  EL OBJETO CON TODOS SUS METODOS DENTRO DE EL;