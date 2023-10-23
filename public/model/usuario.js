class Usuario{
   _id;
   _dni;
   _nombres;
   _apellidos;
   _direccion;
   _email;
   _password;
   _rol;
   _telefono;

   get dni(){return this._dni;}
   set dni(dni){this.dni=dni}
   get nombres(){return this._nombres;}
   set nombres(nombres){this._nombres=nombres;}
   get apellidos(){return this._apellidos;}
   set apellidos(apellidos){this._apellidos=apellidos;}
   get direccion(){return this._direccion;}
   set direccion(direccion){this._direccion=direccion;}
   get email(){return this._email;}
   set email(email){this._email=email;}
   get password(){return this._password;}
   set password(password){this._password=password;}
   get rol(){return this._rol;}
   set rol(rol){this._rol=rol;}
   get telefono(){return this._telefono;}
   set telefono(telefono){this._telefono=telefono;}

   constructor (_id){
    this._id=_id;
   }


};
module.exports=Usuario;
