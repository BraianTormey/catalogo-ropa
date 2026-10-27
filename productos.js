/* ====== ESTE ES EL ARCHIVO QUE EDITÁS ======
   WHATSAPP: número con código de país, sin + ni espacios.
             Argentina: 549 + código de área + número. Ej: 5491123456789
   fotos:    lista de imágenes de la prenda, guardadas en la carpeta "fotos/".
             Ej: fotos: ["fotos/remera-1.jpg", "fotos/remera-2.jpg"]
             Si la dejás vacía ([]), se muestran fotos de relleno.
   stock:    cantidad disponible por talle (0 = agotado en ese talle). */
/* ====== DATOS DE LA TIENDA (header y footer) ======
   logo: imagen dentro de "fotos/" (ej: "fotos/logo.png"). Si no existe, se muestra la inicial del nombre. */
const TIENDA = {
  nombre: "Nombre de la tienda",
  logo: "fotos/logo.png",
  direccion: "Calle 123, Buenos Aires",
  horarios: "Lunes a sábado de 10 a 19 h",
  vendedora: "Nombre de la vendedora",
  telefono: "+54 9 11 0000-0000",
  instagram: "@tutienda"
};

const WHATSAPP = "5491100000000";
const MONEDA = "$";
const PRODUCTOS = [
  {nombre:"Remera oversize algodón", categoria:"Remeras", precio:18500, color:"#d9789c", fotos:[], stock:{S:4,M:6,L:2,XL:0}},
  {nombre:"Jean mom tiro alto", categoria:"Pantalones", precio:42000, color:"#c98aa6", fotos:[], stock:{"38":2,"40":1,"42":3,"44":0}},
  {nombre:"Vestido midi estampado", categoria:"Vestidos", precio:56000, color:"#e08a9e", fotos:[], stock:{S:1,M:0,L:0}},
  {nombre:"Buzo canguro friza", categoria:"Abrigos", precio:38900, color:"#cf7f8f", fotos:[], stock:{S:5,M:5,L:4,XL:3}},
  {nombre:"Camisa lino blanca", categoria:"Remeras", precio:31000, color:"#d4959f", fotos:[], stock:{S:0,M:0,L:0}},
  {nombre:"Campera de jean", categoria:"Abrigos", precio:67000, color:"#bf7a96", fotos:[], stock:{M:2,L:1}},
  {nombre:"Short de lino", categoria:"Pantalones", precio:24500, color:"#e39aaa", fotos:[], stock:{S:3,M:3,L:1}},
  {nombre:"Pollera plisada", categoria:"Vestidos", precio:29900, color:"#c8708f", fotos:[], stock:{S:2,M:4,L:2}}
];
