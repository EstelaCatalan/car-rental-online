class Usuario{
   _id;
   dni;
   nombres;
   apellidos;
   direccion;
   email;
   password;
   rol;
   telefono;

   get dni(){return this.dni;}
   set dni(dni){this.dni=dni}
   get nombres(){return this.nombres;}
   set nombres(nombres){this.nombres=nombres;}
   get apellidos(){return this.apellidos;}
   set apellidos(apellidos){this.apellidos=apellidos;}
   get direccion(){return this.direccion;}
   set direccion(direccion){this.direccion=direccion;}
   get email(){return this.email;}
   set email(email){this.email=email;}
   get password(){return this.password;}
   set password(password){this.password=password;}
   get rol(){return this.rol;}
   set rol(rol){this._rol=rol;}
   get telefono(){return this._telefono;}
   set telefono(telefono){this._telefono=telefono;}

   constructor (_id){
    this._id=_id;
   }


};

